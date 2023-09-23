const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .populate({ path: "reactions", select: '-__v'});

            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    
    async getThoughtById({ params }, res) {
        try {
          const dbThoughtData = await Thought.findOne({ _id: params.id })
            .populate({
              path: "reactions",
              select: "-__v",
            })
            .select("-__v");
      
          if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought with this id" });
          }
      
          res.json(dbThoughtData);
        } catch (err) {
          console.error(err);
          res.sendStatus(400);
        }
      },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            res.json({ message: "Thought successfully created!" });
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: "No thought found" });
            }

            res.json(updatedThought);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!deletedThought) {
                return res.status(404).json({ message: "No thought found with this Id" }); 
            }

            const deletedThoughtId = deletedThought._id;
            const updatedUser = await User.findOneAndUpdate(
                { thoughts: deletedThoughtId },
                { $pull: { thoughts: deletedThoughtId }},
                { new: true }
            );

            if (!updatedUser) {
                console.error({ message: 'User not found!' });
                res.status(500).json({ message: 'User not found!' });
            }
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true }
            );

            if(!updatedThought) {
                return res.status(404).json({ message: "No Thought found with this Id "});
            }

            res.json(updatedThought);
        } catch(err) {
            console.error({ message: err });
        }
    },

    async removeReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if(!updatedThought) {
                return res.status(404).json({ message: "No thought found with this Id "});
            }
            res.json(updatedThought);
        } catch (err) {
        console.error({ message: err });
        }
    },
};
