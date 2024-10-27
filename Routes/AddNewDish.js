import { Router } from 'express'
import foodItemModel from '../Models/FoodDishModel.js';

const router = Router();

router.post('/add-new-food', async (req, res) => {
    
    try {
        const { name, category, nationality, description, price, ingredients, eatingTime, veg, vegan, imageUrl } = req.body;

        const newFoodItem = new foodItemModel({
            name,
            category,
            nationality,
            description,
            price,
            ingredients,
            eatingTime,
            veg,
            vegan,
            imageUrl
        });

        const savedFoodItem = await newFoodItem.save();

        res.status(201).json({
            message: 'New food item added successfully',
            data: savedFoodItem
        });
    } catch (error) {
        console.error('Error saving food item:', error);
        res.status(500).json({ message: 'Failed to add new food item', error: error.message });
    }

  
});


export default router;