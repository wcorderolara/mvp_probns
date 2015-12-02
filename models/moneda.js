module.exports = function (sequelize, DataTypes){

	var Moneda = sequelize.define("Moneda", {
		idPais: {
			type: DataTypes.INTEGER,
			references:{
				model: 'pais',
				key: 'id'
			}
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [5,100]
			}
		},
		simbolo: {
			type: DataTypes.STRING,
			allowNull: false,
			validatte: {
				len: [1,5]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		tableName: 'moneda'
	})

	return Moneda;
}