const { connect, connection } = require('mongoose');

connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  connect.set("debug", true);

  module.exports = connection;