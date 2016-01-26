module.exports = function (sequelize, DataTypes){
	var estadoBuscador = sequelize.define('estadoBuscador', {
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
		classMethods: {
			associate: function(models){
				estadoBuscador.hasOne(models.Buscador);
			}
		},
		freezeTableName: true
	});

	return estadoBuscador;
}