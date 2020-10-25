var randomstring = require("randomstring");
var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    var Caregiver = sequelize.define(
        "caregivers",
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
                beforeCreate: (caregiver) => {
                    const salt = bcrypt.genSaltSync();
                    caregiver.password = bcrypt.hashSync(
                        caregiver.password,
                        salt
                    );
                    caregiver.token = randomstring.generate(60);
                    if (!caregiver.username)
                        caregiver.username = randomstring.generate(60);
                    if (!caregiver.password)
                        caregiver.password = randomstring.generate(60);
                },
            },
        }
    );

    Caregiver.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Caregiver.prototype.updatePassword = function (currentPass, newPass) {
        if (bcrypt.compareSync(currentPass, this.password)) {
            const salt = bcrypt.genSaltSync();
            this.password = bcrypt.hashSync(newPass, salt);
            this.save();
            return true;
        }
        return false;
    };

    Caregiver.prototype.generateToken = function () {
        this.token = randomstring.generate(60);
        this.save();
        return this.token;
    };

    Caregiver.associate = (models) => {
        models.caregivers.belongsToMany(models.patients, {
            through: "patientCaregivers",
            onDelete: "cascade",
        });
    };

    return Caregiver;
};
