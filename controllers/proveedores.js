const express = require('express');
const router = express.Router();
const Proveedor = require('../models/proveedor');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// Crear proveedor
router.post('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Listar proveedores
router.get('/', async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Obtener proveedor por ID
router.get('/:id', async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Actualizar proveedor
router.put('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proveedorActualizado) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        res.json(proveedorActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Eliminar proveedor
router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const proveedorEliminado = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedorEliminado) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        res.json({ mensaje: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
