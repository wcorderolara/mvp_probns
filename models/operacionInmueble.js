module.exports = function (sequelize, DataTypes){

	var operacionInmueble = sequelize.define("operacionInmueble",{
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5,100]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			associate: function(models){
				operacionInmueble.hasOne(models.Inmueble);
			}
		},
		freezeTableName: true
	})

	return operacionInmueble;
}
