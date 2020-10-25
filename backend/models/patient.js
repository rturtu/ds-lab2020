module.exports = (sequelize, DataTypes) => {
    var Patient = sequelize.define("patients", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        medicalRecord: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    Patient.associate = (models) => {
        models.patients.hasMany(models.medications);
        models.patients.belongsToMany(models.caregivers, {
            through: "patientCaregivers",
            onDelete: "cascade",
        });
    };

    return Patient;
};
