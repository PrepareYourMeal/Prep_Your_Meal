# Stove & Oven

**SSW 690 Software Design Studio**  
  
**STOVE AND OVEN WEB APPLICATION**  
  
***Collaborators: Abhijit Amin, Robert Chin, Sadie Stokes, Mrunal Salvi, Tanvi Hanamshet***  

**Deployment**
- Stagging: [https://stove-and-oven-stagging.herokuapp.com](https://stove-and-oven-stagging.herokuapp.com)
- Production: In progress

**Description:**  
This web application would allow the user to register and create a profile.  
The user can use this web app to track ingredients in their house.  
The user will be able to see the a list of recipes that he/she can make considering the ingredients in the house.  
The user will be able to filter through and categorize recipes.  
The web application will provide the user with a meal planner model.  
The web application will determine the list of grocery materials to be bought considering the meal plan.  

**Node Modules Used for Reference:**  
express: Run backend server and define API routes  
express-validator: user input validation for the backend  
bcryptjs: hashes user password for security  
gravatar: to get user avatar  
axios: call api endpoints in the frontend  
react react-router-dom: to handle frontend components  
redux react-redux redux-thunk: to handle application and component state  
mongoose: connect and interact with the MongoDB database    
passport: to implement google and facebook login and authentication  
  
**Instructions to Run project on your local machine:**  
  
--1-- Clone the Repository  
  --1.1-- From the Command Prompt/Powershell/Terminal  
          --  Copy the SSH key link or the HTTPS link from the github repository  
          --  On your Command Prompt/Powershell enter the following command: git clone --single-branch --branch sprint1 <CopiedLink>  
  --1.2-- Else you can download a zip file  
  
  Note* Please make sure that you download the latest commit from the sprint1 branch while working on the project.  
    
--2-- Setup Database Connection - MongoDB Atlas  
  --2.1-- Go to the root directory of the project .../Prep_Your_Meal/  
  --2.2-- Download the config folder from the google shared drive  
  --2.3-- Copy and paste the config folder in the root directory of the project   
  --2.4-- Open the default.json file  
  --2.5-- In the "mongoURI" field, insert your username and password in place of {username}:{password}  
  --2.6-- The general format should look like this - if your username is batman and password is joker then - batman:joker@...  
  --2.7-- You can find your username and password on the team sprint planning sheet  
  --2.8-- All collaborators of this project have read and write access to the database  
    
--3-- Install node modules  
  --3.1-- Make sure you are running the latest version of node.js (^10) by running node --version on your command prompt    
  --3.2-- In your command prompt/terminal change directory to the root directory of the project ../Prep_Your_Meal/  
  --3.3-- Run the following command to install all node modules and dependencies for backend: npm i
  --3.4-- In your command prompt/terminal change directory to ../Prep_Your_Meal/client
  --3.5-- Run the following command to install all node modules and dependencies for frontend: npm i
  
--4-- Running Backend and Frontend Servers  
  --4.1-- In your command prompt/terminal change directory to the root directory of the project ../Prep_Your_Meal/  
  --4.2-- You have 4 different options to run frontend, backend servers individually and together    
      --4.2.1-- To run the express backend server: npm start    
      --4.2.2-- To run the express backend using a liver server: npm run server  
      --4.2.3-- To run the React client server: npm run client  
      --4.2.4-- To run both the Express backend and React frontend servers together using concurrently: npm run dev

**Some important Docker command**
  1. Build Docker image: ```docker build -f Dockerfile -t recipe .```
  2. Run docker image: 
    ```winpty docker run --rm -it --expose=7000 -p=7000:7000 -e="PORT=7000" -e="NODE_ENV=production" -e="CONFIG__mongoURI=mongodb+srv://{username}:{password}@mealplanner690-if2ak.mongodb.net/mealplanner?retryWrites=true&w=majority" -e="CONFIG__jwtSecret=mySecretToken" recipe```
 
**Note** - Please make sure that you work on the latest commits and do commit and push to origin every time you change something in the project.  
