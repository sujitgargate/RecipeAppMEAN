const moment = require('moment')
const Recipe = require('../model/recipe.model.js')

exports.createRecipe = async function (req, res) {
    console.log("in create service");
    var recipeExists = await Recipe.findOne({
        name: req.body.name
    })
    if (recipeExists) {
        res.status(400).send({
            message: 'Recipe Name already exists, please try with different name. '
        })
    }
    else {
        console.log(req.body);

        var newDate = moment(req.body.recipeCreatedDate).format('YYYY-MM-DD')
        var imageUrl = 'http://localhost:5000/' + req.file.filename

        let recipe = new Recipe({
            name: req.body.name,
            imageUrl: imageUrl,
            description: req.body.description,
            calories: req.body.calories,
            ingredient: req.body.ingredient,
            recipeCreatedDate: newDate,
            cusineType: req.body.cusineType,
            //below code changed
            // recipeMakingTime: JSON.stringify(req.body.recipeMakingTime),
            recipeMakingTime: req.body.recipeMakingTime,
            recipeCategory : req.body.recipeCategory

        })


        
        // const util = require('util');
        // console.log(util.inspect(req.body.recipeMakingTime,false,null));
        // console.log(req.body.recipeMakingTime);
        // console.log(JSON.stringify(req.body.recipeMakingTime));
        // console.log(JSON.stringify(req.body.recipeMakingTime, null, "  "));


        let recipeCreated = await Recipe.create(recipe)
        res.status(200).send(recipeCreated)
    }
}

exports.update = async function (req, res) {
    console.log('in update ' + req.body.name);
    var recipeExists = await Recipe.findOne({
        name: req.body.name
    })
    if (req.file) {
        var imageUrl = 'http://localhost:5000/' + req.file.filename
        req.body.imageUrl = imageUrl
    }
    if (recipeExists) {
        if (recipeExists._id !== req.body._id) {
            res.status(400).send({
                message: 'Recipe Name already exists, please try with another name..'
            })
        }
        else {

            var updatedRecipe = await Recipe.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
            res.status(200).send(updatedRecipe);
        }
    }
    else {
        var updatedRecipe = await Recipe.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
        res.status(200).send(updatedRecipe);
    }

}

exports.get = async function (req, res) {
    var allRecipe = await Recipe.find();
    console.log(allRecipe);
    res.send(allRecipe)
}

exports.delete = async function (req, res) {
    await Recipe.findByIdAndDelete(req.params.id)
}


exports.getById = async function (req, res) {
    var recipe = await Recipe.findById(req.params.id)
    res.send(recipe);
}

exports.getByName = async function (req, res) {
    // debugger;
    console.log("getByName in services" + req.body.name);
    var recipe = await Recipe.findOne({
        name: req.body.name
    })

    res.send(recipe);
}