import mongoose from 'mongoose'

// const URI: string = process.env.MONGODB_URI || "mongodb://localhost/CodeVerification";
let URI: string = ''
if (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI !== undefined) {
    URI = process.env.MONGODB_URI
} else {
    URI = 'mongodb://localhost/CodeVerification'
}

mongoose.connect(URI)
    .catch(err => {
        console.log('Ocurrio un error de conexion a la base de datos... \n', err)
    })

const db = mongoose.connection

db.once('open', () => {
    console.log('Database is connected to: ', URI)
})

// to test the error stop mongod
db.on('error', err => {
    console.log('Ocurrio un error al conectarse a la base de datos... \n', err)
})
