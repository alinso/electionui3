import React, {Component} from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityTable from "../City/CityTable";

const axios = require('axios');
let theObject;

const politicalInclination=[
    'RADICAL REPUBLICAN',
    'MIDDLE REPUBLICAN',
    'MIDDLE',
    'MIDDLE DEMOCRAT',
    'RADICAL DEMOCRAT'
];

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

            let cities  =[];
            res.data.forEach(function (val) {
               val.politicalInclination  = politicalInclination[val.politicalInclination];
               cities.push(val);
            });

            this.setState({cities: cities});
        });
    }

    componentDidMount(){
        this.refreshTable();
}

    render() {
        return (
            <div className={"main col-md-8 offset-md-2"}>
                <CityTable politicalInclination={politicalInclination} refresh={this.refreshTable} onAfterDeleteRow={this.handleDelete}
                            cities={this.state.cities}/>
            </div>


        );
    }

}

export default Cities;
