module.exports = function (sequelize, DataTypes){

	var Amenity = sequelize.define("Amenity", {
		idDivisionAmenity: {
			type: DataTypes.INTEGER,
			references: {
				model: 'division_amenity',
				key: 'id'
			}
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5,150]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		tableName: 'amenity'
	})

	return Amenity;
}