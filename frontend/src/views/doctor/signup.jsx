import React, { useState } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import api from "../../api/requests";
import { useHistory } from "react-router-dom";

const DoctorLogIn = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogIn = () => {
        api.doctor
            .signUp({
                username,
                password,
            })
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                sessionStorage.setItem("authToken", res.token);
                history.push("/doctor/dashboard");
            })
            .catch((err) => {});
    };

    return (
        <Container>
            <h1>Doctor SignUp</h1>
            <Form>
                <h3>Username</h3>
                <Form.Input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
                <h3>Password</h3>
                <Form.Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                <Button
                    className="doctor-signup-button"
                    onClick={(evt) => {
                        evt.stopPropagation();
                        handleLogIn();
                    }}
                >
                    Register doctor
                </Button>
                <span
                    onClick={() => {
                        history.push("/doctor/login");
                    }}
                >
                    Login here
                </span>
            </Form>
        </Container>
    );
};

export default DoctorLogIn;
