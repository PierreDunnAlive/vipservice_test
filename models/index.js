const Sequelize = require("sequelize");
const config = require("../config/config.json");

if (!config) {
    throw new Error("Can't find configuration file.");
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Order = sequelize.define("Order", {
    ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    locator: {
        type: Sequelize.CHAR(6),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(64) ,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE(6, 2) ,
        allowNull: false
    },
    currency: {
        type: Sequelize.CHAR(3),
        allowNull: false
    }
},  {
    underscored: true,
    tableName: "orders",
    timestamps: false
});

const OrderPassenger = sequelize.define("OrderPassenger", {
    ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    order_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    name_first: {
        type: Sequelize.STRING(64) ,
        allowNull: false
    },
    name_second: {
        type: Sequelize.STRING(64) ,
        allowNull: false
    }
}, {
    underscored: true,
    tableName: "order_passengers",
    timestamps: false
});

const db = {
    Order: Order,
    OrderPassenger: OrderPassenger
}

Order.hasMany(OrderPassenger, {as: "passengers", foreignKey: "order_id"});

module.exports = db;