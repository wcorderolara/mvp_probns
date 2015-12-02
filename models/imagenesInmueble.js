module.exports = function (sequelize, DataTypes){

	var imagenesInmueble = sequelize.define("imagenesInmueble", {
		idInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: "inmueble",
				key: 'id'
			}
		},
		imagen: {
			type: DataTypes.STRING,
			validate:{
				len: [1, 2000]
			},
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'imagenes_inmueble'
	})

	return imagenesInmueble;
}