module.exports = function (sequelize, DataTypes){
	var Pais = sequelize.define("Pais",{
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [5,100]
			}
		},
		flag: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Pais.hasOne(models.Cliente);
				Pais.hasMany(models.Departamento);
			}
		}
	});

	return Pais;
}
