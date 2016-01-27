module.exports = function (sequelize, DataTypes){

	var tipoInmueble = sequelize.define("tipoInmueble",{
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
				tipoInmueble.hasOne(models.Inmueble);
			}
		},
		freezeTableName: true
	})

	return tipoInmueble;
}
