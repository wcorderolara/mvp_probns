module.exports = function (sequelize, DataTypes){
	var tipoAccion = sequelize.define('tipoAccion', {
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
				tipoAccion.belongsToMany(models.Vendedor, {through: models.accionesVendedor, foreignKey: 'tipoAccionId'});
			}
		},
		freezeTableName: true
	});

	return tipoAccion;
}
