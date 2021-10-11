import Wrapper from '../shared/Wrapper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { constants } from '../../utils/constants';
import { getRoleMasterData, getSupportingDocumentMaster, getCompanyMaster, getModuleMasterData, getPlantMaster } from '../../../actions/admin.action';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';
import style from '../../theme/app.scss';
import { SELECT } from '../formStyle';
import dynamic from 'next/dynamic';
import { Button } from '../formStyle';
import Gap from '../Gap';
import Input from '../shared/InputBox';
import * as CommonStyle from '../commonStyle';

import Select from 'react-select';
import styled from 'styled-components';
const DivForSelect = styled.div`
width:100% !important;
.width100p{
    width:100% !important;
}
`;

//import Select from 'react-select'

class InvoiceAddEdit extends Wrapper {

    constructor(props) {
        super(props);

        this.natureOfTransactionIdRefs = React.createRef();
        this.plantMasterIdRefs = React.createRef();
        this.voucherTypeMasterIdRefs = React.createRef();
        this.multiselectRef = React.createRef();
        this.state = {
            companys: null,
            plants: null,
            isParentInvoiceDetailsDDLVisible: false,
            masterCode: null,
            SearchPlantName: null,
            selectedPlantOption: null,
            filterdetails: {
                companyMasterId: '',
                PlantMasterId: '',
                departmentMasterId: ''
            },
            AcceptanceStatusvalue: undefined,
            AcceptanceStatusDDL: [
                {
                    text: 'All',
                    dataValues: undefined
                },
                {
                    text: 'Accepted',
                    dataValues: 'Accepted'
                },
                {
                    text: 'Not-Accepted',
                    dataValues: 'Not-Accepted'
                }
            ],
            PaymentStatusDDLSelectedValue: undefined,
        };
    };

    onValueChanged = key => event => {
        const existingfilterdetails = Object.assign({}, this.state.filterdetails);
        existingfilterdetails[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ filterdetails: existingfilterdetails });
    };

    onValueChangedPlant = selectedOption => {
        const existingfilterdetails = Object.assign({}, this.state.filterdetails);
        existingfilterdetails['PlantMasterId'] = selectedOption.value;
        existingfilterdetails['selectedPlantOption'] = selectedOption;

        this.setState({ filterdetails: existingfilterdetails, selectedPlantOption: selectedOption });
    };
    onTextChange = key => event => {
        const existingInvoice = Object.assign({}, this.state.filterdetails);
        existingInvoice[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ invoice: existingInvoice });
    };
    onkeyUpfun = event => {
        this.setState({ SearchPlantName: event.target.value })
    }
    OnChangeAcceptanceStatusDDL = key => event => {
        const existingInvoice = Object.assign({}, this.state.filterdetails);
        let TargetValues = event.target.value;

        if (TargetValues === "Accepted") {
            existingInvoice["isAcceptancePending"] = 0;
            existingInvoice["isAccepted"] = 1;
        }
        else if (TargetValues === 'Not-Accepted') {
            existingInvoice["isAcceptancePending"] = 1;
            existingInvoice["isAccepted"] = 0;
        }
        else {
            existingInvoice["isAcceptancePending"] = null;
            existingInvoice["isAccepted"] = null;
        }
        this.setState({
            filterdetails: existingInvoice,
            AcceptanceStatusvalue: TargetValues
        })
    }
    OnChangePaymentStatusDDL = key => event => {
        const existingInvoice = Object.assign({}, this.state.filterdetails);
        let TargetValues = event.target.value;

        if (TargetValues === "Complete") {
            existingInvoice["isPaymentDone"] = 1;
            existingInvoice["isPartiallyPayment"] = 0;
        }
        else if (TargetValues === 'Partial') {
            existingInvoice["isPaymentDone"] = 0;
            existingInvoice["isPartiallyPayment"] = 1;
        }
        else if (TargetValues === 'Pending') {
            existingInvoice["isPaymentDone"] = 0;
            existingInvoice["isPartiallyPayment"] = 0;
        }
        else {
            existingInvoice["isPaymentDone"] = null;
            existingInvoice["isPartiallyPayment"] = null;
        }
        this.setState({
            filterdetails: existingInvoice,
            PaymentStatusDDLSelectedValue: TargetValues
        })
    }

    filterByNames = (data, inputValue) => {
        // Create a dynamic regex expression object with ignore case sensitivity
        const re = new RegExp(_.escapeRegExp(inputValue), "i");
        const clonedData = _.cloneDeep(data);
        const results = clonedData.filter((object) => {
            return object.list.filter((item) => {
                if (re.test(item.plantName)) {
                    // Calculates the characters to highlight in text based on query
                    const matches = match(item.plantName, inputValue);
                    // Breaks the given text to parts based on matches.
                    // After that create a new property named `parts` and assign an array to it.
                    item["parts"] = parse(item.plantName, matches);
                    return true;
                } else {
                    return false;
                }
            }).length > 0 || re.test(object.plantName);
        });
        return results;
    };

    componentDidMount() {

        let invoiceFilters = {
            "userId": '',
        };
        const existingInvoice = Object.assign({}, this.state.filterdetails);
        const FilterValues = this.props.FilterValues && this.props.FilterValues;
        //console.log("FilterValues", FilterValues);

        if (FilterValues) {
            if (FilterValues.PlantMasterId) {
                existingInvoice["PlantMasterId"] = FilterValues.PlantMasterId;
            }
            if (FilterValues.voucherTypemasterId) {
                existingInvoice["voucherTypemasterId"] = FilterValues.voucherTypemasterId;
            }
            if (FilterValues.natureOfTransactionId) {
                existingInvoice["natureOfTransactionId"] = FilterValues.natureOfTransactionId;
            }
            if (FilterValues.fromDate) {
                existingInvoice["fromDate"] = FilterValues.fromDate;
            }
            if (FilterValues.toDate) {
                existingInvoice["toDate"] = FilterValues.toDate;
            }
            if (FilterValues.fromUploadDate) {
                existingInvoice["fromUploadDate"] = FilterValues.fromUploadDate;
            }
            if (FilterValues.toUploadDate) {
                existingInvoice["toUploadDate"] = FilterValues.toUploadDate;
            }
            if (FilterValues.selectedPlantOption) {
                existingInvoice["selectedPlantOption"] = FilterValues.selectedPlantOption;
            }
        }
        this.setState({ filterdetails: existingInvoice })
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, "voucherType");
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'natureOfTransaction');


    };

    onClickFilterButton = () => {
        this.props.ClickOnSubmitFilterValues(this.state.filterdetails)
    }
    onClickCancelButton = () => {
        this.props.ClickOnSubmitFilterValues(undefined)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("nextProps.masterDetails : ",nextProps.masterDetailsCategory);
        if (nextProps.plants !== null && nextProps.plants !== undefined && nextProps.plants !== this.state.plants) {
            this.setState({
                plants: nextProps.plants
            })
        }
        if (nextProps.masterCode === "voucherType" && nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.voucherTypes) {
            this.setState({
                voucherTypes: nextProps.masterDetailsCategory,
                masterCode: nextProps.masterCode
            })
        }
        if (nextProps.masterCode === "natureOfTransaction" && nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.natureOfTransactions) {
            this.setState({
                natureOfTransactions: nextProps.masterDetailsCategory,
                masterCode: nextProps.masterCode
            })
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };
    render() {

        const loggedUser = this.loggedUser();
        const plantMasterId = loggedUser.plantMasterId;
        let PlandDetails = this.state.plants && this.state.plants;
        const invoicesFilter = this.state.invoices && this.state.invoices.length > 0 && this.state.invoices.filter(item => (item.toPlantMasterId === plantMasterId || item.fromPlantMasterId === plantMasterId) && item.voucherType === "Tax Invoice")
        const { AcceptanceStatusDDL, PaymentStatusDDL, PaymentStatusDDLForPaymentDetailsPage } = this.state;
        const { AcceptanceDropdownVisible, PaymentStatusDropdownVisible, PaymentStatusFromPaymentDetailsDropdownVisible, dateFilterVisible, uploadDateFilterVisible, hideplanrFilter } = this.props;
        //console.log("filterdetails on filter values", this.state.filterdetails)
        //let StartDate = this.state.filterdetails.fromDate && this.state.filterdetails.fromDate ? moment(this.state.filterdetails.fromDate).format("YYYY-MM-DD") : undefined;
        //let EndDate =  this.state.filterdetails.toDate && this.state.filterdetails.toDate ? moment(this.state.filterdetails.toDate).format("YYYY-MM-DD") : undefined;
        let StartDate = this.state.filterdetails.fromDate ? this.state.filterdetails.fromDate : undefined;
        let EndDate = this.state.filterdetails.toDate ? this.state.filterdetails.toDate : undefined;

        let UploadStartDate = this.state.filterdetails.fromUploadDate ? this.state.filterdetails.fromUploadDate : undefined;
        let UploadEndDate = this.state.filterdetails.toUploadDate ? this.state.filterdetails.toUploadDate : undefined;
        const options = PlandDetails && PlandDetails.length > 0 && PlandDetails.filter(item => item.id !== plantMasterId).map((item, index) => {
            return { value: item.id, label: item.plantName }
        });
        return (<CommonStyle.MainDiv
            justifycontent={"flex-start"}
        >
            <CommonStyle.MainDiv
                width={"20%"}
                justifycontent={"flex-start"}
                flexdirection={"column"}
            >
                <span style={{ marginLeft: "8px" }}>Company - Plant</span>
                <DivForSelect>
                    <Select
                        className="width100p"
                        value={this.state.filterdetails.selectedPlantOption}
                        onChange={this.onValueChangedPlant}
                        options={options}
                    />
                </DivForSelect>
            </CommonStyle.MainDiv>
            <div className={style.modal_dialog} style={{ width: '100%', maxHeight: '120vh', maxWidth: '40vw' }}>
                {/* <ModalHeader
                    heading="Invoice Master"   
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '90%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            {(!hideplanrFilter || hideplanrFilter === 0 || hideplanrFilter === false) &&
                                <div className={style.field_flex_new} style={{ flexDirection: 'column', textAlign: 'left', width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <span style={{ marginLeft: "8px" }}>Company - Plant</span>
                                    <DivForSelect>
                                        <Select
                                            className="width100p"
                                            value={this.state.filterdetails.selectedPlantOption}
                                            onChange={this.onValueChangedPlant}
                                            options={options}
                                        />
                                    </DivForSelect>
                                </div>
                            }

                            <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                <span style={{ marginLeft: "8px" }}>Voucher Type</span>
                                <SELECT margin="8px" ref={this.voucherTypeMasterIdRefs}
                                    value={this.state.filterdetails.voucherTypemasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('voucherTypemasterId')}
                                >
                                    <option key={"selectlist"} value='-1'>{"Select List"}</option>
                                    {this.state.voucherTypes &&
                                        this.state.voucherTypes.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.value}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>

                                <span style={{ marginLeft: "8px" }}>Nature Of Transaction</span>
                                <SELECT margin="8px" ref={this.natureOfTransactionIdRefs}
                                    value={this.state.filterdetails.natureOfTransactionId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('natureOfTransactionId')}
                                >
                                    <option key={"selectlist"} value='-1'>{"Select List"}</option>
                                    {this.state.natureOfTransactions &&
                                        this.state.natureOfTransactions.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.value}</option>
                                        })
                                    }
                                </SELECT>
                            </div>


                            {AcceptanceDropdownVisible === true &&
                                <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <span style={{ marginLeft: "8px" }}>Acceptance Status</span>
                                    <SELECT margin="8px"
                                        value={this.state.AcceptanceStatusvalue} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.OnChangeAcceptanceStatusDDL('AcceptanceStatusvalue')}
                                    >
                                        {/* <option key={"selectlist"} value={"-1"}>{"Select List"}</option> */}
                                        {AcceptanceStatusDDL &&
                                            AcceptanceStatusDDL.map((item, index) => {
                                                return <option key={index} value={item.dataValues}>{item.text}</option>
                                            })
                                        }
                                    </SELECT>
                                </div>
                            }
                            {PaymentStatusDropdownVisible === true &&
                                <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <span style={{ marginLeft: "8px" }}>Payment Status</span>
                                    <SELECT margin="8px"
                                        value={this.state.PaymentStatusDDLSelectedValue} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.OnChangePaymentStatusDDL('PaymentStatusDDLSelectedValue')}
                                    >
                                        {/* <option key={"selectlist"} value={"-1"}>{"Select List"}</option> */}
                                        {PaymentStatusDDL &&
                                            PaymentStatusDDL.map((item, index) => {
                                                return <option key={index} value={item.dataValues}>{item.text}</option>
                                            })
                                        }
                                    </SELECT>
                                </div>
                            }
                            {PaymentStatusFromPaymentDetailsDropdownVisible === true &&
                                <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <span style={{ marginLeft: "8px" }}>Payment Status</span>
                                    <SELECT margin="8px"
                                        value={this.state.PaymentStatusDDLSelectedValue} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.OnChangePaymentStatusDDL('PaymentStatusDDLSelectedValue')}
                                    >
                                        {/* <option key={"selectlist"} value={"-1"}>{"Select List"}</option> */}
                                        {PaymentStatusDDLForPaymentDetailsPage &&
                                            PaymentStatusDDLForPaymentDetailsPage.map((item, index) => {
                                                return <option key={index} value={item.dataValues}>{item.text}</option>
                                            })
                                        }
                                    </SELECT>
                                </div>
                            }
                            {dateFilterVisible &&
                                <div className={style.field_flex_new} style={{ width: '100%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                        <Input label="From  Date:" type='date' defaultValue={StartDate} onChange={this.onValueChanged('fromDate')} />
                                    </div>
                                    <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                        <Input label="To Date:" type='date' defaultValue={EndDate} onChange={this.onValueChanged('toDate')} />
                                    </div>
                                </div>
                            }
                            {uploadDateFilterVisible &&
                                <div className={style.field_flex_new} style={{ width: '100%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                        <Input label="Upload From :" type='date' defaultValue={UploadStartDate} onChange={this.onValueChanged('fromUploadDate')} />
                                    </div>
                                    <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                        <Input label="Upload To:" type='date' defaultValue={UploadEndDate} onChange={this.onValueChanged('toUploadDate')} />
                                    </div>
                                </div>
                            }
                            <Gap h="20px" />
                            <div className={style.field_flex_new} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    bgColor="#24a0ed "
                                    color="#ffffff"
                                    height="40px"
                                    width="150px"
                                    borderRadius="5px"
                                    bgChangeHover="#ffffff"
                                    hoverColor="#24a0ed"
                                    border="solid 1px #005900"
                                    lineheight="1.5"
                                    onClick={() => this.onClickFilterButton()}
                                >
                                    Filter
             </Button>
                                <Button
                                    bgColor="#24a0ed "
                                    color="#ffffff"
                                    height="40px"
                                    width="150px"
                                    borderRadius="5px"
                                    bgChangeHover="#ffffff"
                                    hoverColor="#24a0ed"
                                    border="solid 1px #005900"
                                    lineheight="1.5"
                                    onClick={() => this.onClickCancelButton()}
                                >
                                    Cancel
             </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </CommonStyle.MainDiv>
        );
    }
};

InvoiceAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { natureOfTransactions, companys, plants } = state.adminReducer;
    const { masterDetail, masterDetails } = state.masterDetailReducer;
    const { masterDetailCategory, masterDetailsCategory, masterCode } = state.masterDetailByCategoryReducer;


    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { natureOfTransactions, companys, plants, masterDetail, masterDetails, masterDetailCategory, masterDetailsCategory, masterCode, errorType, errorMessage };
}
export default connect(mapStateToProps, { getSupportingDocumentMaster, getCompanyMaster, getPlantMaster, getRoleMasterData, getModuleMasterData, getMasterDetailsBymasterCategoryCode })(InvoiceAddEdit)