module.exports = function (sequelize, DataTypes){
	var tipoBuscador = sequelize.define("tipoBuscador",{
		descripcion: {
			type: DataTypes.STRING, 
			allowNull: false
		},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
	});

	return tipoBuscador; 
};