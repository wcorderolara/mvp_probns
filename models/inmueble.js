module.exports = function (sequelize, DataTypes){

	var Inmueble = sequelize.define("Inmueble",{
		idTipoInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'tipo_inmueble',
				key: 'id'
			}
		},
		idEstadoInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'estado_inmueble',
				key: 'id'
			}
		},
		idOperacionInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'operacion_inmueble',
				key: 'id'
			}
		},
		idMoneda: {
			type: DataTypes.INTEGER,
			references: {
				model: 'moneda',
				key: 'id'
			}
		},
		idPais: {
			type: DataTypes.INTEGER,
			references: {
				model: 'pais',
				key: 'id'
			}
		},
		idDepartamento: {
			type: DataTypes.INTEGER,
			references: {
				model: 'departamento',
				key: 'id'
			}
		},
		idMunicipio: {
			type: DataTypes.INTEGER,
			references: {
				model: 'municipio',
				key: 'id'
			}
		},
		precioPropiedad: {
			type: DataTypes.DECIMAL(15,2),
			allowNull: false,
			validate: {
				isDecimal: true
			}
		},
		direccionCorta: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5,250]
			}
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 500]
			}
		},
		latitud: {
			type: DataTypes.STRING,
			allowNull: true
		},
		longitud: {
			type: DataTypes.STRING,
			allowNull: true
		},
		extensionPropiedad: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		areaConstruccion: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		anoConstruccion: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		observaciones: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	}, {
		freezeTableName: true,
		tableName: 'inmueble'
	})

	return Inmueble;
}