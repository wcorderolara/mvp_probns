
module.exports = function (sequelize, DataTypes){
	var anuncianteInmueble = sequelize.define('anuncianteInmueble',{
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true
	});

	return anuncianteInmueble;
}
