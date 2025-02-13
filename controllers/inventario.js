const express = require('express');
const router = express.Router();
const Inventario = require('../models/inventario');
const Producto = require('../models/Producto');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// Registrar movimiento de inventario (entrada, salida, devolución)
router.post('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const { productoId, tipo, cantidad } = req.body;

        // Verificar si el producto existe
        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

        // Ajustar stock según el tipo de movimiento
        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else if (tipo === 'salida' || tipo === 'devolución') {
            if (producto.stock < cantidad) {
                return res.status(400).json({ mensaje: 'Stock insuficiente' });
            }
            producto.stock -= cantidad;
        } else {
            return res.status(400).json({ mensaje: 'Tipo de movimiento no válido' });
        }

        await producto.save();

        const movimiento = new Inventario(req.body);
        await movimiento.save();
        res.status(201).json(movimiento);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Historial de movimientos
router.get('/', async (req, res) => {
    try {
        const movimientos = await Inventario.find().populate('productoId', 'nombre');
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Productos con bajo stock
router.get('/low-stock', async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 5;
        const productosBajoStock = await Producto.find({ stock: { $lt: threshold } });
        res.json(productosBajoStock);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
