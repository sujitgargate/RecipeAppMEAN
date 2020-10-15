const mongoose = require('mongoose')
const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        //required: true
        unique: true
    },

    imageUrl: {
        type: String,

    },
    description: {
        type: String
    },
    calories: {
        type: Number
    },
    recipeCreatedDate: {
        type: String,
    },
    ingredient: {
        type: Array
    },

    cusineType: {
        type: String
    },

    recipeMakingTime: {
        type: String
    },

    recipeCategory: {
        type: String

    }

})

module.exports = mongoose.model('Recipe', RecipeSchema)