module.exports = function (sequelize, DataTypes){

	var imagenesInmueble = sequelize.define("imagenesInmueble", {
		idInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: "inmueble",
				key: 'id'
			}
		},
		path: {
			type: DataTypes.STRING,
			validate:{
				len: [1, 2000]
			},
			allowNull: false
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
	})

	return imagenesInmueble;
}