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

const EditPatient = (props) => {
    const { showMedication, patient, setPatient } = props;
    const [newMedication, setNewMedication] = useState({});

    const getGenders = () => {
        return ["Unspecified", "Male", "Female"].map((gender, index) => {
            return {
                key: index,
                text: gender,
                value: index,
            };
        });
    };

    const handleAddNewMedication = () => {
        api.doctor.patient
            .addMedication({ ...newMedication, patientId: patient.id })
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                setPatient("medications", [...patient.medications, res]);
            })
            .catch(console.log);
    };

    const handleDeleteMedication = (medicationId) => {
        api.doctor.patient
            .deleteMedication(medicationId)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return;
            })
            .then((res) => {
                setPatient(
                    "medications",
                    patient.medications.filter((med) => med.id !== medicationId)
                );
            })
            .catch(console.log);
    };

    return (
        <React.Fragment>
            <FormLabel>Name</FormLabel>
            <Form.Input
                value={patient.name}
                onChange={(evt) => setPatient("name", evt.target.value)}
            />
            <FormLabel>Birth date</FormLabel>
            <Form.Input
                type="date"
                value={patient.birthDate}
                onChange={(evt) => setPatient("birthDate", evt.target.value)}
            />
            <FormLabel>Gender</FormLabel>
            <Dropdown
                value={patient.gender}
                onChange={(evt, data) => setPatient("gender", data.value)}
                options={getGenders()}
            />
            <br />
            <FormLabel>Address</FormLabel>
            <Form.Input
                value={patient.address}
                onChange={(evt) => setPatient("address", evt.target.value)}
            />
            {showMedication && (
                <React.Fragment>
                    <FormLabel>Medication</FormLabel>
                    <ul>
                        {patient.medications.map((med) => (
                            <li>
                                {`${med.name} - [${med.dosage}] (${med.sideEffects})`}{" "}
                                <Icon
                                    name="trash"
                                    onClick={() => {
                                        handleDeleteMedication(med.id);
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: "flex" }}>
                        <Form.Input
                            value={newMedication.name}
                            onChange={(evt) =>
                                setNewMedication({
                                    ...newMedication,
                                    name: evt.target.value,
                                })
                            }
                            placeholder="name"
                        />
                        <Form.Input
                            value={newMedication.dosage}
                            onChange={(evt) =>
                                setNewMedication({
                                    ...newMedication,
                                    dosage: evt.target.value,
                                })
                            }
                            placeholder="dosage"
                        />
                        <Form.Input
                            value={newMedication.sideEffects}
                            onChange={(evt) =>
                                setNewMedication({
                                    ...newMedication,
                                    sideEffects: evt.target.value,
                                })
                            }
                            placeholder="side effects"
                        />
                    </div>
                    <Button
                        onClick={() => {
                            handleAddNewMedication();
                        }}
                    >
                        Add new medication
                    </Button>
                    <br />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

const PatientDashboard = (props) => {
    const [patients, setPatients] = useState([]);
    const [editPatient, setEditPatient] = useState({});
    const [newPatient, setNewPatient] = useState({});
    const [deletePatient, setDeletePatient] = useState({});

    const handleSetEditPatient = (key, value) => {
        setEditPatient({
            ...editPatient,
            [key]: value,
        });
    };

    const handleSetNewPatient = (key, value) => {
        setNewPatient({
            ...newPatient,
            [key]: value,
        });
    };

    const handleAddPatient = () => {
        api.doctor.patient
            .create(newPatient)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                setPatients([...patients, res]);
                setNewPatient({});
            })
            .catch(console.log);
    };

    useEffect(() => {
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

    const handleUpdatePatient = () => {
        api.doctor.patient
            .update(editPatient.id, editPatient)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return;
            })
            .then((res) => {
                setPatients(
                    patients.map((patient) => {
                        if (patient.id === editPatient.id) {
                            return editPatient;
                        } else {
                            return patient;
                        }
                    })
                );
                setEditPatient({});
            })
            .catch(console.log);
    };

    const handleDeletePatient = () => {
        api.doctor.patient
            .delete(deletePatient.id)
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return;
            })
            .then((res) => {
                setPatients(
                    patients.filter(
                        (patient) => patient.id !== deletePatient.id
                    )
                );
                setDeletePatient({});
            })
            .catch(console.log);
    };

    console.log(editPatient);

    return (
        <Container>
            <h2>Add new patient</h2>
            <EditPatient
                patient={newPatient}
                setPatient={handleSetNewPatient}
            />
            <Button
                onClick={() => {
                    handleAddPatient();
                }}
            >
                Add patient
            </Button>
            <Divider />

            <h2>List of patients</h2>
            <Table>
                <Table.Row>
                    <Table.Cell>Id</Table.Cell>
                    <Table.Cell>Name</Table.Cell>
                    <Table.Cell>Birth Date</Table.Cell>
                    <Table.Cell>Gender</Table.Cell>
                    <Table.Cell>Address</Table.Cell>
                    <Table.Cell>Actions</Table.Cell>
                </Table.Row>
                {patients.map((patient) => {
                    return (
                        <Table.Row>
                            <Table.Cell>{patient.id}</Table.Cell>
                            <Table.Cell>{patient.name}</Table.Cell>
                            <Table.Cell>{patient.birthDate}</Table.Cell>
                            <Table.Cell>
                                {getGenders()[patient.gender].text}
                            </Table.Cell>
                            <Table.Cell>{patient.address}</Table.Cell>
                            <Table.Cell>
                                {" "}
                                <Icon
                                    onClick={() => {
                                        setEditPatient(patient);
                                    }}
                                    name="edit"
                                />{" "}
                                <Icon
                                    onClick={() => {
                                        setDeletePatient(patient);
                                    }}
                                    name="trash"
                                />
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table>
            <Modal open={editPatient.id != undefined}>
                <Modal.Content>
                    <EditPatient
                        showMedication
                        patient={editPatient}
                        setPatient={handleSetEditPatient}
                    />
                    <Divider />
                    <Button onClick={handleUpdatePatient}>
                        Update patient
                    </Button>
                    <Button onClick={() => setEditPatient({})}>Cancel</Button>
                </Modal.Content>
            </Modal>
            <Confirm
                open={deletePatient.id != undefined}
                onCancel={() => {
                    setDeletePatient({});
                }}
                onConfirm={handleDeletePatient}
            />
        </Container>
    );
};
export default PatientDashboard;
