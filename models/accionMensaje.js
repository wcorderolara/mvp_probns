module.exports = function (sequelize, DataTypes){
	var accionMensaje = sequelize.define("accionMensaje", {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 25]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'accion_mensaje'
	})

	return accionMensaje;
}