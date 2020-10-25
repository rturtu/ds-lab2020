var bcrypt = require("bcrypt");
var randomstring = require("randomstring");

module.exports = (sequelize, DataTypes) => {
    var Doctor = sequelize.define(
        "doctors",
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
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
                beforeCreate: (doctor) => {
                    const salt = bcrypt.genSaltSync();
                    doctor.password = bcrypt.hashSync(doctor.password, salt);
                    doctor.token = randomstring.generate(60);
                    console.log(doctor.password);
                },
            },
        }
    );

    Doctor.associate = (models) => {};

    Doctor.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Doctor.prototype.updatePassword = function (currentPass, newPass) {
        if (bcrypt.compareSync(currentPass, this.password)) {
            const salt = bcrypt.genSaltSync();
            this.password = bcrypt.hashSync(newPass, salt);
            this.save();
            return true;
        }
        return false;
    };

    Doctor.prototype.generateToken = function () {
        this.token = randomstring.generate(60);
        this.save();
        return this.token;
    };

    return Doctor;
};
