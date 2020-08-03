const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GETS ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); // .fifn() is a Mongoose method that returns everything
        res.json(posts);
    } catch (err) {
        res.jeson({ message: err });
    }
});

//SUBMITS A POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//GET ONE POST BY ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.send(post);
    } catch (err) {
        res.send({ message: err });
    }
});

//DELETE POST BY ID
router.delete('/:id', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.id });
        res.json(removedPost);
    } catch {
        res.send({ message: err });
    }
});

//UPDATE A SINGLE POST BY ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.send({ message: err });
    }
});

// USING PROMISES
// router.post('/', (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });

//     //It saves this to the DB. It returns a promise
//     post.save()
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => {
//         res.json({ message: err });
//     })
// });

module.exports = router;
