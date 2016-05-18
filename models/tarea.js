module.exports = function (sequelize, DataTypes){
	var Tarea = sequelize.define('Tarea', {
		descripcion: {
			type: DataTypes.STRING(300),
			allowNull: false,
			validate: {
				len: [1,300]
			}
		},
		relacion: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: [1,50]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Tarea.belongsTo(models.estadoTarea, {foreignKey: { allowNull: false }});
				Tarea.belongsTo(models.Inmueble, {foreignKey: {allowNull: true}});
				Tarea.belongsTo(models.Buscador, {foreignKey: {allowNull: true}});
				Tarea.belongsTo(models.Usuario, {as: 'usuarioAsignado', foreignKey:{ name: 'usuarioAsignadoId', field:'usuarioAsignadoId', allowNull: true}});
				Tarea.belongsTo(models.Usuario, {as: 'usuarioAsigno', foreignKey:{name:'usuarioAsignoId', field: 'usuarioAsignoId', allowNull: true}});
			}
		},
		freezeTableName: true,
		tableName: 'tarea'
	})

	return Tarea;
}
