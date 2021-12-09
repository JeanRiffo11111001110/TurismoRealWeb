module.exports = {
    turismoPool: {
      user: process.env.TURISMO_USER,
      password: process.env.TURISMO_PASSWORD,
      connectString: process.env.TURISMO_CONNECTIONSTRING,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
};