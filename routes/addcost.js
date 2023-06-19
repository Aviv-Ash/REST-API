
const express = require('express');
const router = express.Router();
const { User, Cost } = require('../models/schemes');


/* GET users listing. */
router.post('/', async function (req, res, next) {
    try {
        const userId = 123123;

        const existingUser = await User.findOne({ id: userId }).exec();
        const categories =['food','health','housing','sport','education','transportation','other']

        // Check if the user exists
        if (existingUser) {
            // User already exists in the database
            console.log('User already exists:', existingUser);
        } else {
            // User does not exist, create a new user
            const newUser = await User.create({
                id: userId,
                first_name: 'Moshe',
                last_name: 'Israeli',
                birthday: new Date(1990, 0, 10)
            });

            console.log('New user created:', newUser);
        }

        // Add a new cost item
        const {
            user_id,
            year,
            month,
            day,
            description,
            category,
            sum
        } = req.body;

        // Validate inputs
        if (!year || !month || !day || !description || !category || !sum) {
            return res.status(400).json({error: 'Missing required fields '});
        }
        if (year > 2023 ||year <1900|| month > 12 || month < 1 || day < 1 || day > 31) {
            return res.status(400).json({error: 'Impossible date'});
        }
        if(!categories.includes(category)){
            return res.status(400).json({error: 'Category does not exists'});

        }
        const user = await User.findOne({id:user_id});
        console.log(user_id)
        if (!user) {
            return res.status(400).json({error: 'User_id ' + user_id+' not found'});
        }

        // Get the latest cost ID
        const latestCost = await Cost.findOne().sort({id: -1}).limit(1);
        const nextId = latestCost ? latestCost.id + 1 : 1;

        // Create a new cost document with the user input
        const cost = await Cost.create({
            id: nextId,
            user_id,
            year,
            month,
            day,
            description,
            category,
            sum
        });

        res.json(cost)

    }catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }

});

module.exports = router;