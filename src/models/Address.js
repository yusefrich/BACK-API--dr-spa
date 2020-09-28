const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(sequelize) {
        super.init({
            state: DataTypes.STRING,
            city: DataTypes.STRING,
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            neigh: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    }
}

module.exports = Address;