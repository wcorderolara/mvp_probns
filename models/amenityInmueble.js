module.exports = function (sequelize, DataTypes){

	var amenityInmueble = sequelize.define("amenityInmueble", {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
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
		classMethods: {
			associate: function(models){
				amenityInmueble.belongsToMany(models.Inmueble);
			}
		},
		freezeTableName: true
	})

	return amenityInmueble;
}
