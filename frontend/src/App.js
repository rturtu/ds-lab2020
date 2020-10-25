import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import DoctorSignUp from "./views/doctor/signup";
import DoctorLogIn from "./views/doctor/login";
import DoctorDashboard from "./views/doctor/dashboard";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/doctor/login" component={DoctorLogIn} />
                <Route path="/doctor/signup" component={DoctorSignUp} />
                <Route path="/doctor/dashboard" component={DoctorDashboard} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
