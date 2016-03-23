module.exports = function (sequelize, DataTypes){

	var inmuebleUsuario = sequelize.define("inmuebleUsuario",{
		vendedorAsignado: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	},{
		freezeTableName: true
	})

	return inmuebleUsuario;
}
