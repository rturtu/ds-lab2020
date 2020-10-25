import React, { useState } from "react";
import { Dropdown, Button, Container, Form } from "semantic-ui-react";
import api from "../../api/requests";
import { useHistory } from "react-router-dom";
import { getGenders } from "../../utils";
import styled from "styled-components";

const FormLabel = styled.span``;

const CaregiverSignUp = (props) => {
    const [caregiver, setCaregiver] = useState({});
    const history = useHistory();

    const handleSetCaregiver = (key, value) => {
        setCaregiver({
            ...caregiver,
            [key]: value,
        });
    };

    const handleLogIn = () => {
        api.caregiver
            .signUp(caregiver)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                sessionStorage.setItem("authToken", res.token);
                history.push("/caregiver/dashboard");
            })
            .catch((err) => {});
    };

    return (
        <Container>
            <h1>Caregiver SignUp</h1>
            <Form>
                <h3>Username</h3>
                <Form.Input
                    placeholder="username"
                    value={caregiver.username}
                    onChange={(evt) =>
                        handleSetCaregiver("username", evt.target.value)
                    }
                />
                <h3>Password</h3>
                <Form.Input
                    placeholder="password"
                    value={caregiver.password}
                    onChange={(evt) =>
                        handleSetCaregiver("password", evt.target.value)
                    }
                />
                <h3>Name</h3>
                <Form.Input
                    placeholder="name"
                    value={caregiver.name}
                    onChange={(evt) =>
                        handleSetCaregiver("name", evt.target.value)
                    }
                />
                <h3>Birth date</h3>
                <Form.Input
                    placeholder="birthDate"
                    type="date"
                    value={caregiver.birthDate}
                    onChange={(evt) =>
                        handleSetCaregiver("birthDate", evt.target.value)
                    }
                />
                <FormLabel>Gender</FormLabel>
                <Dropdown
                    value={caregiver.gender}
                    onChange={(evt, data) =>
                        handleSetCaregiver("gender", data.value)
                    }
                    options={getGenders()}
                />
                <br />
                <h3>Address</h3>
                <Form.Input
                    placeholder="address"
                    value={caregiver.address}
                    onChange={(evt) =>
                        handleSetCaregiver("address", evt.target.value)
                    }
                />
                <Button
                    onClick={(evt) => {
                        evt.stopPropagation();
                        handleLogIn();
                    }}
                >
                    Register caregiver
                </Button>
                <span
                    onClick={() => {
                        history.push("/caregiver/login");
                    }}
                >
                    Login here
                </span>
            </Form>
        </Container>
    );
};

export default CaregiverSignUp;
