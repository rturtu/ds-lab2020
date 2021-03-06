import React, { useState } from "react";
import PatientDashboard from "../../components/doctor/patient";
import CaregiverDashboard from "../../components/doctor/caregiver";
import { Menu } from "semantic-ui-react";
import api from "../../api/requests";

const DoctorDashboard = (props) => {
    const [currentTab, setCurrentTab] = useState("patients");
    const tabs = [
        {
            key: "patients",
            name: "Patients",
        },
        {
            key: "caregivers",
            name: "Caregivers",
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
                    getPatients={api.doctor.patient.getAll}
                    updatePatient={api.doctor.patient.update}
                    addMedication={api.doctor.patient.addMedication}
                    deleteMedication={api.doctor.patient.deleteMedication}
                    showAddNewPatient
                />
            )}
            {currentTab === "caregivers" && <CaregiverDashboard />}
        </React.Fragment>
    );
};
export default DoctorDashboard;
