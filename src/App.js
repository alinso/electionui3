import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Citizens from './pages/Citizen/Citizens';
import Parties from './pages/Party/Parties';
import Elections from './pages/Election/Elections';
import ElectionDetail from './pages/Election/ElectionDetail';
import Cities from './pages/City/Cities';
import Home from './pages/Home';
import './App.css';

const axios = require('axios');

class App extends Component {
    render() {


        return (
            <Router>
                <div className="main col-md-8 offset-md-2">

                    <div className="row offset-md-2">
                        <div className="col-md-2">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="col-md-2">
                            <Link to="/elections">Elections</Link>
                        </div>
                        <div className="col-md-2">
                            <Link to="/citizens">Citizens</Link>
                        </div>
                        <div className="col-md-2">
                            <Link to="/cities">Cities</Link>
                        </div>
                        <div className="col-md-2">
                            <Link to="/parties">Parties</Link>
                        </div>
                    </div>



                    <Route exact path="/" component={Home}/>
                    <Route exact path="/elections" component={Elections}/>
                    <Route path="/citizens" component={Citizens}/>
                    <Route path="/cities" component={Cities}/>
                    <Route path="/parties" component={Parties}/>
                    <Route path="/election/:id" component={ElectionDetail}/>
                </div>
            </Router>
        );
    }
}

export default App;
