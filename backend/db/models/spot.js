'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId' }
      )

      Spot.hasMany(
        models.Booking, {
          foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true
        }
      )

      Spot.hasMany(
        models.Review,
        {
          foreignKey: "spotId", onDelete: "CASCADE", hooks: true
        }
      )

      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: "spotId", onDelete: "CASCADE", hooks: true
        }
      )
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL(9, 7),
    lng: DataTypes.DECIMAL(10, 7),
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
    scopes: {
      showAllInfo: {
        attributes: { exclude: [] }
      }
    }
  });
  return Spot;
};
