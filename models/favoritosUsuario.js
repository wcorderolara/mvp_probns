module.exports = function (sequelize, DataTypes){

	var favoritosUsuario = sequelize.define("favoritosUsuario", {
		idUsuario: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		idInmueble: {
			type: DataTypes.INTEGER,
			references: {
				model: 'inmueble',
				key: 'id'
			}
		},
		comentario: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [20, 280]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'favoritos_usuario'
	})

	return favoritosUsuario;
}