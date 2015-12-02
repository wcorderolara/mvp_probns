module.exports = function (sequelize, DataTypes){

	var trackingInmueble = sequelize.define("trackingInmueble", {
		idInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'inmueble',
				key: 'id'
			}
		},
		idUsuario: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'tracking_inmueble'
	})

	return trackingInmueble;
}