
module.exports = function (sequelize, DataTypes){
	var inmuebleBuscador = sequelize.define('inmuebleBuscador',{
		descripcion: {
			type: DataTypes.STRING,
			validate: {
				len: [1, 500]
			},
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
