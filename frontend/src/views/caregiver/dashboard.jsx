import React, { useState } from "react";
import PatientDashboard from "../../components/doctor/patient";
import { Menu } from "semantic-ui-react";
import api from "../../api/requests";

const DoctorDashboard = (props) => {
    const [currentTab, setCurrentTab] = useState("patients");
    const tabs = [
        {
            key: "patients",
            name: "Patients",
        },
    ];
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
