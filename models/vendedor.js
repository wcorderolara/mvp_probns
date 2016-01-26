module.exports = function (sequelize, DataTypes){
	var Usuario = sequelize.define("Usuario",{
		idCliente:{
			type: DataTypes.INTEGER,
			references:{
				model: 'tipo_usuario',
				key: 'id',
			}
		},
		nombre: {
			type: DataTypes.STRING,
			validate:{
				len: [3, 150]
			},
			allowNull: false
		},
		apellido:{
			type: DataTypes.STRING,
			validate: {
				len: [3,150]
			},
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 150]
			}
		},
		telefono: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 15]
			}
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fechaCreacion: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		tableName: 'usuario'
	});
	return Usuario;
};