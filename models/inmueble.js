module.exports = function (sequelize, DataTypes){

	var Inmueble = sequelize.define("Inmueble",{
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
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
		classMethods:{
			associate: function(models){
				Inmueble.belongsToMany(models.Buscador, {through: models.inmueblesBuscador, foreignKey: 'inmuebleId'});
				Inmueble.belongsToMany(models.Cliente, {through: models.inmuebleCliente, foreignKey: 'inmuebleId'});
				Inmueble.belongsToMany(models.Vendedor, {through: models.inmuebleVendedor, foreignKey: 'inmuebleId'});
				Inmueble.belongsToMany(models.Anunciantes, {through: models.anuncianteInmueble, foreignKey: 'inmuebleId'});
				Inmueble.belongsTo(models.tipoInmueble, {foreignKey: {allowNull: false} } );
				Inmueble.belongsTo(models.estadoInmueble, {foreignKey: {allowNull: false } } );
				Inmueble.belongsTo(models.operacionInmueble, {foreignKey: {allowNull: false } } );
				Inmueble.belongsTo(models.Pais, {foreignKey: {allowNull: false } } );
				Inmueble.belongsTo(models.Departamento, {foreignKey: {allowNull: false } } );
				Inmueble.belongsTo(models.Municipio, {foreignKey: {allowNull: false } } );
				Inmueble.hasMany(models.imagenInmueble);
				Inmueble.hasMany(models.amenityInmueble);
				Inmueble.hasMany(models.Agenda);
			}
		},
		freezeTableName: true,
		tableName: 'inmueble'
	})

	return Inmueble;
}
