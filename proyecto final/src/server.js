import mongoose from 'mongoose';
import app from './express.app.js';
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT
const mongoUri = process.env.MONGO_URI_LOCAL

app.listen(port, () => console.log(`Server running in port ${port}`))


try {

    const connected = await mongoose.connect(

        mongoUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )

    if (connected) {
        console.log('Connected to MongoDB')

    } else { console.log('Error while connecting to MongoDB') }


} catch (error) { console.log(error) }