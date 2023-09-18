const { Schema, model, Types } = require("mongoose");

const ThoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: "Thought is required",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
  }, {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

  const Thought = model("Thought", ThoughtSchema);
  module.exports = Thought;