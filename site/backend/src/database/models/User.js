module.exports = model;

function model (sequelize, DataTypes) {
    const alias = 'User';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cart_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        role_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
    };
    const config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const User = sequelize.define(alias,cols,config);

    User.associate = models => {
        User.belongsTo(models.Role, {
            as: "role",
            foreignKey: "role_id"
        });

        User.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "cart_id"
        });
    };

    return User;
}