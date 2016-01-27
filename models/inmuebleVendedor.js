module.exports = function (sequelize, DataTypes){

	var inmuebleVendedor = sequelize.define("inmuebleVendedor",{
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	},{
		freezeTableName: true,
	})

	return inmuebleVendedor;
}
