import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Component} from "react";
import React from "react";

const axios = require('axios');
let theObject;

class PartyTable extends Component {
    constructor(props) {
        super(props);
        theObject = this;


    }

    validateNewRow(row){
        if(row.partyName!=="")
            return true;

        return false;
    }

    handleDelete(event){
        let idsToBeDeleted  =theObject.refs.table.state.selectedRowKeys;


        axios.post("http://localhost:8080/party/delete",
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

    handleSubmit(event) {

        const party={};
        party.partyName  =event.partyName;

        if(!theObject.validateNewRow(event))
            return;


        axios.post("http://localhost:8080/party/create",
            JSON.stringify( party),
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
        const selectRow = {
            mode: 'checkbox'
        };

        function onAfterSaveCell(row, cellName, cellValue) {

            if(cellValue==="")
                return;

            axios.post("http://localhost:8080/party/update/",
                JSON.stringify(row),
                {
                    headers: {
                        'Content-Length': 0,
                        'Content-Type': 'text/plain'
                    },
                    responseType: 'text'
                });
        }

        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: onAfterSaveCell  // a hook for after saving cell
        };

        return (
            <BootstrapTable  insertRow={true}  ref="table" options={options}  selectRow={selectRow} data={this.props.parties} bordered={false} striped hover
                             deleteRow={true} pagination cellEdit={cellEditProp}>
                <TableHeaderColumn hiddenOnInsert  isKey={true} dataField='id'> Party ID </TableHeaderColumn>
                <TableHeaderColumn dataField='partyName'> Party Name </TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default PartyTable;