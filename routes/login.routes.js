const router = require("express").Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios');

router.post('/', async (req, res) => {
    const { usuario, password } = req.body

    // validações
    if (!usuario) {
        return res.status(422).json({ msg: "O usuario é obrigatorio" })
    }

    if (!password) {
        return res.status(422).json({ msg: "O senha é obrigatorio" })
    }

    // Check user existe
    const user = await User.findOne({ usuario: usuario })
    if (!user) {
        return res.status(422).json({ msg: 'Usuario não encontrado' })
    }

    // Check se senha esta correta
    // const checkPassword = await bcrypt.compare(password, user.password)
    // if (!checkPassword) {
    //     return res.status(422).json({ msg: 'Senha invalida' })
    // }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: usuario._id,
        },
            secret,
        )
        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })
    } catch (err) {
        console.log(err, console.log('backend com falha'));
    }
})

module.exports = router;