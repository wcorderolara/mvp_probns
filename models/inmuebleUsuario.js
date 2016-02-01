module.exports = function (sequelize, DataTypes){

	var inmuebleUsuario = sequelize.define("inmuebleUsuario",{
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	},{
		freezeTableName: true
	})

	return inmuebleUsuario;
}
