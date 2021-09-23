module.exports = model;

function model (sequelize, DataTypes) {
    const alias = 'Product';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'no description'
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            defaultValue: null 
        },
        cart_id: {
            type: DataTypes.INTEGER,
            defaultValue: null 
        }
    };
    const config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Product = sequelize.define(alias,cols,config);

    Product.associate = models => {
        Product.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "cart_id"
        });

        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brand_id"
        });

        Product.belongsToMany(models.Category, {
            as: "categories",
            through: "products_categories",
            foreignKey: "categorie_id",
            otherKey: "product_id",
            timestamps:false
        });
    };

    return Product;
}