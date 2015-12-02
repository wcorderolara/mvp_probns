module.exports = function (sequelize, DataTypes){

	var amenityInmueble = sequelize.define("amenityInmueble", {
		idInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'inmueble',
				key: 'id'
			}
		},
		idAmenity: {
			type: DataTypes.INTEGER,
			references: {
				model: 'amenity',
				key: 'id'
			}
		},
		cantidad: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				isInt: true
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'amenity_inmueble'
	})

	return amenityInmueble;
}