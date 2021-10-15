module.exports = model;

function model (sequelize, DataTypes) {
    const alias = 'Brand';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull:  false
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const config = {
        tableName: 'brands',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Brand = sequelize.define(alias,cols,config);

    Brand.associate = models => {
        Brand.hasMany(models.Product, {
            as: "products",
            foreignKey: "brand_id"
        });
    };

    return Brand;
}