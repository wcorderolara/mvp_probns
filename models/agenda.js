module.exports = function (sequelize, DataTypes){
	var Agenda = sequelize.define('Agenda', {
		idVendedor,
		idBuscador,
		idInmueble,
		idEstadoCita,
		fechaCita: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		tableName: 'agenda'
	})

	return Agenda;
}