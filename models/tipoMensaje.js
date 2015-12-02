module.exports = function (sequelize, DataTypes){

	var tipoMensaje = sequelize.define("tipoMensaje", {
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
		tableName: 'tipo_mensaje'
	})

	return tipoMensaje;
}