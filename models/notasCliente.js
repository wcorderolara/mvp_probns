module.exports = function (sequelize, DataTypes){
	var notasCliente = sequelize.define('notasCliente',{
		idCliente: {
			type: DataTypes.INTEGER,
			references: {
				model: 'cliente',
				key: 'id'
			}
		},
		idUsuario: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		nota: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [10, 250]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscoerd: true,
		tableName: 'notas_cliente'
	});

	return notasCliente;
}