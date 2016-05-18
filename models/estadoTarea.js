module.exports = function (sequelize, DataTypes){
	var estadoTarea = sequelize.define('estadoTarea', {
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
				estadoTarea.hasOne(models.Tarea)
			}
		},
		freezeTableName: true,
	});

	return estadoTarea;
}
