const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notContains: [' ']
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100]
    }
  },
  role: {
    type: DataTypes.ENUM("aluno", "professor"),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo', 'pendente'),
    defaultValue: 'pendente'
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      await hashPassword(user);
    },
    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        await hashPassword(user);
      }
    }
  },
  timestamps: true,
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    }
  }
});

// Helper para hash de senha
async function hashPassword(user) {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
}

// Método para comparar senhas
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método seguro para serialização
User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;