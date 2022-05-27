const mongoose = require('mongoose');

const usuarioModel = new mongoose.Schema({
    usuario: { type: String, require: true },
    password: { type: String, required: true, select: false }
})

const Usuario = mongoose.model("usuario", usuarioModel);

module.exports = Usuario;