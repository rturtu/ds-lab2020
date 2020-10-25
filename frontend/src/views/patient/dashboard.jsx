import React, { useState, useEffect } from "react";
import api from "../../api/requests";
import { getGenders } from "../../utils";

const PatientDashboard = (props) => {
    const [patient, setPatient] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.patient
            .getInfo()
            .then((response) => {
                if (response.status !== 200) throw new Error();
                return response.json();
            })
            .then((res) => {
                setPatient(res);
                setIsLoading(false);
            })
            .catch(console.log);
    }, []);

    return (
        <React.Fragment>
            <h1>My medical report</h1>
            <h2>Information</h2>
            {!isLoading && (
                <p>
                    Name: {patient.name} <br />
                    Gender: {getGenders()[patient.gender].text} <br />
                    Address: {patient.address} <br />
                </p>
            )}
            <h2>My medication</h2>
            {!isLoading && (
                <ul>
                    {patient.medications.map((med) => (
                        <li>
                            {`${med.name} - [${med.dosage}] (${med.sideEffects})`}
                        </li>
                    ))}
                </ul>
            )}
        </React.Fragment>
    );
};

export default PatientDashboard;
