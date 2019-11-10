import json
#import pymongo
from pymongo import MongoClient

#from pymongo import MongoClient

#this is my python script
#a = 1
#c = a + 1
#print(c)

#mongodb+srv://robchin:ssw690mealprep@mealplanner690-if2ak.mongodb.net/test?retryWrites=true&w=majority

#try:
#    conn = MongoClient('localhost', 27017)
#    print("Connected successfully!!!")
#except:
#    print("Could not connect to MongoDB")

#db = conn.bob
#collection = db.recipes

try:
    conn = MongoClient("mongodb+srv://robchin:ssw690mealprep@mealplanner690-if2ak.mongodb.net/test?retryWrites=true&w=majority")
    print("Connected successfully!!!")
#except Exception as e: print(e)
    #print("Could not connect to MongoDB")

except:
    print("Could not connect to MongoDB")

db = conn.mealplanner
collection = db.recipes

with open('/Users/robertchin/Desktop/testload.json') as json_file:
    data = json.load(json_file)
    for r in data['recipes']:
        print('Spoon ID: ' + str(r['id']))
        print('Recipe Title: ' + r['title'])
        print('Vegetarian: ' + str(r['vegetarian']))
        print('Vegan: ' + str(r['vegan']))
        print('Gluten Free: ' + str(r['glutenFree']))
        print('Dairy Free: ' + str(r['dairyFree']))
        print('Ketogenic: ' + str(r['ketogenic']))

        try:
            print('preparationMinutes: ' + str(r['preparationMinutes']))
        except:
            print('preparationMinutes: ' + 'ERROR')

        print('Servings: ' + str(r['servings']))
        print('sourceURL: ' + str(r['sourceUrl']))

        try:
            print('imageURL: ' + str(r['image']))
        except:
            print('imageURL: ' + 'NULL')

        print('Extended Ingredients: \n')
        for ingredients in r['extendedIngredients']:
            print(' -Spoon ID: ' + str(ingredients['id']))
            print(' -Name of Ingredient: ' + ingredients['name'])
            print(' -Quantity: ' + str(ingredients['amount']))

        print('Instructions: ' + r['instructions'])

        for instructions in r['analyzedInstructions']:
            for steps in instructions['steps']:
                print(' -Step ' + str(steps['number']) + ': ' + steps['step'])
                print('')


        print('Tags: ' + str(r['vegetarian']))

        #print('From: ' + r['from'])
        print('')
        recipe_id = r['id']
        title = r['title']
        vegetarian = r['vegetarian']
        vegan = r['vegan']
        glutenFree = r['glutenFree']
        dairyFree = r['dairyFree']
        ketogenic = r['ketogenic']
        try:
            preparationMinutes = r['preparationMinutes']
        except:
            preparationMinutes = 0

        servings = str(r['servings'])
        sourceUrl = str(r['sourceUrl'])

        try:
            imageUrl = str(r['image'])
        except:
            imageUrl = 'null'

        ingredients_array = []

        for ingredients in r['extendedIngredients']:
            print(' -Spoon ID: ' + str(ingredients['id']))
            print(' -Name of Ingredient: ' + ingredients['name'])
            print(' -Quantity: ' + str(ingredients['amount']))
            ingredients_temp = {
                "name": ingredients['name'],
                "spoon_id": ingredients['id'],
                "quantity": ingredients['amount']
            }
            ingredients_array.append(ingredients_temp)


        instructions_array = []
        for instructions in r['analyzedInstructions']:
            for steps in instructions['steps']:
                print(' -Step ' + str(steps['number']) + ': ' + steps['step'])
                print('')

                instructions_array.append(steps['step'])

        tags_array = ["null"]


        temp = {
            "instructions": instructions_array,
            "tags": tags_array,
            "title": title,
            "spoon_id": recipe_id,
            "vegetarian": vegetarian,
            "vegan": vegan,
            "glutenFree": glutenFree,
            "dairyFree": dairyFree,
            "ketogenic": ketogenic,
            "preparationMinutes": preparationMinutes,
            "servings": servings,
            "sourceUrl": sourceUrl,
            "imageUrl": imageUrl,
            "ingredients": ingredients_array

            }

        collection.insert_one(temp)
