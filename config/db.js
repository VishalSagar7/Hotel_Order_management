import mongoose from 'mongoose';

// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://vishalaynile1234:YC68sdR46IvyB4OH@hotelcluster.76kkf.mongodb.net/?retryWrites=true&w=majority&appName=HotelCluster',
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