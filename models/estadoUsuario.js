module.exports = function (sequelize, DataTypes){
	var estadoUsuario = sequelize.define('estadoUsuario', {
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
				estadoUsuario.hasOne(models.Usuario)
			}
		},
		freezeTableName: true,
	});

	return estadoUsuario;
}
