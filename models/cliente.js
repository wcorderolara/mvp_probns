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
		website: {
			type: DataTypes.STRING,
			allowNull: true
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fechaCreacion: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Cliente.belongsTo(models.tipoCliente, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})	;
			}
		}
	},{
		freezeTableName: true,
		tableName: 'cliente'
	})

	return Cliente;
}