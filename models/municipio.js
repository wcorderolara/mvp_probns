module.exports = function (sequelize, DataTypes){

	var Municipio = sequelize.define("Municipio",{
		idDepartamento: {
			type: DataTypes.INTEGER,
			references:{
				model: 'departamento',
				key: 'id'
			}
		},
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
		freezeTableName: true
	})

	return Municipio;
}