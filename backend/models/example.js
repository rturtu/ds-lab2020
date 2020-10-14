module.exports = (sequelize, DataTypes) => {
    var Example = sequelize.define('examples', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    /*
     *  Example.associate = (models) => {
     *      models.examples.hasMany(models.otherTables);
     *      models.examples.belongsTo(models.otherTables);
     *  }
    */

    return Example;
}
