import mongoose from "mongoose"


const dbConection = async() =>{

    try {
        await mongoose.connect( process.env.MONGODB_CNN);
        console.log('Base de datos en linea');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de levantar la base de datos');
    }

}


export default dbConection;