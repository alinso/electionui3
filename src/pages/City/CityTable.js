import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Component} from "react";
import React from "react";

const axios = require('axios');
let theObject;

const politicalInclination=[
    'RADICAL REPUBLICAN',
    'MIDDLE REPUBLICAN',
    'MIDDLE',
    'MIDDLE DEMOCRAT',
    'RADICAL DEMOCRAT'
];


class CityTable extends Component {
    constructor(props) {
        super(props);
        theObject = this;
    }




    validateNewRow(row){
        if(row.cityName!=="")
            return true;

        return false;
    }


    handleSubmit(event) {

        const party={};
        party.partyName  =event.partyName;

        if(!theObject.validateNewRow(event))
            return;


        axios.post("http://localhost:8080/city/create",
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
            onAddRow:this.handleSubmit
        };
        const selectRow = {
            mode: 'checkbox'
        };

        function onAfterSaveCell(row, cellName, cellValue) {

            if(cellValue==="")
                return;

            axios.post("http://localhost:8080/city/update/",
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
            <BootstrapTable  insertRow={true}  ref="table" options={options}  selectRow={selectRow} data={this.props.cities} bordered={false} striped hover
                             deleteRow={true} pagination cellEdit={cellEditProp}>
                <TableHeaderColumn hiddenOnInsert  isKey={true} dataField='id'> City ID </TableHeaderColumn>
                <TableHeaderColumn dataField='cityName'> City Name </TableHeaderColumn>
                <TableHeaderColumn dataField='politicalInclination'  editable={ { type: 'select', options: { values: politicalInclination } } }> Political Inclination </TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default CityTable;