module.exports = function (sequelize, DataTypes){

	var Municipio = sequelize.define("Municipio",{
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5,100]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Municipio.belongsTo(models.Departamento, {foreignKey: {allowNull: false}});
				Municipio.hasOne(models.Inmueble);
			}
		},
		freezeTableName: true
	})

	return Municipio;
}
