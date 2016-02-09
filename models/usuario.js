module.exports = function (sequelize, DataTypes){
	var Usuario = sequelize.define('Usuario', {
		userLogin: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [2,150]
			}
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5,150]
			}
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
			validate: {
				len: [5,150]
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 150]
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		token:{
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		},
		telefono1: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
			validate: {
				len: [8,15]
			}
		},
		telefono2: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
			validate: {
				len: [8,15]
			}
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		},
		website: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		},
		verificadoEmail: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Usuario.belongsTo(models.tipoUsuario, {foreignKey: {allowNull: false}});
				Usuario.belongsTo(models.Pais, {foreignKey: {allowNull: false }});
				Usuario.belongsTo(models.estadoUsuario, {foreignKey: {allowNull: true}});
				Usuario.belongsToMany(models.Inmueble, {through: models.inmuebleUsuario, foreignKey: 'usuarioId'});
				Usuario.belongsToMany(models.tipoAccion, {through: models.accionesBuscador, foreignKey: 'usuarioId'});
				Usuario.hasMany(models.Buscador);
				Usuario.hasMany(models.Agenda);
				Usuario.hasOne(models.Usuario, {as: 'Padre', foreignKey: {field: 'padreId', allowNull: true}});

			}
		},
		freezeTableName: true,
		tableName: 'usuario'
	})

	return Usuario;
}
