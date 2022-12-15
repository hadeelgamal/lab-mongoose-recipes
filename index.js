const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.create({ 
    
    title: 'Fool Recipe',
    level: 'Easy Peasy',
    ingredients: ['Fool', 'Tomato', 'Onions'],
    duration: 15,
    creator: 'Hadeel',
    
    
  })
  .then( recipe => {
    // console.log('Recipe Title: ', recipe.title)
  })
  )
  
  .then(() => {
  return  Recipe.insertMany(data)
    // .then(allRecipes => console.log(allRecipes))
  })

 .then(() => {
   return Recipe.findOneAndUpdate({duration: 220}, {duration: 100}, {new: true})
    // .then(updatedDuration => console.log('updated duration: ', updatedDuration))
  })
  
  .then(() => {
   return Recipe.deleteOne({title: 'Carrot Cake'})
    .then(console.log('removed carot cake'))
  })

  .then(() => mongoose.connection.close())
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

