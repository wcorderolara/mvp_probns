module.exports = function (sequelize, DataTypes){
	var tipoUsuario = sequelize.define("tipoUsuario",{
		descripcion: {type: DataTypes.STRING, allowNull: false},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		underscored: true,
		tableName: 'tipo_usuario'
	});

	return tipoUsuario; 
};