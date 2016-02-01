module.exports = function (sequelize, DataTypes){
	var tipoUsuario = sequelize.define('tipoUsuario', {
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
				tipoUsuario.hasOne(models.Usuario);
			}
		},
		freezeTableName: true
	});

	return tipoUsuario;
}
