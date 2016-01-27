module.exports = function (sequelize, DataTypes){

	var estadoInmueble = sequelize.define("estadoInmueble",{
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
		classMethods: {
			associate: function(models){
					estadoInmueble.hasOne(models.Inmueble);
			}
		},
		freezeTableName: true
	})

	return estadoInmueble;

}
