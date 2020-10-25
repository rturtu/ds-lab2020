module.exports = (sequelize, DataTypes) => {
    var Caregiver = sequelize.define("caregivers", {
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

    Caregiver.associate = (models) => {
        models.caregivers.belongsToMany(models.patients, {
            through: "patientCaregivers",
            onDelete: "cascade",
        });
    };

    return Caregiver;
};
