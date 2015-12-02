module.exports = function (sequelize, DataTypes){

	var Departamento = sequelize.define("Departamento", {
		idPais: {
			type: DataTypes.INTEGER,
			references:{
				model: 'Pais',
				key: 'id'
			}
		},
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
		freezeTableName: true
	});

	return Departamento;
}