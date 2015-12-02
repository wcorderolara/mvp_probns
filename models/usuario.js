module.exports = function (sequelize, DataTypes){
	var Usuario = sequelize.define("Usuario",{
		idTipoUsuario:{
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
		website: {
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				isUrl: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 150]
			}
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		telefono: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 15]
			}
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len: [5,1000]
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