const db = require('../config/connection');
const { User, Cake } = require('../models');
const userSeeds = require('./userSeeds.json');
const cakeSeeds = require('./cakeSeeds.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Cake.deleteMany({});
    
        await User.create(userSeeds);
        await Cake.create(cakeSeeds);
    
        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});
