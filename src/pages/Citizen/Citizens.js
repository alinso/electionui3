import React, {Component} from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import CitizenTable from './CitizenTable';

const axios = require('axios');
let theObject;


class Citizens extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', age: '', citizens: []};

        this.refreshTable = this.refreshTable.bind(this);

        theObject = this;
        this.refreshTable();
    }

    refreshTable() {
        axios.get("http://localhost:8080/citizen/all").then(res => {
            this.setState({citizens: res.data});
        });
    }


    render() {

        return (
            <div className={"main col-md-8 offset-md-2"}>
                <CitizenTable refresh={this.refreshTable} citizens={this.state.citizens}/>
            </div>


        );
    }
}

export default Citizens;
