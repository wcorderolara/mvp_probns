module.exports = function (sequelize, DataTypes){

	var redSocial = sequelize.define("redSocial", {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 25]
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'red_social'
	})

	return redSocial;
}