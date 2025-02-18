import mongoose from 'mongoose';
const categoriasSchema = new mongoose.Schema({
    descripcion:{type:String, required:true},
    estado:{type:Number, required: true, default:1}
},{
        timestamps:true
}
)

const categoriasModel = mongoose.model("categorias",categoriasSchema)
export default categoriasModel