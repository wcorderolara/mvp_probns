
module.exports = function (sequelize, DataTypes){

	var imagenInmueble = sequelize.define("imagenInmueble", {
		cdnId:{
			type: DataTypes.STRING,
			allowNull: true
		},
		path: {
			type: DataTypes.STRING,
			validate:{
				len: [1, 2000]
			},
			allowNull: false
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			associate: function(models){
					imagenInmueble.belongsTo(models.Inmueble);
			}
		},
		freezeTableName: true,
	})

	return imagenInmueble;
}
