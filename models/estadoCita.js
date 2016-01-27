module.exports = function (sequelize, DataTypes){
	var estadoCita = sequelize.define('estadoCita', {
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
				estadoCita.hasMany(models.Agenda);
			}
		},
		freezeTableName: true
	});

	return estadoCita;
}
