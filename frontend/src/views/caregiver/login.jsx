import React, { useState } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import api from "../../api/requests";
import { useHistory } from "react-router-dom";

const CaregiverLogIn = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogIn = () => {
        api.caregiver
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
                history.push("/caregiver/dashboard");
            })
            .catch(console.log);
    };

    return (
        <Container>
            <h1>Caregiver LogIn</h1>
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
                    Login caregiver
                </Button>
                <span
                    onClick={() => {
                        history.push("/caregiver/signup");
                    }}
                >
                    Register Here
                </span>
            </Form>
        </Container>
    );
};

export default CaregiverLogIn;
