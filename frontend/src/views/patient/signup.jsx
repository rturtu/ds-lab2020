import React, { useState } from "react";
import { Dropdown, Button, Container, Form } from "semantic-ui-react";
import api from "../../api/requests";
import { useHistory } from "react-router-dom";
import { getGenders } from "../../utils";
import styled from "styled-components";

const FormLabel = styled.span``;

const PatientSignUp = (props) => {
    const [patient, setPatient] = useState({});
    const history = useHistory();

    const handleSetPatient = (key, value) => {
        setPatient({
            ...patient,
            [key]: value,
        });
    };

    const handleLogIn = () => {
        api.patient
            .signUp(patient)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                sessionStorage.setItem("authToken", res.token);
                history.push("/patient/dashboard");
            })
            .catch((err) => {});
    };

    return (
        <Container>
            <h1>Patient SignUp</h1>
            <Form>
                <h3>Username</h3>
                <Form.Input
                    placeholder="username"
                    value={patient.username}
                    onChange={(evt) =>
                        handleSetPatient("username", evt.target.value)
                    }
                />
                <h3>Password</h3>
                <Form.Input
                    placeholder="password"
                    value={patient.password}
                    onChange={(evt) =>
                        handleSetPatient("password", evt.target.value)
                    }
                />
                <h3>Name</h3>
                <Form.Input
                    placeholder="name"
                    value={patient.name}
                    onChange={(evt) =>
                        handleSetPatient("name", evt.target.value)
                    }
                />
                <h3>Birth date</h3>
                <Form.Input
                    placeholder="birthDate"
                    type="date"
                    value={patient.birthDate}
                    onChange={(evt) =>
                        handleSetPatient("birthDate", evt.target.value)
                    }
                />
                <h3>Gender</h3>
                <Dropdown
                    value={patient.gender}
                    onChange={(evt, data) =>
                        handleSetPatient("gender", data.value)
                    }
                    options={getGenders()}
                />
                <br />
                <h3>Address</h3>
                <Form.Input
                    placeholder="address"
                    value={patient.address}
                    onChange={(evt) =>
                        handleSetPatient("address", evt.target.value)
                    }
                />
                <Button
                    onClick={(evt) => {
                        evt.stopPropagation();
                        handleLogIn();
                    }}
                >
                    Register user
                </Button>
                <span
                    onClick={() => {
                        history.push("/patient/login");
                    }}
                >
                    Login here
                </span>
            </Form>
        </Container>
    );
};

export default PatientSignUp;
