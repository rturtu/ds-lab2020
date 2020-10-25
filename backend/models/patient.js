var bcrypt = require("bcrypt");
var randomstring = require("randomstring");

module.exports = (sequelize, DataTypes) => {
    var Patient = sequelize.define(
        "patients",
        {
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
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            hooks: {
                beforeCreate: (patient) => {
                    const salt = bcrypt.genSaltSync();
                    patient.password = bcrypt.hashSync(patient.password, salt);
                    patient.token = randomstring.generate(60);
                    if (!patient.username)
                        patient.username = randomstring.generate(60);
                    if (!patient.password)
                        patient.password = randomstring.generate(60);
                },
            },
        }
    );

    Patient.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Patient.prototype.updatePassword = function (currentPass, newPass) {
        if (bcrypt.compareSync(currentPass, this.password)) {
            const salt = bcrypt.genSaltSync();
            this.password = bcrypt.hashSync(newPass, salt);
            this.save();
            return true;
        }
        return false;
    };

    Patient.prototype.generateToken = function () {
        this.token = randomstring.generate(60);
        this.save();
        return this.token;
    };

    Patient.associate = (models) => {
        models.patients.hasMany(models.medications);
        models.patients.belongsToMany(models.caregivers, {
            through: "patientCaregivers",
            onDelete: "cascade",
        });
    };

    return Patient;
};
