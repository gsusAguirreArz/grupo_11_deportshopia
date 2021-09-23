module.exports = model;

function model (sequelize, DataTypes) {
    const alias = 'Role';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user' 
        }
    };
    const config = {
        tableName: 'roles',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Role = sequelize.define(alias,cols,config);

    Role.associate = models => {
        Role.hasMany(models.User, {
            as: "users",
            foreignKey: "role_id"
        })
    };

    return Role;
}