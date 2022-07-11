const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = Router();

router.post(
  '/registration', 
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({min: 6})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Некорректные данные при регистрации"});
    }

    const {email, password} = req.body;

    const candidate = await User.findOne({email});
    if (candidate) {
      return res.status(400).json({message: "Пользователь уже существует"});
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({email, password: hashedPassword});
    await user.save();

    res.status(201).json({message: "Пользователь создан"});
  } catch (error) {
      res.status(500).json({message: "Ошибка сервера, попробуйте еще раз"});
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({message: "Пользователь не найден"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "Неверный пароль"});
    }

    const token = jwt.sign(
      {userId: user.id},
      config.get("jwtSecret"),
      {expiresIn: "1h"}
    );

    res.json({token, userId: user.id});
  } catch (error) {
      res.status(500).json({message: "Ошибка сервера, попробуйте еще раз"});
  }
});

module.exports = router;