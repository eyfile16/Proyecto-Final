import mongoose from 'mongoose'
const usuariosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    rol: { type: String, enum: ['cliente', 'admin'], required: true },
    contraseña: { type: String, required: true, select: false }, 
    creadoEn: { type: Date, default: Date.now },
    actualizadoEn: { type: Date, default: Date.now }

},
{
    timestamps:true
})

const usuariosModel = mongoose.model("usuarios", usuariosSchema)
export default usuariosModel