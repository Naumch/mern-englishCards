const { Router } = require("express");
const Card = require("../models/Card");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.get('/', auth, async (req, res) => {
  try{
    const cards = await Card.find({ owner: req.user.userId });
    res.json(cards);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const {word, translation} = req.body;

    const card = new Card({
      word, translation, owner: req.user.userId
    });

    await card.save();

    res.status(201).json(card);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}) 

router.post('/edit/checked/', auth, async (req, res) => {
  try {
    const {checked} = req.body;

    await Card.updateMany(
      {owner: req.user.userId}, 
      {$set: {checked: !checked}} 
    );
    
    const cards = await Card.find({ owner: req.user.userId });
    res.json(cards);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

router.post('/edit/:id', auth, async (req, res) => {
  try {
    const {word, translation} = req.body;
    const id = req.params.id;
    await Card.updateOne(
      {_id: id}, 
      {$set: {word: word, translation: translation}} 
    );
    
    const card = await Card.findOne({_id: id});
    res.json(card);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

router.post('/edit/checked/:id', auth, async (req, res) => {
  try {
    const {checked} = req.body;
    const id = req.params.id;
    await Card.updateOne(
      {_id: id}, 
      {$set: {checked: !checked}} 
    );
    
    const card = await Card.findOne({_id: id});
    res.json(card);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const card = await Card.findOneAndDelete({_id: id});
    res.status(202).json(card);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

module.exports = router;