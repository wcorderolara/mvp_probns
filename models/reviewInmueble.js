module.exports = function (sequelize, DataTypes){

	var reviewInmueble = sequelize.define("reviewInmueble",{
		idPadre: {
			type: DataTypes.INTEGER,
			references: {
				model: 'review_inmueble',
				key: 'id'
			}
		},
		idInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'inmueble',
				key: 'id'
			}
		},
		comentario: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [25, 1200]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	}, {
		freezeTableName: true,
		underscored: true,
		tableName: 'review_inmueble'
	})

	return reviewInmueble;
}