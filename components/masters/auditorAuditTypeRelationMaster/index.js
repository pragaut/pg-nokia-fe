import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getAuditTypeMasterData, getUserDetailsP, getAuditTypeAuditorRelationMasterData, getAuditTypeAuditorRelationMasterDataById, saveAuditTypeAuditorRelationMasterData, deleteAuditTypeAuditorRelationMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT ,SpanLabelForDDl} from '../../formStyle';
//import Select from 'react-select'
import Gap from '../../Gap';
import { TABLE } from '../../commonStyle'
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })
//import Select from 'react-select'; 

const SPAN = styled.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;




class AuditTypeAuditorRelationAddEdit extends Wrapper {


    configs = [{
        name: 'auditTypeId',
        displayname: 'Audit Type Name',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.multiselectRef = React.createRef();
        this.state = {
            users: [],
            auditTypeAuditorRelations: [],
            auditorUsers: [],
            auditTypeAuditorRelation: props.baseObject ? props.baseObject : {},
            selectedIds: [],
            auditTypes: [],
            auditTypeAuditorRelationSelectedUsers: null,
            selectedUsers: [{}],
            options: [{}],
            selectedAuditors:[]
        };
    };


    onValueChanged = key => event => {
        const existingauditTypeAuditorRelation = Object.assign({}, this.state.auditTypeAuditorRelation);
        existingauditTypeAuditorRelation[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ auditTypeAuditorRelation: existingauditTypeAuditorRelation });
    };


    componentDidMount() {
        this.props.getUserDetailsP(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, undefined);
        this.props.getAuditTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getAuditTypeAuditorRelationMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);

        setTimeout(() => {
            const users = this.props.users && this.props.users;
            const auditorUsers = users && users.filter(item => item.isAuditRoleAssigned === "Yes")
            const auditTypes = this.props.auditTypes && this.props.auditTypes;
            let MultiUserIds = this.state.auditTypeAuditorRelation && this.state.auditTypeAuditorRelation.userId;
            let ConvertedMultselectUsers = this.ConvertStringToArrayRoleReturn(MultiUserIds)
            // let SelectedRoles = this.state.notification.userRoles && this.state.user.userRoles.map((item) => item.roleMasterId);
            let auditTypeAuditorRelationSelectedUsers = [];
            if (auditorUsers && ConvertedMultselectUsers) {
                ConvertedMultselectUsers.forEach(item =>
                    auditTypeAuditorRelationSelectedUsers = auditTypeAuditorRelationSelectedUsers.concat(this.state.auditorUsers.filter(user => user.id === item))
                );
            }
            this.setState({
                users: users,
                auditorUsers: auditorUsers,
                auditTypes: auditTypes,
                auditTypeAuditorRelationSelectedUsers: auditTypeAuditorRelationSelectedUsers //userSelectedRoles
            })
        }, 100);

    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if (nextProps && nextProps.users && nextProps.users !== null && nextProps.users !== undefined && nextProps.users !== 'undefined' && nextProps.users !== this.state.users) {
            let auditorUsers = nextProps.users && nextProps.users.filter(item => item.isAuditRoleAssigned === "Yes")
            this.setState({
                users: nextProps.users
            })
            if (auditorUsers && auditorUsers.length > 0 && auditorUsers != this.state.auditorUsers) {
                this.setState({
                    auditorUsers: auditorUsers
                });
            }
        }
        if (nextProps && nextProps.auditTypes && nextProps.auditTypes !== null && nextProps.auditTypes !== undefined && nextProps.auditTypes !== 'undefined' && nextProps.auditTypes !== this.state.auditTypes) {
            this.setState({
                auditTypes: nextProps.auditTypes
            })
        }
        if (nextProps && nextProps.auditTypeAuditorRelations && nextProps.auditTypeAuditorRelations !== null && nextProps.auditTypeAuditorRelations !== undefined && nextProps.auditTypeAuditorRelations !== 'undefined' && nextProps.auditTypeAuditorRelations !== this.state.auditTypeAuditorRelations) {
            this.setState({
                auditTypeAuditorRelations: nextProps.auditTypeAuditorRelations
            })
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;
            this.ConvertStringToArrayRole(nextProps.userId);
            this.setState({ ...state });
        }
    }

    getItems() {
        // By calling the belowe method will reset the selected values programatically
        this.multiselectRef.current.getSelectedItems();
    };


    onSelect = (selectedList, selectedItem) => {
        //console.log("selectedList", selectedList);
        //console.log("selectedItem", selectedItem);

        const listItems = selectedList.map((item) => item.id);
        //console.log("listItems", listItems);
        let returndata = this.returnIdsFunction(listItems);
        const existingauditTypeAuditorRelation = Object.assign({}, this.state.auditTypeAuditorRelation);
        existingauditTypeAuditorRelation["userId"] = returndata
        this.setState({
            auditTypeAuditorRelation: existingauditTypeAuditorRelation,
            selectedUsers: listItems
        });
    };

    onRemove = (selectedList, removedItem) => {
        //console.log("selectedList", selectedList.id);
        //console.log("removedItem", removedItem);

        const listItems = selectedList.map((item) => item.id);
        //console.log("listItems", listItems);
        let returndata = this.returnIdsFunction(listItems);
        const existingauditTypeAuditorRelation = Object.assign({}, this.state.auditTypeAuditorRelation);
        existingauditTypeAuditorRelation["userId"] = returndata
        this.setState({
            auditTypeAuditorRelation: existingauditTypeAuditorRelation,
            selectedUsers: listItems
        });
    };

    FunctionSetIDs = (data) => {
        const state = {};
        const datstring = data && data.join();
        this.state.auditTypeAuditorRelation.userId = datstring;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });

    }
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring; 
    }
    ConvertStringToArrayRole = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        this.state.selectedIds = data;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });

    }

    onclickEdit = (items) => {
        let MultiUserIds = items && items.userId;
        const auditorUsers = this.state.auditorUsers;
        let ConvertedMultselectUsers = this.ConvertStringToArrayRoleReturn(MultiUserIds)
        // let SelectedRoles = this.state.notification.userRoles && this.state.user.userRoles.map((item) => item.roleMasterId);
        let auditTypeAuditorRelationSelectedUsers = [];
        if (auditorUsers && ConvertedMultselectUsers) {
            ConvertedMultselectUsers.forEach(item =>
                auditTypeAuditorRelationSelectedUsers = auditTypeAuditorRelationSelectedUsers.concat(this.state.auditorUsers.filter(user => user.id === item))
            );
        }
        this.setState({
            auditTypeAuditorRelation: items,
            auditTypeAuditorRelationSelectedUsers: auditTypeAuditorRelationSelectedUsers //userSelectedRoles
        })
    }

    ConvertStringToArrayRoleReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }
    onclickCancelButton = () => {
        this.props.getAuditTypeAuditorRelationMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        const existingauditTypeAuditorRelation = Object.assign({}, this.state.auditTypeAuditorRelation);
        existingauditTypeAuditorRelation["userId"] = null;
        existingauditTypeAuditorRelation["auditTypeId"] = '';
        existingauditTypeAuditorRelation["id"] = undefined;
            this.setState({ auditTypeAuditorRelationSelectedUsers: [], selectedUsers: [], auditTypeAuditorRelation: existingauditTypeAuditorRelation })
    }
    onclickDeleteButton = (id) => {
        this.props.deleteAuditTypeAuditorRelationMasterData(id);
        this.props.getAuditTypeAuditorRelationMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    }
    onValueChangedPlant = selectedOption => {
        const existingfilterdetails = Object.assign({}, this.state.auditTypeAuditorRelations);
        //existingfilterdetails['PlantMasterId'] = selectedOption.value;
        existingfilterdetails['selectedAuditors'] = selectedOption;

        this.setState({ auditTypeAuditorRelations: existingfilterdetails, selectedAuditors: selectedOption });
    };
    handleChange(event) {
        let newVal = event.target.value
        let stateVal = this.state.value

        console.log(stateVal)
        console.log(newVal)

        stateVal.indexOf(newVal) === -1
            ? stateVal.push(newVal)
            : stateVal.length === 1
                ? (stateVal = [])
                : stateVal.splice(stateVal.indexOf(newVal), 1)

        this.setState({ value: stateVal })
    }
    render() {
        const auditorUsers = this.state.auditorUsers;
        // const options = auditorUsers && auditorUsers.length > 0 && auditorUsers.map((item, index) => {
        //     return { value: item.id, label: item.useFullName }
        // });

        return (

            <div className={style.modal_dialog} style={{ width: '97%', maxHeight: '120vh', overflow: 'visible' }}>
                <div>
                    <div className={style.field_flex_new} style={{ width: '95%' }}>
                        <div style={{ padding: '0px 0px 10px 0px', width: '30%' }}>
                            <SpanLabelForDDl>Audit Type</SpanLabelForDDl>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                            <Gap h="5px" />
                            <SELECT
                                defaultValue={this.state.auditTypeAuditorRelation.auditTypeId} onChange={this.onValueChanged('auditTypeId')}>
                                <option>Select Audit Type</option>
                                {
                                    this.state.auditTypes && this.state.auditTypes.length > 0 && this.state.auditTypes.map((item, index) => {
                                        return <option key={index} value={item.id} selected={item.id === this.state.auditTypeAuditorRelation.auditTypeId ? true : false} >{item.auditType}</option>
                                    })
                                }
                            </SELECT>
                        </div>
                        <div style={{ padding: '10px 0px', width: '100%' }}>
                            {/* <Select
                                className="width100p"
                                value={this.state.selectedAuditors}
                                onChange={this.onValueChangedPlant}
                                options={options}
                                isMulti={true}
                            /> */}

                            <SpanLabelForDDl>Auditor (Only auditor role assigned user will be displayed here) </SpanLabelForDDl>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                            <Gap h="5px" />
                            <Multiselect
                                options={this.state.auditorUsers ? this.state.auditorUsers : this.state.options} // Options to display in the dropdown
                                selectedValues={this.state.auditTypeAuditorRelationSelectedUsers} // Preselected value to persist in dropdown
                                onSelect={this.onSelect} // Function will trigger on select event
                                onRemove={this.onRemove} // Function will trigger on remove event
                                displayValue="useFullName" // Property name to display in the dropdown options
                                ref={this.multiselectRef}
                                closeIcon={"cancel"}
                                showCheckbox={true}
                                placeholder={"Select Auditors"}
                                closeOnSelect={false}
                                style={{
                                    multiselectContainer: { // To change input field position or margin
                                        margin: '8px 0px',
                                        width: '100%'
                                    },
                                    inputField: { // To change input field position or margin
                                        paddingLeft: '8px 0px'
                                    },

                                }}
                            />
                        </div>
                    </div>


                </div>

                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputsWithDisplayName(this.state.auditTypeAuditorRelation, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        else {
                            this.props.saveAuditTypeAuditorRelationMasterData(this.state.auditTypeAuditorRelation, this.props.index);
                            setTimeout(() => {
                                this.onclickCancelButton();
                            }, 100);

                        }

                    }}>save</button>
                    <button className={style.btn_danger} onClick={() => this.onclickCancelButton()}>cancel</button>
                </div>
                <br /> <br />
                <TABLE cellPadding="5px" cellSpacing="0px" style={{ width: '95%' }} >
                    <tr style={{ background: '#008080', color: '#fff' }}>
                        <th>Action</th>
                        <th>Audit Type</th>
                        <th>User Name</th>
                    </tr>
                    {this.state.auditTypeAuditorRelations && this.state.auditTypeAuditorRelations.length > 0 &&
                        this.state.auditTypeAuditorRelations.map((item, index) => {
                            return <tr key={index}>
                                <td>
                                    <button className="edit" onClick={() => this.onclickEdit(item)} >Edit</button>
                                    {/* <button className="delete" onClick={() => this.onclickDeleteButton(item.id)} >Delete</button> */}

                                </td>
                                <td>{item.auditType}</td>
                                <td style={{ textAlign: 'left' }} _ dangerouslySetInnerHTML={{ __html: item.userName ? item.userName.replace(',', " ") : '' }}>

                                </td>
                            </tr>
                        })

                    }
                </TABLE>
            </div>);
    }
};
const mapStateToProps = state => {
    const { auditTypes, users, auditTypeAuditorRelationActiontype, auditTypeAuditorRelation, auditTypeAuditorRelations, auditTypeAuditorRelationRecordsCount } = state.adminReducer;
    return { auditTypes, users, auditTypeAuditorRelationActiontype, auditTypeAuditorRelation, auditTypeAuditorRelations, auditTypeAuditorRelationRecordsCount };
}
export default connect(mapStateToProps, { getAuditTypeMasterData, getUserDetailsP, getAuditTypeAuditorRelationMasterData, getAuditTypeAuditorRelationMasterDataById, saveAuditTypeAuditorRelationMasterData, deleteAuditTypeAuditorRelationMasterData })(AuditTypeAuditorRelationAddEdit)