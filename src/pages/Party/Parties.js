import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartyTable from "./PartyTable";

const axios = require('axios');
let theObject;


class Citizens extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',parties:[]};

        this.refreshTable  =this.refreshTable.bind(this);

       this.refreshTable();

        theObject = this;
    }

    refreshTable(){
        axios.get("http://localhost:8080/party/all").then(res=>{
            this.setState({parties:res.data});
        });
    }


    render() {

        return (
            <div className={"main col-md-8 offset-md-2"}>
                    <PartyTable refresh={this.refreshTable} onAfterDeleteRow={this.handleDelete} parties={this.state.parties}/>
            </div>


        );
    }
}

export default Citizens;
