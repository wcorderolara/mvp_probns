module.exports = function (sequelize, DataTypes){
	var Buscador = sequelize.define('Buscador', {
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
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Buscador.belongsTo(models.tipoBuscador, {
					foreignKey: {
						allowNull: false
					}
				});
				Buscador.belongsTo(models.Usuario, {
					foreignKey:{
						allowNull: false
					},
					as: 'vendedorAsignado'
				});
				Buscador.belongsTo(models.estadoBuscador, {
					foreignKey: {
						allowNull: false
					}
				});
				Buscador.belongsTo(models.Usuario, {foreignKey: {allowNull: false}});
				//Buscador.belongsTo(models.Vendedor, {foreignKey: {allowNull: false}});
				Buscador.belongsTo(models.Inmueble, {through: models.inmuebleBuscador, foreignKey: 'buscadorId'});
				//Buscador.belongsToMany(models.tipoAccion, {through: models.accionesBuscador, foreignKey: 'buscadorid'});
				Buscador.hasMany(models.Agenda);
			}
		},
		freezeTableName: true,
		tableName: 'buscador'
	})

	return Buscador;
}
