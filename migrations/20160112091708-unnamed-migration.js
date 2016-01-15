'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'usuario',
      'password',
      {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 2000]
        }
      }
    ),

    queryInterface.changeColumn(
      'cliente',
      'idEstadoCliente',
      {
        allowNull: true
      }
    ),

    queryInterface.changeColumn(
      'cliente',
      'idVendedorAsignado',
      {
        allowNull: true
      }
    )
    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
