// Auth

const User = require('../models/usuarios')

const router = require("express").Router();

const bcrypt = require('bcrypt')


router.post('/', async (req, res) => {

    const { usuario, password } = req.body

    // validações
    if (!usuario) {
        return res.status(422).json({ msg: "O usuario é obrigatorio" })
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatorio" })
    }

    // Chehck user 
    const userExists = await User.findOne({ usuario: usuario })
    if (userExists) {
        return res.status(422).json({ msg: 'Por favor utilize outro usuario' })
    }

    // create senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create User
    const user = new User({
        usuario,
        password: passwordHash
    })

    try {
        await user.save()

        res.status(201).json({ msg: 'Usuario criado com sucesso' })

    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})

module.exports = router;