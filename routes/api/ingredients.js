const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//Import Ingredients model
const Ingredient = require('../../models/Ingredient');

// GET api/ingredients
// get all ingredients
// access - private
router.get('/', auth, async (req, res) => {
    try {
        const ingredients = await Ingredient.find().sort({ name: -1 });
        res.json(ingredients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//GET api/ingredients/:id
// get ingredient by id
// access - Private
router.get('/:id', auth, async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).send('Ingredient not found');
        }
        res.json(ingredient);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).send('Ingredient not found');
        }
        res.status(500).send('Server Error');
    }
});

// POST api/ingredients
// create a new ingredient
// access - Private
router.post('/', [ auth, [
    check('name', 'Ingredient Name is required').not().isEmpty(),
    check('spoon_id', 'Spoonacular ID is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newIngredient = new Ingredient({
            name: req.body.name,
            spoon_id: req.body.spoon_id
        });
        const ingredient = await newIngredient.save();
        res.json(ingredient);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// DELETE api/ingredients/:id
// delete ingredient by id
// access - private
router.delete('/:id', auth, async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).send('Ingredient not found');
        }

        await ingredient.remove();

        res.json({ msg: 'Ingredient deleted' });
        
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).send('Ingredient not found');
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;