import React, {Component} from 'react';
import '../App.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {parties: [], election: ""};
    }


    render() {
        return (
            <div className={"main"}>
                <h3>Home Page</h3>

                <h4>Welcome to democratic election simulator</h4>

            </div>
        );
    }
}

export default Home;
