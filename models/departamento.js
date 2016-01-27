module.exports = function (sequelize, DataTypes){

	var Departamento = sequelize.define("Departamento", {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 100]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Departamento.belongsTo(models.Pais, {foreignKey: {allowNull: false}});
				Departamento.hasOne(models.Inmueble);
				Departamento.hasMany(models.Municipio);
			}
		},
		freezeTableName: true
	});

	return Departamento;
}
