import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from "react";


class ActiveFormatter extends React.Component {
    render() {
        return (
            <a href={this.props.href}>Details</a>
        );
    }
}

class ElectionTable extends Component {
    constructor(props) {
        super(props);
    };


    render(){
        function activeFormatter(cell, row) {
            return (
                <ActiveFormatter href={ cell } />
            );
        }



        return(
            <BootstrapTable ref="table"  data={this.props.elections} bordered={false}
                            striped hover  pagination >
                <TableHeaderColumn hiddenOnInsert isKey dataField='id'>Election ID </TableHeaderColumn>
                <TableHeaderColumn dataField='electionDate'> Eleciton Date </TableHeaderColumn>
                <TableHeaderColumn dataField='electionDetailLink' dataFormat={ activeFormatter }> Details </TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default ElectionTable;