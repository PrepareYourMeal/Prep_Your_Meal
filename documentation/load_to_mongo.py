import json
#import pymongo
from pymongo import MongoClient

#from pymongo import MongoClient

#this is my python script
#a = 1
#c = a + 1
#print(c)

try: 
    conn = MongoClient('localhost', 27017)
    print("Connected successfully!!!") 
except:   
    print("Could not connect to MongoDB")

db = conn.database
collection = db.datas


with open('/Users/robertchin/Desktop/testload.json') as json_file:
    data = json.load(json_file)
    for r in data['recipes']:
        print('ID: ' + str(r['id']))
        print('Recipe Title: ' + r['title'])
        #print('From: ' + r['from'])
        print('')
        recipe_id = str(r['id'])
        title = r['title']
        temp = {
            "id": recipe_id,
            "message":title
            }

        collection.insert_one(temp)





