module.exports = function (sequelize, DataTypes){
	var Vendedor = sequelize.define("Vendedor",{
		idCliente:{
			type: DataTypes.INTEGER,
			references:{
				model: 'tipo_usuario',
				key: 'id',
			}
		},
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
				Vendedor.belongsTo(models.Cliente,{
					foreignKey: {
						allowNull: false
					},
					as: 'cliente'
				});
				Vendedor.belongsToMany(models.tipoAccion, {through: models.accionesBuscador, foreignKey: 'vendedorId'})
			}
		},
		freezeTableName: true,
		tableName: 'vendedor'
	});
	return Vendedor;
};