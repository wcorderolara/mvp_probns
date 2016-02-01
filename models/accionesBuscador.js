
module.exports = function (sequelize, DataTypes){
	var accionesBuscador = sequelize.define('accionesBuscador',{
		descripcion: {
			type: DataTypes.STRING,
			validate: {
				len: [1, 500]
			},
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true
	});

	return accionesBuscador;
}
