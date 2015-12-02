module.exports = function (sequelize, DataTypes){

	var operacionInmueble = sequelize.define("operacionInmueble",{
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
		freezeTableName: true,
		underscored: true,
		tableName: 'operacion_inmueble'
	})

	return operacionInmueble;
}