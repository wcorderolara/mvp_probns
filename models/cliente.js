module.exports = function (sequelize, DataTypes){
	var Cliente = sequelize.define('Cliente', {
		idTipoCliente: {
			type: DataTypes.INTEGER,
			references: {
				model: 'tipo_cliente',
				key: 'id'
			}
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5,150]
			}
		},
		telefono: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8,15]
			}
		},
		celular: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [8,15]
			}	
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		idEstadoCliente: {
			type: DataTypes.INTEGER,
			references: {
				model: 'estado_cliente',
				key: 'id'
			}
		},
		ultimaAccion: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		idVendedorAsignado: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true
	})

	return Cliente;
}