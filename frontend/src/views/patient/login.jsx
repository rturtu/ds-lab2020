import React, { useState } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import api from "../../api/requests";
import { useHistory } from "react-router-dom";

const PatientLogin = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogIn = () => {
        api.patient
            .logIn({
                username,
                password,
            })
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                sessionStorage.setItem("authToken", res.token);
                history.push("/patient/dashboard");
            })
            .catch(console.log);
    };

    return (
        <Container>
            <h1>Patient LogIn</h1>
            <Form>
                <h3>Username</h3>
                <Form.Input
                    placeholder="username"
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
                    onClick={(evt) => {
                        evt.stopPropagation();
                        handleLogIn();
                    }}
                >
                    Login Patient
                </Button>
                <span
                    onClick={() => {
                        history.push("/patient/signup");
                    }}
                >
                    Register Here
                </span>
            </Form>
        </Container>
    );
};

export default PatientLogin;
