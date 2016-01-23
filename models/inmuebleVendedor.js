module.exports = function (sequelize, DataTypes){

	var inmuebleUsuario = sequelize.define("inmuebleUsuario",{
		idUsuario: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
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
		tableName: 'inmueble_usuario'
	})

	return inmuebleUsuario;
}