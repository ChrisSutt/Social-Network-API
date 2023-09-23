const User = require("../models/User");
const Thought = require("../models/Thought")

module.exports = {

    async getAllUser(req, res) {
        try {
            const dbUserData = await User.find({})
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 });
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },

    async getUserById({ params }, res) {
        try {
            const dbUserData = await User.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__V");

            if (!dbUserData) {
                return res.status(404.).json({ message: "No user found with this ID"});
            }

            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },

    async createUser({ body }, res) {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            res.json(err);
        }
    },

    async updateUser({ params, body }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true}
            );

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this Id"});
            }

            res.json(dbUserData);
        } catch (err) {
            res.json(err);
        }
    },

    async deleteUser({ params }, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: params.id });

            if (!dbUserData) {
                return res.status(404),json({ message: "No user with this id"});
            }

            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            res.json({ message: "User and thoughts deleted"});
        } catch (err) {
          res.json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            );

            if(!dbUserData) {
                return res.status(404).json({ message: "No user foudn with this Id "});
            }

            res.json(dbUserData);
        } catch(err) {
            res.json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId  },
                { $pull: { friends: req.params.friendId } },
                {new: true }
            );

            if(!dbUserData) {
                return res.status(404).json({ message: "No user with this Id "});
            }

            res.json(dbUserData);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
};