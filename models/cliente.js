module.exports = function (sequelize, DataTypes){
	var Cliente = sequelize.define('Cliente', {
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
				Cliente.belongsTo(models.tipoCliente, {foreignKey: {allowNull: false}});
				Cliente.belongsTo(models.Pais, {foreignKey: {allowNull: false }});
				Cliente.belongsToMany(models.Inmueble, {through: models.inmuebleCliente, foreignKey: 'clienteId'});
				Cliente.hasMany(models.Vendedor);
				Cliente.hasMany(models.Buscador);
			}
		},
		freezeTableName: true,
		tableName: 'cliente'
	})

	return Cliente;
}
