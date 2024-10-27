import mongoose from 'mongoose'

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, 
    nationality: { type: String }, 
    description: { type: String },
    price: { type: Number, required: true },
    ingredients: { type: [String], required: true }, 
    eatingTime: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
    veg: { type: Boolean, required: true }, 
    vegan: { type: Boolean, default: false }, 
    imageUrl: { type: String, required: true } 
});

const foodItemModel = mongoose.model('foodItem', foodItemSchema);

export default foodItemModel;
