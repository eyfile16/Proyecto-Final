import mongoose from "mongoose";
const inventarioSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    categoria:{type:Number, required:true},
    stock:{type:Number, required:true},
    estado:{type:Number, required:true, default:1}
},{
    imestamps:true
}

);

const inventarioModel = model("articulos",inventarioSchema);
export default inventarioModel