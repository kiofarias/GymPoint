module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('students', 'user_id');
  },
};
