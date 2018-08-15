import React, {Component} from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityTable from "../City/CityTable";

const axios = require('axios');
let theObject;

class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {cities: []};

        this.refreshTable = this.refreshTable.bind(this);

        this.refreshTable();

        theObject = this;
    }


    refreshTable() {
        axios.get("http://localhost:8080/city/all").then(res => {
            this.setState({cities: res.data});
        });
    }


    render() {
        return (
            <div className={"main col-md-8 offset-md-2"}>
                <CityTable refresh={this.refreshTable} onAfterDeleteRow={this.handleDelete}
                            parties={this.state.cities}/>
            </div>


        );
    }

}

export default Cities;
