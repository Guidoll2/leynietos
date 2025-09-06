import mongoose, { Mongoose } from "mongoose";

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error('La variable de entorno MONGODB_URI no está definida');
}

// Definimos una variable "globalForMongoose" para evitar errores de tipos
const globalForMongoose = globalThis as typeof globalThis & {
  _mongoose?: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
};

if (!globalForMongoose._mongoose) {
  globalForMongoose._mongoose = {
    conn: null,
    promise: null,
  };
}

const cached = globalForMongoose._mongoose;

const connectDB = async () => {
  if (cached.conn) {
    console.log("---Ya conectado a MongoDB---");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("---Conectando a MongoDB---");
    cached.promise = mongoose
      .connect(connectionString, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
      })
      .then((m) => {
        console.log("---Conexión exitosa a MongoDB---");
        return m;
      })
      .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
