const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Destination = require("../models/Destination");
let yelpAPI = require('yelp-api');
const ObjectId = require('mongodb').ObjectId

module.exports = {
  getProfile: async (req, res) => {
    try {
      const destinations = await Destination.find({ user: req.user.id });
      res.render("profile.ejs", { destinations: destinations, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const _id = ObjectId(req.params.id)
      const destinations = await Destination.find({ _id: _id });
      console.log(destinations)
      let apiKey = 'QWNLNhdm7g61ZR5gab0Ef5zBFzUWF_nCXCG3LdRRjc34GTBnjFrLEz-7T0Hif8Byjot-nrwdS9QVYRlzvusMavClPaWpMCk1DT1RUhm_FkZwB3406ZEmh5dpApZOZHYx';
      let yelp = new yelpAPI(apiKey);

      // Set any parameters, if applicable (see API documentation for allowed params)
      let params = [{ location: destinations[0].location }];
      console.log(params)

      // Call the endpoint
      yelp.query('businesses/search', params)
      .then(data => {
        console.log(data)
        res.render("post.ejs", {
          user : req.user,
          destination: destinations[0],
          restaurants: JSON.parse(data).businesses,
      } );
      
      // Success
      })
      .catch(err => {
      // Failure
      console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  },
  addDestination: async (req, res) => {
    try {
      await Destination.create({
        location: req.body.location,
        date: req.body.date,
        user: req.user.id,
        tripID: req.params.id,
      });
      console.log("Trip has been added!");


      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // deleteDestination: async (req, res) => {
  //   try {
  //     const posts = await Post.find({ user: req.user.id });
  //     res.render("profile.ejs", { posts: posts, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        madeBy: req.user.id,
        postID: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`); 
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
