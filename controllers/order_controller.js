const db = require("../models");
/*const async = require('asyncawait/async'); 
const await = require('asyncawait/await'); */
const getCourse = require('../services/date_course_service');

async function locate (req, res){

    try {

        let order = await db.Order.findAll({ //
            where: {
                locator: req.params.locator
            },            
            include: [{
                model: db.OrderPassenger,
                as: "passengers"
            }]
            
        });

        order = order[0]

        let msg = order.passengers.map(psg => {
            return {
                order_id: order.ID,
                name_first: psg.name_first,
                name_second: psg.name_second
            }
        });
    
        return res.json(msg);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function show (req, res){
    try {
        let orders = await db.Order.findAll({
            include: [{
                model: db.OrderPassenger,
                as: "passengers"
            }]
        }); //
        
        let msg = [];

        for (i in orders) {

            msg.push({
                ID: orders[i].ID,
                locator: orders[i].locator,
                cost_rub: await getCourse(orders[i].price, orders[i].currency), // 
                cost_valute: orders[i].price + " " + orders[i].currency,
                passengers: orders[i].passengers.length
            });
        }
        return res.json(msg);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

module.exports = {
    locate: locate, //
    show: show //
}