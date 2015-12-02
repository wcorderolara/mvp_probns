module.exports = function (sequelize, DataTypes){

	var Mensaje = sequelize.define("Mensaje", {
		idTipoMensaje: {
			type: DataTypes.INTEGER,
			references: {
				model: 'tipo_mensaje',
				key: 'id'
			}
		},
		idAccionMensaje: {
			type: DataTypes.INTEGER,
			references: {
				model: 'accion_mensaje',
				key: 'id'
			}
		},
		idRemitente: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		idDestinatario: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		mensaje: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [20, 1200]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		tableName: 'mensaje'
	})

	return Mensaje;
}