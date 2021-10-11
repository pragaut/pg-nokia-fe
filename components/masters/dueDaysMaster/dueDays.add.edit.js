import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import style from '../../../theme/app.scss';
import {SpanLabelForDDl} from '../../formStyle';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';

import dynamic from 'next/dynamic';
const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })


class DueDaysAddEdit extends Wrapper {


    configs = [{
        name: 'category',
        type: 'string',
        required: true
    }, {
        name: 'dueDay',
        type: 'int',
        required: true
    }];

    constructor(props) {
        super(props);

        this.state = {
            dueDay: props.baseObject ? props.baseObject : {},
            userSelectedCategory: [{}],
            categoryDDL: [
                {
                    id: 'Self-Audit',
                    name: 'Self-Audit'
                },
                {
                    id: 'Final-Audit',
                    name: 'Final-Audit'
                }
            ],
            selectedCategory: [{}],
            userSelectedDueDay: [{}],
            dueDaysDDL: [
                { id: '1', name: '1 st' },
                { id: '2', name: '2 nd' },
                { id: '3', name: '3 rd' },
                { id: '4', name: '4 th' },
                { id: '5', name: '5 th' },
                { id: '6', name: '6 th' },
                { id: '7', name: '7 th' },
                { id: '8', name: '8 th' },
                { id: '9', name: '9 th' },
                { id: '10', name: '10 th' },
                { id: '11', name: '11 th' },
                { id: '12', name: '12 th' },
                { id: '13', name: '13 th' },
                { id: '14', name: '14 th' },
                { id: '15', name: '15 th' },
                { id: '16', name: '16 th' },
                { id: '17', name: '17 th' },
                { id: '18', name: '18 th' },
                { id: '19', name: '19 th' },
                { id: '20', name: '20 th' },
                { id: '21', name: '21 st' },
                { id: '22', name: '22 nd' },
                { id: '23', name: '23 rd' },
                { id: '24', name: '24 th' },
                { id: '25', name: '25 th' },
                { id: '26', name: '26 th' },
                { id: '27', name: '27 th' },
                { id: '28', name: '28 th' },
                { id: '29', name: '29 th' },
                { id: '30', name: '30 th' },
            ],
            selectedDueDay: [{}]
        };
    };

    componentDidMount() {
        setTimeout(() => {
            let selectedCategory = this.state.dueDay && this.state.dueDay.category;
            let userSelectedCategory = selectedCategory && this.state.categoryDDL.filter(category => category.id === selectedCategory);

            let selectedDueDay = this.state.dueDay && this.state.dueDay.dueDay;
            let userSelectedDueDay = selectedDueDay && this.state.dueDaysDDL.filter(dueDay => dueDay.id == selectedDueDay);
           
            this.setState({
                userSelectedCategory: userSelectedCategory,
                userSelectedDueDay: userSelectedDueDay
            })
        }, 300);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    onValueChanged = key => event => {
        const existingDueDays = Object.assign({}, this.state.dueDay);
        existingDueDays[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ dueDay: existingDueDays });
    };

    onCategorySelect = (selectedList, selectedItem) => {
        let listItems = null;
        selectedList.map((item) => listItems = item.id);
        const existinguser = Object.assign({}, this.state.dueDay);
        existinguser["category"] = listItems
        this.setState({
            dueDay: existinguser,
            selectedCategory: listItems
        });
    };

    onCategoryRemove = (selectedList, removedItem) => {
        let listItems = null;
        selectedList.map((item) => listItems = item.id);

        const existinguser = Object.assign({}, this.state.dueDay);
        existinguser["category"] = listItems
        this.setState({
            dueDay: existinguser,
            selectedCategory: listItems
        });
    };

    onDueDaysSelect = (selectedList, selectedItem) => {
        let listItems = null;
        let dueDate = null;
        selectedList.map((item) => (listItems = item.id, dueDate = item.name));

        const existinguser = Object.assign({}, this.state.dueDay);
        existinguser["dueDay"] = listItems;
        existinguser["dueDate"] = dueDate;
        this.setState({
            dueDay: existinguser,
            selectedDueDay: listItems
        });
    };

    onDueDaysRemove = (selectedList, removedItem) => {
        let listItems = null;
        let dueDate = null;
        selectedList.map((item) => (listItems = item.id, dueDate = item.name));

        const existinguser = Object.assign({}, this.state.dueDay);
        existinguser["dueDay"] = listItems;
        existinguser["dueDate"] = dueDate;
        this.setState({
            dueDay: existinguser,
            selectedDueDay: listItems
        });
    };

    render() {

        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="DueDays Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Category</SpanLabelForDDl>
                            <Multiselect
                                options={this.state.categoryDDL} // Options to display in the dropdown
                                selectedValues={this.state.userSelectedCategory} // Preselected value to persist in dropdown
                                onSelect={this.onCategorySelect} // Function will trigger on select event
                                onRemove={this.onCategoryRemove} // Function will trigger on remove event
                                displayValue="name"
                                placeholder={"Select category"}
                                hidePlaceholder={true}
                                closeOnSelect={false}
                                singleSelect={true}
                                id={"category"}
                                style={{
                                    multiselectContainer: { // To change input field position or margin
                                        margin: '8px'
                                    },
                                    inputField: { // To change input field position or margin
                                        paddingLeft: '8px'
                                    }
                                }}
                            />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Due Day</SpanLabelForDDl>
                            <Multiselect
                                options={this.state.dueDaysDDL} // Options to display in the dropdown
                                selectedValues={this.state.userSelectedDueDay} // Preselected value to persist in dropdown
                                onSelect={this.onDueDaysSelect} // Function will trigger on select event
                                onRemove={this.onDueDaysRemove} // Function will trigger on remove event
                                displayValue="name"
                                placeholder={"Select Day"}
                                closeOnSelect={false}
                                singleSelect={true}
                                id={"dueDays"}
                                style={{
                                    multiselectContainer: { // To change input field position or margin
                                        margin: '8px'
                                    },
                                    inputField: { // To change input field position or margin
                                        paddingLeft: '8px'
                                    },
                                    optionContainer: {
                                        maxHeight: '150px'
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '100%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label="Description:" type='text' defaultValue={this.state.dueDay.description} onChange={this.onValueChanged('description')} />
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                      const validationText = validateInputs(this.state.dueDay, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        this.props.onSave(this.state.dueDay, this.props.index);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

DueDaysAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {};

}


export default connect(mapStateToProps, {})(DueDaysAddEdit)