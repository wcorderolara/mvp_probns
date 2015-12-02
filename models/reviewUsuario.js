module.exports = function (sequelize, DataTypes){
	var reviewUsuario = sequelize.define('reviewUsuario',{
		idUsuario: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		idUsuarioReview: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usuario',
				key: 'id'
			}
		},
		review: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [50, 1250]
			}
		},
		ranking: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
		},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'review_usuario'
	});

	return reviewUsuario
}