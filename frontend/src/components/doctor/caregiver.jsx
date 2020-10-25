import React, { useState, useEffect } from "react";
import {
    Icon,
    Table,
    Container,
    Dropdown,
    Button,
    Form,
    Modal,
    Divider,
    Confirm,
} from "semantic-ui-react";
import api from "../../api/requests";
import styled from "styled-components";
import { getGenders } from "../../utils";

const FormLabel = styled.span`
    font-size: 1.25em;
`;

const EditCaregiver = (props) => {
    const { caregiver, setCaregiver, patients, showPatients } = props;

    const handleChangePatient = (newPatients) => {
        console.log(newPatients, caregiver);
        if (newPatients.length > caregiver.patients.length) {
            const newPatient = newPatients.find(
                (patient) => !caregiver.patients.find((p) => p === patient)
            );
            console.log("new", newPatient);
            api.doctor.caregiver
                .addPatient({
                    caregiverId: caregiver.id,
                    patientId: newPatient,
                })
                .then((response) => {
                    if (response.status !== 200) throw new Error();
                    return;
                })
                .then((res) => {
                    setCaregiver("patients", [
                        ...caregiver.patients,
                        newPatient,
                    ]);
                })
                .catch(console.log);
        } else {
            const removedPatient = caregiver.patients.find(
                (patient) => !newPatients.find((p) => p === patient)
            );
            console.log("delete", removedPatient);
            api.doctor.caregiver
                .deletePatient({
                    caregiverId: caregiver.id,
                    patientId: removedPatient,
                })
                .then((response) => {
                    if (response.status !== 200) throw new Error();
                    return;
                })
                .then((res) => {
                    setCaregiver(
                        "patients",
                        caregiver.patients.filter(
                            (patient) => patient !== removedPatient
                        )
                    );
                })
                .catch(console.log);
        }
    };

    return (
        <React.Fragment>
            <FormLabel>Name</FormLabel>
            <Form.Input
                value={caregiver.name}
                onChange={(evt) => setCaregiver("name", evt.target.value)}
            />
            <FormLabel>Birth date</FormLabel>
            <Form.Input
                type="date"
                value={caregiver.birthDate}
                onChange={(evt) => setCaregiver("birthDate", evt.target.value)}
            />
            <FormLabel>Gender</FormLabel>
            <Dropdown
                value={caregiver.gender}
                onChange={(evt, data) => setCaregiver("gender", data.value)}
                options={getGenders()}
            />
            <br />
            <FormLabel>Address</FormLabel>
            <Form.Input
                value={caregiver.address}
                onChange={(evt) => setCaregiver("address", evt.target.value)}
            />
            {showPatients && (
                <React.Fragment>
                    <FormLabel>Patients</FormLabel>
                    <br />
                    <Dropdown
                        multiple
                        selection
                        value={caregiver.patients}
                        onChange={(evt, data) => {
                            handleChangePatient(data.value);
                        }}
                        options={patients.map((patient) => {
                            return {
                                text: patient.name,
                                key: patient.id,
                                value: patient.id,
                            };
                        })}
                    />
                    <br />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

const CaregiverDashboard = (props) => {
    const [caregivers, setCaregivers] = useState([]);
    const [editCaregiver, setEditCaregiver] = useState({});
    const [newCaregiver, setNewCaregiver] = useState({});
    const [deleteCaregiver, setDeleteCaregiver] = useState({});

    const [patients, setPatients] = useState([]);

    const handleSetEditCaregiver = (key, value) => {
        setEditCaregiver({
            ...editCaregiver,
            [key]: value,
        });
    };

    const handleSetNewCaregiver = (key, value) => {
        setNewCaregiver({
            ...newCaregiver,
            [key]: value,
        });
    };

    const handleAddCaregiver = () => {
        api.doctor.caregiver
            .create(newCaregiver)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                setCaregivers([...caregivers, res]);
                setNewCaregiver({});
            })
            .catch(console.log);
    };

    useEffect(() => {
        api.doctor.caregiver
            .getAll()
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                setCaregivers(
                    res.map((caregiver) => {
                        return {
                            ...caregiver,
                            patients: caregiver.patients.map(
                                (patient) => patient.id
                            ),
                        };
                    })
                );
            })
            .catch(console.log);
        api.doctor.patient
            .getAll()
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                setPatients(res);
            })
            .catch(console.log);
    }, []);

    const handleUpdateCaregiver = () => {
        api.doctor.caregiver
            .update(editCaregiver.id, editCaregiver)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return;
            })
            .then((res) => {
                setCaregivers(
                    caregivers.map((caregiver) => {
                        if (caregiver.id === editCaregiver.id) {
                            return editCaregiver;
                        } else {
                            return caregiver;
                        }
                    })
                );
                setEditCaregiver({});
            })
            .catch(console.log);
    };

    const handleDeleteCaregiver = () => {
        api.doctor.caregiver
            .delete(deleteCaregiver.id)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return;
            })
            .then((res) => {
                setCaregivers(
                    caregivers.filter(
                        (caregiver) => caregiver.id !== deleteCaregiver.id
                    )
                );
                setDeleteCaregiver({});
            })
            .catch(console.log);
    };

    return (
        <Container>
            <h2>Add new caregiver</h2>
            <EditCaregiver
                caregiver={newCaregiver}
                setCaregiver={handleSetNewCaregiver}
            />
            <Button
                onClick={() => {
                    handleAddCaregiver();
                }}
            >
                Add caregiver
            </Button>
            <Divider />

            <h2>List of caregivers</h2>
            <Table>
                <Table.Row>
                    <Table.Cell>Id</Table.Cell>
                    <Table.Cell>Name</Table.Cell>
                    <Table.Cell>Birth Date</Table.Cell>
                    <Table.Cell>Gender</Table.Cell>
                    <Table.Cell>Address</Table.Cell>
                    <Table.Cell>Actions</Table.Cell>
                </Table.Row>
                {caregivers.map((caregiver) => {
                    return (
                        <Table.Row>
                            <Table.Cell>{caregiver.id}</Table.Cell>
                            <Table.Cell>{caregiver.name}</Table.Cell>
                            <Table.Cell>{caregiver.birthDate}</Table.Cell>
                            <Table.Cell>
                                {getGenders()[caregiver.gender].text}
                            </Table.Cell>
                            <Table.Cell>{caregiver.address}</Table.Cell>
                            <Table.Cell>
                                {" "}
                                <Icon
                                    onClick={() => {
                                        setEditCaregiver(caregiver);
                                    }}
                                    name="edit"
                                />{" "}
                                <Icon
                                    onClick={() => {
                                        setDeleteCaregiver(caregiver);
                                    }}
                                    name="trash"
                                />
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table>
            <Modal open={editCaregiver.id != undefined}>
                <Modal.Content>
                    <EditCaregiver
                        showPatients
                        patients={patients}
                        caregiver={editCaregiver}
                        setCaregiver={handleSetEditCaregiver}
                    />
                    <Divider />
                    <Button onClick={handleUpdateCaregiver}>
                        Update caregiver
                    </Button>
                    <Button onClick={() => setEditCaregiver({})}>Cancel</Button>
                </Modal.Content>
            </Modal>
            <Confirm
                open={deleteCaregiver.id != undefined}
                onCancel={() => {
                    setDeleteCaregiver({});
                }}
                onConfirm={handleDeleteCaregiver}
            />
        </Container>
    );
};
export default CaregiverDashboard;
