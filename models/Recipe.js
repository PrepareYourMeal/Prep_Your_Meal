const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    spoon_id: {
        type: Number,
        required: true
    },
    vegetarian: {
        type: Boolean,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    },
    glutenFree: {
        type: Boolean,
        required: true
    },
    dairyFree: {
        type: Boolean,
        required: true
    },
    ketogenic: {
        type: Boolean,
        required: true
    },
    preparationMinutes: {
        type: Number,
    },
    readyInMinutes: {
        type: Number,
    },
    servings: {
        type: Number,
    },
    sourceUrl: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    ingredients: [
        {
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            spoon_id: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
            }
        }
    ],
    instructions: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

module.exports = Recipe = mongoose.model('recipes', RecipeSchema)