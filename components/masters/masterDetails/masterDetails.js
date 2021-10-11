import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TABLE } from '../../commonStyle'
import Wrapper from '../../shared/Wrapper'


class masterCategoryDetails extends Wrapper {


    render() {
        const Data = this.props.data && this.props.data;

        const { masterCateogyId, MasterName, ParentMasterName, parentMasterCategoryId } = this.props;
        let srl = 0;
        return (
            <TABLE>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Sr#</th>
                        <th>{MasterName}</th>
                        <th>Code</th>
                        {/* <th>other</th> */}
                        {ParentMasterName && ParentMasterName !== 'undefined' &&
                            <th>{ParentMasterName}</th>
                        }
                        {/* <th>Order</th> */}
                    </tr>
                </thead>
                <tbody>
                    {Data && Data.length > 0 && Data.map((item) => {
                        srl = srl + 1;
                        return <tr key={item.id}>
                            <td className="textalignleft">
                                <button className="edit" onClick={() => this.props.EditMasterDetails(item.id, item.masterCategoryID, MasterName)}>Edit</button>
                                <button className="delete" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { this.props.deleteMasterDetails(item.id, item.masterCategoryID, MasterName) }; }}>Delete</button>

                            </td>
                            <td className="textalignleft">{srl}</td>
                            <td className="textalignleft">{item.value}</td>
                            <td className="textalignleft">{item.code}</td>
                            {/* <td> {item.other}
                            </td> */}
                            {ParentMasterName && ParentMasterName !== 'undefined' &&
                                <td className="textalignleft"> {item.parentValue}  </td>
                            }
                            {/* <td> {item.order} </td>  */}
                        </tr>
                    })
                    }
                </tbody>
            </TABLE >
        )
    }
}
export default connect(null, null)(masterCategoryDetails);