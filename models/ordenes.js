import mongoose from 'mongoose'
const ordenesSchema = new mongoose.Schema({
    numerodeorden:{type:Number, required: true},
    fecha:{type:Date, required: true},
    usuarioId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, 
    productos: [
        {
            productoId: { type: Schema.Types.ObjectId, ref: 'products', required: true }, 
            cantidad: { type: Number, required: true },
            precio: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'pagado', 'cancelado'], default: 'pendiente' },
    creadoEn: { type: Date, default: Date.now }
},{
    timestamps:true
})

const ordenesModel = mongoose.model("moviminetos", ordenesSchema)
export default ordenesModel