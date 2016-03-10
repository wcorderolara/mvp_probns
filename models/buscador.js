module.exports = function (sequelize, DataTypes){
	var Buscador = sequelize.define('Buscador', {
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1,150]
			}
		},
		apellido: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1,150]
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
			defaultValue: null,
			validate: {
				len: [8,15]
			}
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ultimaAccion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		presupuestoMin: {
			type: DataTypes.DECIMAL(18,2),
			defaultValue: null,
			allowNull: true
		},
		presupuestoMax: {
			type: DataTypes.DECIMAL(18,2),
			defaultValue: null,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Buscador.belongsTo(models.tipoBuscador, {foreignKey: { allowNull: false }});
				Buscador.belongsTo(models.Usuario, {as: 'vendedorAsignado', foreignKey:{ name: 'vendedorAsignadoId', field:'vendedorAsignadoId', allowNull: true}});
				Buscador.belongsTo(models.estadoBuscador, {foreignKey: {allowNull: false}});
				Buscador.belongsTo(models.Usuario, {as: 'agenciaAsociada', foreignKey:{name:'agenciaAsociadaId', field: 'agenciaAsociadaId', allowNull: false}});
				//Buscador.belongsTo(models.Vendedor, {foreignKey: {allowNull: false}});
				Buscador.belongsToMany(models.Inmueble, {through: models.inmuebleBuscador, foreignKey: 'buscadorId'});
				Buscador.belongsToMany(models.tipoAccion, {through: models.accionesBuscador, foreignKey: 'buscadorid'});
				Buscador.hasMany(models.Agenda);
			}
		},
		freezeTableName: true,
		tableName: 'buscador'
	})

	return Buscador;
}
