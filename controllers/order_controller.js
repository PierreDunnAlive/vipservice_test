const db = require("../models");
const async = require('asyncawait/async'); //
const await = require('asyncawait/await'); //

function locate (req, res){

    try {

        let order = await(db.Order.findOne({ //
            where: {
                locator: req.params.locator
            }
        }));
    
        let order_passengers = await(db.OrderPassenger.findAll({ //
            where: {
                order_id: order.id
            }
        }));
    
        return res.json({order_passengers});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
};

function show (req, res){
    try {
        let orders = await(db.Order.findAll()); //
        return res.json({orders});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
};

module.exports = {
    locate: async(locate), //
    show: async(show) //
}