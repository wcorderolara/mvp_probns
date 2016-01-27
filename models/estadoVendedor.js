module.exports = function (sequelize, DataTypes){
	var estadoVendedor = sequelize.define('estadoVendedor', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 150]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				estadoVendedor.hasOne(models.Vendedor)
			}
		},
		freezeTableName: true,
	});

	return estadoVendedor;
}
