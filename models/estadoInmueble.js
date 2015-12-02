module.exports = function (sequelize, DataTypes){

	var estadoInmueble = sequelize.define("estadoInmueble",{
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
		tableName: 'estado_inmueble'
	})

	return estadoInmueble;

}