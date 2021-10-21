module.exports = model;

function model (sequelize, DataTypes) {
    const alias = 'Cart';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0.00 
        }
    };
    const config = {
        tableName: 'carts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Cart = sequelize.define(alias,cols,config);

    Cart.associate = models => {
        Cart.hasOne(models.User, {
            as: "user",
            foreignKey: "cart_id"
        });

        Cart.hasMany(models.Product, {
            as: "products",
            foreignKey: "cart_id"
        });
    };

    return Cart;
}