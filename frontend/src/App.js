import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import DoctorSignUp from "./views/doctor/signup";
import DoctorLogIn from "./views/doctor/login";
import DoctorDashboard from "./views/doctor/dashboard";

import PatientSignUp from "./views/patient/signup";
import PatientLogIn from "./views/patient/login";
import PatientDashboard from "./views/patient/dashboard";

import CaregiverSignUp from "./views/caregiver/signup";
import CaregiverLogIn from "./views/caregiver/login";
import CaregiverDashboard from "./views/caregiver/dashboard";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/doctor/login" component={DoctorLogIn} />
                <Route path="/doctor/signup" component={DoctorSignUp} />
                <Route path="/doctor/dashboard" component={DoctorDashboard} />

                <Route path="/patient/login" component={PatientLogIn} />
                <Route path="/patient/signup" component={PatientSignUp} />
                <Route path="/patient/dashboard" component={PatientDashboard} />

                <Route path="/caregiver/login" component={CaregiverLogIn} />
                <Route path="/caregiver/signup" component={CaregiverSignUp} />
                <Route
                    path="/caregiver/dashboard"
                    component={CaregiverDashboard}
                />
                <Route
                    path="/"
                    component={() => (
                        <div>
                            <Link to="/doctor/login">Doctor Application</Link>
                            <br />
                            <Link to="/caregiver/login">
                                Caregiver Application
                            </Link>
                            <br />
                            <Link to="/patient/login">Patient Application</Link>
                            <br />
                        </div>
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
