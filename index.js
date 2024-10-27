import express from 'express';
import { connectDB } from './config/db.js';
import HotelSignupRoute from './Routes/HotelSignupRoute.js'
import HotelLoginRoute from './Routes/HotelLoginRoute.js'
import AdminSignupRoute from './Routes/AdminSignupRoute.js'
import AdminLoginRoute from './Routes/AdminLoginRoute.js'
import RoomSignupRoute from './Routes/RoomSignupRoute.js'
import RoomLoginRoute from './Routes/RoomLoginRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import verifyHotelToken from './middlewares/hotelTokenVerification.js';
import adminTokenVerification from './middlewares/adminTokenVerification.js';
import roomTokenVerification from './middlewares/roomTokenVerification.js';
import AddnewDishRoute from './Routes/AddNewDish.js';
import getAllFoodItemsRoute from './Routes/GetAllFoodsRoute.js'
import dotenv from 'dotenv'



dotenv.config();
const port = process.env.port || 3001;
const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://hotel-order-management-frontend.vercel.app/'],      // handelling cors error
    credentials: true,
}));

app.use(cookieParser());

// Routes
app.use('/api', HotelSignupRoute);
app.use('/api', HotelLoginRoute);
app.use('/api', AdminSignupRoute);
app.use('/api', AdminLoginRoute);
app.use('/api', RoomSignupRoute);
app.use('/api', RoomLoginRoute);
app.use('/api', AddnewDishRoute);
app.use('/api', getAllFoodItemsRoute);


// Basic route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the server</h1>');
});


app.get('/api/verify-hotel-token', verifyHotelToken, (req, res) => {
    // console.log(req.hotel);
    res.status(200).json({
        success: true,
        message: 'Login successful',
        hotel: req.hotel
    });

});

app.get('/api/verify-admin-token', adminTokenVerification, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Login successful',
        admin: req.admin
    });

});


app.get('/api/verify-room-token', roomTokenVerification, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Login successful',
        room: req.room
    });
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });
