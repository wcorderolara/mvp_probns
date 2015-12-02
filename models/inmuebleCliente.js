module.exports = function (sequelize, DataTypes){

	var inmuebleCliente = sequelize.define("inmuebleCliente",{
		idCliente: {
			type: DataTypes.INTEGER,
			references: {
				model: 'cliente',
				key: 'id'
			}
		},
		idInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'inmueble',
				key: 'id'
			}
		},
		fechaVendida: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'inmueble_cliente'
	})

	return inmuebleCliente;
}