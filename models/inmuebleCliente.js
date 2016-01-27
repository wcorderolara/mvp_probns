module.exports = function (sequelize, DataTypes){

	var inmuebleCliente = sequelize.define("inmuebleCliente",{
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	},{
		freezeTableName: true
	})

	return inmuebleCliente;
}
