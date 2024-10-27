import { Router } from 'express';
import foodItemModel from '../Models/FoodDishModel.js';

const router = Router();

router.get('/get-all-foods', async (req, res) => {
    try {
       
        const foodItems = await foodItemModel.find();

        res.status(200).json(foodItems);
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ message: 'Server error. Could not retrieve food items.' });
    }
});

export default router;
