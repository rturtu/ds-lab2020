import React, { useState, useEffect } from "react";
import PatientDashboard from "../../components/doctor/patient";
import { Menu } from "semantic-ui-react";
import api from "../../api/requests";
import io from "socket.io-client";
import { toast } from "react-toastify";

const DoctorDashboard = (props) => {
    const [currentTab, setCurrentTab] = useState("patients");
    const tabs = [
        {
            key: "patients",
            name: "Patients",
        },
    ];

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL || "http://localhost:9000/";
        const socket = io(url, {
            enabledTransports: ["ws", "wss"],
            transports: ["websocket"],
        });
        socket.on("alert", (data) => {
            toast(data);
        });
    }, []);

    return (
        <React.Fragment>
            <Menu
                items={tabs.map((tab) => {
                    if (tab.key === currentTab) {
                        return {
                            ...tab,
                            active: true,
                        };
                    } else {
                        return tab;
                    }
                })}
                onItemClick={(evt, data) => {
                    setCurrentTab(
                        tabs.find((tab) => tab.name === data.name).key
                    );
                }}
            />
            {currentTab === "patients" && (
                <PatientDashboard
                    getPatients={api.caregiver.patient.getAll}
                    updatePatient={api.caregiver.patient.update}
                    addMedication={api.caregiver.patient.addMedication}
                    deleteMedication={api.caregiver.patient.deleteMedication}
                />
            )}
        </React.Fragment>
    );
};
export default DoctorDashboard;
