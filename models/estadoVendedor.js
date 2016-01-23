module.exports = function (sequelize, DataTypes){
	var estadoCliente = sequelize.define('estadoCliente', {
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
		freezeTableName: true,
		underscored: true,
		tableName: 'estado_cliente'
	});

	return estadoCliente;
}