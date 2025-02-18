import mongoose from 'mongoose'
const productosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: String,
    precio: { type: Number, required: true },
    categoriaId: { type: Schema.Types.ObjectId, ref: 'categories', required: true }, 
    stock: { type: Number, default: 0 },
    creadoEn: { type: Date, default: Date.now },
    actualizadoEn: { type: Date, default: Date.now }

},
{
    timestamps:true
})

const productosModel = mongoose.model("productos", productosSchema)
export default productosModel
