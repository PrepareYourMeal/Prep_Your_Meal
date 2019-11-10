const Ingredient = require('./models/Ingredient');
const Recipe = require('./models/Recipe');
const axios = require("axios");

const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);

        //Exit process with failure
        process.exit(1);
    }
}

connectDB();

axios({
    "method":"GET",
    "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key":"026637f033msh5b5e3f97cabe4ccp1b213ejsn8a44f3ec1d8f"
    },"params":{
    "number":"20",
    "limitLicense":"false",
    "tags": "dairy free"
    }
    })
    .then( async (response)=>{
        for (let i=0; i < response.data.recipes.length; i++) {
            let title = response.data.recipes[i]["title"];
            let spoon_id = response.data.recipes[i]["id"];
            let vegetarian = response.data.recipes[i]["vegetarian"];
            let vegan = response.data.recipes[i]["vegan"];
            let glutenFree = response.data.recipes[i]["glutenFree"];
            let dairyFree = response.data.recipes[i]["dairyFree"];
            let ketogenic = response.data.recipes[i]["ketogenic"];
            let preparationMinutes = response.data.recipes[i]["preparationMinutes"];
            let readyInMinutes = response.data.recipes[i]["readyInMinutes"]
            let servings = response.data.recipes[i]["servings"];
            let sourceUrl = response.data.recipes[i]["sourceUrl"];
            let imageUrl = response.data.recipes[i]["image"];
            let ingregients = [];
            let tags = [];

            let instructions = response.data.recipes[i]["instructions"].trim().split(".")

            for (let j=0; j < response.data.recipes[i]["extendedIngredients"].length; j++) {

                let name = response.data.recipes[i]["extendedIngredients"][j]["name"];
                let spoon_id = response.data.recipes[i]["extendedIngredients"][j]["id"];
                let quantity = response.data.recipes[i]["extendedIngredients"][j]["amount"];
                let unit = response.data.recipes[i]["extendedIngredients"][j]["unit"];

                let ingredient = {
                    name,
                    spoon_id,
                    quantity,
                    unit
                }

                ingregients.push(ingredient);
            }

            if (response.data.recipes[i]["cuisines"]) {
                for (let x=0; x < response.data.recipes[i]["cuisines"].length; x++) {
                    tags.push(response.data.recipes[i]["cuisines"][x])
                }
            }

            if (response.data.recipes[i]["dishTypes"]) {
                for (let y=0; y < response.data.recipes[i]["dishTypes"].length; y++) {
                    tags.push(response.data.recipes[i]["dishTypes"][y])
                }
            }

            if (response.data.recipes[i]["diets"]) {
                for (let z=0; z < response.data.recipes[i]["diets"].length; z++) {
                    tags.push(response.data.recipes[i]["diets"][z])
                }
            }

            const check_recipe = await Recipe.findOne({ spoon_id: spoon_id });
            if (check_recipe) {
                continue
            } else {
                const ingredient_list = []
                for (let i = 0; i < ingregients.length; i++) {
                    rec_ingredient = ingregients[i]
                    spoon = rec_ingredient.spoon_id
                    ingi = await Ingredient.findOne({ spoon_id: spoon });

                    if (!ingi) {
                        const newIngredient = new Ingredient({
                            name: rec_ingredient.name,
                            spoon_id: rec_ingredient.spoon_id
                        });
                        const newIngred = await newIngredient.save();
                        const ingredObj = {
                            ingredient_id: newIngred.id,
                            name: newIngred.name,
                            spoon_id: newIngred.spoon_id,
                            quantity: rec_ingredient.quantity,
                            unit: rec_ingredient.unit
                        };
                        ingredient_list.push(ingredObj);
                    } else {
                        const ingredObj = {
                            ingredient_id: ingi.id,
                            name: ingi.name,
                            spoon_id: ingi.spoon_id,
                            quantity: rec_ingredient.quantity,
                            unit: rec_ingredient.unit
                        };
                        ingredient_list.push(ingredObj);
                    }
                }

                const newRecipe = new Recipe({
                    title: title,
                    spoon_id: spoon_id,
                    vegetarian: vegetarian,
                    vegan: vegan,
                    glutenFree: glutenFree,
                    dairyFree: dairyFree,
                    ketogenic: ketogenic,
                    preparationMinutes: preparationMinutes,
                    readyInMinutes: readyInMinutes,
                    servings: servings,
                    sourceUrl: sourceUrl,
                    imageUrl: imageUrl,
                    ingredients: ingredient_list,
                    instructions: instructions,
                    tags: tags
                });
        
                const save_recipe = await newRecipe.save();
                console.log(save_recipe);
            }
        }
    })
    .catch((error)=>{
      console.log(error)
    })

