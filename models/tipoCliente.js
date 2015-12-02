module.exports = function (sequelize, DataTypes){
	var tipoCliente = sequelize.define('tipoCliente', {
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
		tableName: 'tipo_cliente'
	});

	return tipoCliente;
}