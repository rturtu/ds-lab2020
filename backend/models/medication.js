module.exports = (sequelize, DataTypes) => {
    var Medication = sequelize.define("medications", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dosage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sideEffects: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Medication.associate = (models) => {
        models.medications.belongsTo(models.patients);
    };

    return Medication;
};
