module.exports = function (sequelize, DataTypes){
	var Anunciantes = sequelize.define('Anunciantes', {
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
		classMethods:{
			associate: function(models){
				Anunciantes.belongsToMany(models.Inmueble, {through: models.anuncianteInmueble, foreignKey: 'anuncianteId'});
			}
		},
		freezeTableName: true
	});

	return Anunciantes;
}
