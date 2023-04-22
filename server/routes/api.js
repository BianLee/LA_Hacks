const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.route("/getUser").get((req, res) => {
    User.find()
        .then((posts) => res.json(posts))
        .catch((err) => res.status(400).json("Error: " + err));
})
router.route("/postUser").post((req, res) => {
    const uid = req.body.uid;
    const email = req.body.email;
    const newUser = new User({
        uid, 
        email
    });
    newUser
        .save()
        .then(() => res.json("New user posted!"))
        .ctach(((err) => res.status(400).json("Error: " + err)));
});

module.exports = router;