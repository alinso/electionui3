import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ElectionTable from "./ElectionTable";
const axios = require('axios');
let theObject;
class  Elections extends Component{
    constructor(props) {
        super(props);
        this.state = {elections:[]};
        this.refreshTable  =this.refreshTable.bind(this);
        theObject = this;
        this.refreshTable();
    }


    refreshTable(){
        axios.get("http://localhost:8080/election/all").then(res=>{


            let electionList=[];
            res.data.forEach(function (val) {
                let election  ={...val}
                election.electionDetailLink  ="http://localhost:3000/election/"+val.id;
                electionList.push(election);
            });
            this.setState({elections:electionList});
        });
    }


     refreshElection() {
        axios.get("http://localhost:8080/election/refresh").then(function () {
            alert("new election !");
           theObject.refreshTable();
        });
    }

    render(){


        return(
            <div className={"main col-md-8 offset-md-2"}>
            <button className={"btn btn-info"} onClick={this.refreshElection}>Click for a new election</button>
            <ElectionTable elections={this.state.elections}/>
            </div>)
    }
}

export default Elections;