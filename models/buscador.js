module.exports = function (sequelize, DataTypes){
	var Buscador = sequelize.define('Buscador', {
		idTipoCliente: {
			type: DataTypes.INTEGER,
			references: {
				model: 'tipoBuscador',
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
		apellido: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5,150]
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},		
		telefono1: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8,15]
			}
		},
		telefono2: {
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
		fechaCreacion: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		ultimaAccion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		idVendedorAsignado,
		idEstadoBuscador,
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Buscador.belongsTo(models.tipoBuscador, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})	;
			}
		}
	},{
		freezeTableName: true,
		tableName: 'buscador'
	})

	return Buscador;
}