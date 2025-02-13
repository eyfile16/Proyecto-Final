const Order = require('../models/ordenes');
const { verifyToken } = require('../middlewares/auth');

// Crear una orden
const createOrder = async (req, res) => {
    try {
        const order = new Order({ ...req.body, user: req.user.id });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar todas las órdenes
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener detalles de una orden
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar estado de una orden
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una orden
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
