import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TABLE } from '../../commonStyle'
import Wrapper from '../../shared/Wrapper'


class masterCategoryDetails extends Wrapper {


    render() {
        const Data = this.props.data && this.props.data;
      
        return (
            <TABLE>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Master Category </th>
                        <th>Code</th>
                        <th>Parent Applicable</th>
                        <th>Child Applicable</th>
                        <th>Parent Category</th>
                        <th>Component  </th>
                        <th>Page</th>
                        <th>Order</th>
                        <th>Link Visible</th>
                        <th>Common For All</th>
                    </tr>
                </thead>
                <tbody>
                    {Data && Data.length > 0 && Data.map(item => (
                        <tr key={item.id}>
                            <td>
                                <button className="delete" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { this.props.deleteMasterCategory(item.id) }; }}>Delete</button>
                                <button className="edit" onClick={() => this.props.EditMasterCategory(item.id)}>Edit</button>
                            </td>
                            <td>{item.masterCategoryName}</td>
                            <td>{item.masterCategoryCode}</td>
                            <td> {item.isParentApplicable}
                            </td>
                            <td> {item.isChildApplicable}
                            </td>
                            <td> {item.parentmasterCategoryName} </td>
                            <td> {item.componentName}</td>
                            <td> {item.pageName}</td>
                            <td> {item.description}</td>
                            <td>{item.isLinkVisible}</td>
                            <td>{item.isCommonForAllModule}</td>
                        </tr>
                    ))}
                </tbody>
            </TABLE>
        )
    }
}
export default connect(null, null)(masterCategoryDetails);