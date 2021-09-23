module.exports = model;

function model (sequelize, DataTypes) {
    const alias = 'Category';
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
        }
    };
    const config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Category = sequelize.define(alias,cols,config);

    Category.associate = models => {
        Category.belongsToMany(models.Product, {
            as: "products",
            through: "products_categories",
            foreignKey: "product_id",
            otherKey: "categorie_id",
            timestamps:false
        });
    };

    return Category;
}