const express = require('express');
const router = express.Router();
const Categoria = require('../models/categorias');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// Crear categoría
router.post('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const categoria = new Categoria(req.body);
        await categoria.save();
        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Listar categorías
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Editar categoría
router.put('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoriaActualizada) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json(categoriaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Eliminar categoría
router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoriaEliminada) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
