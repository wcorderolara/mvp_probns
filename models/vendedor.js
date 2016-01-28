module.exports = function (sequelize, DataTypes){
	var Vendedor = sequelize.define("Vendedor",{
		nombre: {
			type: DataTypes.STRING,
			validate:{
				len: [3, 150]
			},
			allowNull: false
		},
		apellido:{
			type: DataTypes.STRING,
			validate: {
				len: [3,150]
			},
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 150]
			}
		},
		token:{
			type: DataTypes.STRING,
			allowNull: true
		},
		telefono: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 15]
			}
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true
		},
		verificadoEmail: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		fechaCreacion: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			assoociate: function(models){
				Vendedor.hasOne(models.Buscador);
				Vendedor.hasMany(models.Agenda);
				Vendedor.belongsTo(models.Cliente,{foreignKey: {allowNull: false},as: 'cliente'});
				Vendedor.belongsTo(models.estadoVendedor, {foreignKey: {allowNull: false}});
				Vendedor.belongsToMany(models.tipoAccion, {through: models.accionesVendedor, foreignKey: 'vendedorId'});
				Vendedor.belongsToMany(models.Inmueble, {through: models.inmuebleVendedor, foreignKey: 'vendedorId'});
			}
		},
		freezeTableName: true,
		tableName: 'vendedor'
	});
	return Vendedor;
};
