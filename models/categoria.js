
import mongoose, { Schema, model} from "mongoose"

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
CategoriaSchema.methods.toJSON = function(){
    const {__v,estado , ...data} = this.toObject();
    return data;
}
const Categoria = mongoose.model("Categoria", CategoriaSchema);
export { Categoria };