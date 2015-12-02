module.exports = function (sequelize, DataTypes){

	var shareInmueble = sequelize.define("shareInmueble", {
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
		idRedSocial: {
			type: DataTypes.INTEGER,
			references: {
				model: 'red_social',
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
		tableName: 'share_inmueble'
	})

	return shareInmueble;
}