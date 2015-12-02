module.exports = function (sequelize, DataTypes){

	var tipoInmueble = sequelize.define("tipoInmueble",{
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
		tableName: 'tipo_inmueble'
	})

	return tipoInmueble;
}