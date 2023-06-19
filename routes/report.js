
const express = require('express');
const { User, Cost } = require('../models/schemes');
const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const { user_id, year, month } = req.query;

        const user = await User.findOne({ id: user_id }).exec();

        if (!user) {
            return res.status(404).json({ error: 'User with the id '+user_id+ ' not found' });
        }
        if(!year|!month){
            return res.status(400).json({ error: 'Year or Month Missing!' });
        }
        if(year>2023|year<1900|month>12|month<1){

            return res.status(400).json({ error: 'Date Impossible' });
        }


        const costs = await Cost.find({
            user_id: user_id,
            year: year,
            month: month,
        }).exec();

        const report = {
            food: [],
            health: [],
            housing: [],
            sport: [],
            education: [],
            transportation: [],
            other: [],
        };

        costs.forEach((cost) => {
            const { day, description, sum, category } = cost;
            report[category].push({ day, description, sum });
        });

        return res.status(200).json(report);
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
});

module.exports = router;
