import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

const axios = require('axios');
let theObject;

class ElectionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {election: {}, parties: []};

        this.loadDetail()
    };


    loadDetail() {

        console.log(this.props);
        axios.get("http://localhost:8080/election/" + this.props.match.params.id).then(res => {


            let election  ={}
            let voteCount = 0;
            election.detail = res.data[0].election;

            res.data.forEach(function (val) {
                voteCount += val.voteCount;
            });
            election.voteCount =voteCount;

            this.setState({parties: res.data});
            this.setState({election: election});
        });
    }


    componentDidmount() {
        this.loadDetail()
    }

    render() {

        let options = {
            sortName: 'voteCount',
            sortOrder: 'desc'
        }
        return (
            <div className={"main col-md-8 offset-md-2"}>
                <h5>{this.state.election.detail}</h5>
                <h5>Total Vote  : {this.state.election.voteCount}</h5>
                <BootstrapTable data={this.state.parties} bordered={false} striped hover options={options}>
                    <TableHeaderColumn isKey dataField='name'> Party Name </TableHeaderColumn>
                    <TableHeaderColumn dataField='voteCount' dataSort={true}> Vote Count </TableHeaderColumn>
                </BootstrapTable>
            </div>)
    }

}

export default ElectionDetail