const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//  export vidly_jwtPrivateKey=mySecureKey



router.get('/', async (req, res, next) => {
  const genres = await Genre.find().sort({name: 1}); 
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid Id')

  const genre = await Genre.find({_id: req.params.id });

  if (!genre) return res.status(404).send("The genre with the given ID doesn't exist");

  res.send(genre);
});

router.post('/', auth, async (req, res) => {

  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOneAndUpdate(req.params.id , { name: req.body.name }, { new: true });
  if (!genre) return res.status(404).send("The genre with the given ID doesn't exist");
 

  res.send(genre)
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findOneAndDelete(req.params.id);
  if (!genre) return res.status(404).send("The genre with the given ID doesn't exist");
  
  res.send(genre);
});


module.exports = router;

