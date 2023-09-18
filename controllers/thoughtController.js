const { Thought, User } = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .populate({ path: "reactions", select: '-___v'});

            res.json(thoughts);
            } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    
    async getThoughtById(req,res) {
        try {
            const thought = await thought.findOne({_id: req.params.postId })
            .populate({ path: "reactions", select: '-___v'});

            if (!thought) {
                return res.status(400).json({ message: 'No post with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}