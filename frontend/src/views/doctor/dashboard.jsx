import React, { useState } from "react";
import PatientDashboard from "../../components/doctor/patient";
import CaregiverDashboard from "../../components/doctor/caregiver";
import { Menu } from "semantic-ui-react";

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
            {currentTab === "patients" && <PatientDashboard />}
            {currentTab === "caregivers" && <CaregiverDashboard />}
        </React.Fragment>
    );
};
export default DoctorDashboard;
