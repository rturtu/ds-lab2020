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
                console.log("gataaa");
                history.push("/doctor/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Form>
                <Form.Input
                    placeholder="username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
                <Form.Input
                    placeholder="password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                <Button
                    onClick={(evt) => {
                        evt.stopPropagation();
                        handleLogIn();
                    }}
                >
                    Login Doctor
                </Button>
                <span
                    onClick={() => {
                        history.push("/doctor/signup");
                    }}
                >
                    Register Here
                </span>
            </Form>
        </Container>
    );
};

export default DoctorLogIn;
