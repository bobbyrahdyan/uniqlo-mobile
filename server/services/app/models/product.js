'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, {
        foreignKey: "productId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      },
    },
    slug: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description is required" },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price is required" },
        notEmpty: { msg: "Price is required" },
      },
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Main image is required" },
        notEmpty: { msg: "Main image is required" },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Category is required" },
        notEmpty: { msg: "Category is required" },
      },
    },
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.beforeCreate((product) => {
    product.slug = product.name.toLowerCase().split(" ").join("-");
  });

  return Product;
};
