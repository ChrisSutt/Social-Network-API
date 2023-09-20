const router = require('express').Router();
const{
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.route



module.exports = router;