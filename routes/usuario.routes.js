const router = require("express").Router();
const usuarioController = require("../controller/usuarios");

router.get('/', usuarioController.getAll);
router.get('/findById/:id', usuarioController.getById);
router.post('/create', usuarioController.create);
router.put('/update/:id', usuarioController.update);
router.delete('/delete/:id', usuarioController.deleteOne);

module.exports = router;