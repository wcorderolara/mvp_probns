
module.exports = function (sequelize, DataTypes){
	var inmuebleBuscador = sequelize.define('inmuebleBuscador',{
		vendedorAsignado: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true
	});

	return inmuebleBuscador;
}
