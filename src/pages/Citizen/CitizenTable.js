import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from "react";

const axios = require('axios');
let theObject;
class CitizenTable extends Component {
    constructor(props) {
        super(props);
        theObject  =this;
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(event){
        let idsToBeDeleted  =theObject.refs.table.state.selectedRowKeys;

        axios.post("http://localhost:8080/citizen/delete",
            JSON.stringify( idsToBeDeleted),
            {
                headers: {
                    'Content-Length': 0,
                    'Content-Type': 'text/plain'
                },
                responseType: 'text'
            }
        )

    }

    validateNewRow(row){
        if(row.citizenName!=="" || Number.isInteger(row.citizenAge))
            return true;

        return false;
    }

    handleSubmit(event) {
        if(!theObject.validateNewRow(event))
        return;

        const citizenObj={};
        citizenObj.citizenName  =event.citizenName;
        citizenObj.citizenAge  =event.citizenAge;



        axios.post("http://localhost:8080/citizen/create",
            JSON.stringify( citizenObj),
            {
                headers: {
                    'Content-Length': 0,
                    'Content-Type': 'text/plain'
                },
                responseType: 'text'
            }
        )

            .then(res => {
                theObject.props.refresh();
            })
    }


    render() {
        const options = {
            afterDeleteRow: this.handleDelete,  // A hook for after droping rows.
            onAddRow:this.handleSubmit
        };
        function onAfterSaveCell(row, cellName, cellValue) {

            if(cellValue==="")
                return;

            axios.post("http://localhost:8080/citizen/update",
                JSON.stringify(row),
                {
                    headers: {
                        'Content-Length': 0,
                        'Content-Type': 'text/plain'
                    },
                    responseType: 'text'
                });
        }

        const selectRow = {
            mode: 'checkbox'
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: onAfterSaveCell  // a hook for after saving cell
        };
        return (
            <BootstrapTable insertRow ref="table" options={options}  selectRow={selectRow} data={this.props.citizens} bordered={false}
                            striped hover deleteRow pagination cellEdit={cellEditProp}>
                <TableHeaderColumn hiddenOnInsert isKey dataField='id'> Citizen ID </TableHeaderColumn>
                <TableHeaderColumn dataField='citizenName'> Citizen Name </TableHeaderColumn>
                <TableHeaderColumn dataField='citizenAge'> Citizen Age </TableHeaderColumn>
            </BootstrapTable>
        )
    }

}
export default CitizenTable;