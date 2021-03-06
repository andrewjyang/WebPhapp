import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import jwt from 'jsonwebtoken';

import "./App.css";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Login from "./Login"
import Home from "./Home";
import Patient from "./Patient";
import Dispenser from "./Dispenser";
import Prescriber from "./Prescriber";
import PatientSearch from "./PatientSearch"
import DispenserSearch from "./DispenserSearch"
import PrescriberSearch from "./PrescriberSearch"
import PrescriptionAdd from "./PrescriptionAdd"
import PrescriptionEdit from "./PrescriptionEdit"
import Error from "./Error";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
            user: '',
            pre_auth: true,
            headerToggle: true
        }

    this.authenticate_user();

  }

  componentDidMount(){
      if(window.location.pathname === '/login'){
          this.setState({headerToggle: false});
      }
  }

  // Runs the auth requests and checks to serverside.
  authenticate_user = async () => {

      // Gets the public key. Then, verifies the keys correctness.
      fetch('public.pem')
        .then(response => {
          return response.text()})
        .then(async key => {
                // Gets the old token to validate. Then, sends back a new one.
              const new_token = await axios.get(`/api/v1/users/reauth`);
              const decoded_token = jwt.verify(new_token.data, key);
              if(decoded_token === 'undefined' || decoded_token.role === 'undefined'){
                  this.setState({'user':''});
                  return false;
              }
              const user = decoded_token;
              this.setState({'user':user, pre_auth: false});
              return;
        })
        .catch(error => {
            this.setState({pre_auth : false});
            return;
        });
  }

  render() {
    // Decode the token...
    // User role from log in
    var user = this.state.user;
    const App = () => (

      <div>
        {this.state.headerToggle && <Header id={user.sub} role={user.role}/>}
        {/* authenticated routes */ }
        {this.state.pre_auth ? ""
            : this.state.user !== '' ?
          <div className="main-content">
          <Switch>
            <Route path="/login" component={Login}/>
            <Route exact path="/" component={() => <Home id={user.sub} role={user.role}/> }/>
            <Route path="/patient" component={props => <Patient {...props} id={user.sub} role={user.role} />}/>
            <Route path="/dispenser" component={props => <Dispenser {...props} id={user.sub} role={user.role}/>}/>
            <Route path="/prescriber" component={props => <Prescriber {...props} id={user.sub} role={user.role}/>}/>
            <Route path="/patientSearch" component={props => <PatientSearch {...props} id={user.sub} role={user.role}/>}/>
            <Route path="/dispenserSearch" component={props => <DispenserSearch {...props} id={user.sub} role={user.role}/>}/>
            <Route path="/prescriberSearch" component={props => <PrescriberSearch {...props} id={user.sub} role={user.role}/>}/>
            <Route path="/prescriptionAdd" component={props => <PrescriptionAdd {...props} id={user.sub} role={user.role}/>}/>
            <Route path="/prescriptionEdit" component={props => <PrescriptionEdit {...props} id={user.sub} role={user.role}/>}/>
            <Route component={Error}/>
          </Switch>
          <Footer/>
          </div>
          :
          <Switch>
            <Route path="/login" component={Login}/>
            <div className="main-content"><Route component={Error}/></div>
          </Switch> 
        }
    </div>
    );
    return (
      <BrowserRouter>
          <Switch>
            <App/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;