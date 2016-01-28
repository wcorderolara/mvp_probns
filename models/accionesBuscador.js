
module.exports = function (sequelize, DataTypes){
	var accionesBuscador = sequelize.define('accionesBuscador',{
		descripcion: {
			type: DataTypes.STRING,
			validate: {
				len: [1, 500]
			},
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			associate: function(models){
				accionesBuscador.hasMany(models.tipoAccion);
				accionesBuscador.hasMany(models.Buscador);
			}
		}
		freezeTableName: true
	});

	return accionesBuscador;
}
