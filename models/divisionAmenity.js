module.exports = function (sequelize, DataTypes){

	var divisionAmenity = sequelize.define("divisionAmenity", {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 150]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'division_amenity'
	})

	return divisionAmenity;
}