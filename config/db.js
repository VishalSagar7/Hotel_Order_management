import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config();

const uri = process.env.DB_URI

// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); 
    }
};


//YC68sdR46IvyB4OH