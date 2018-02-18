const orderBlock = document.querySelector(".orders-block");
const table = document.createElement("div");

const xhr = new XMLHttpRequest();

xhr.onload = function(){

    let resp = JSON.parse(this.response);

    resp.forEach(ord => {
        ord.locator = `<a href=/order/${ord.locator}>http://localhost:3000/order/${ord.locator}</a>`;

        let order = document.createElement("p");

        order.innerHTML = JSON.stringify(ord);
        orderBlock.appendChild(order);
    });

}

xhr.open("GET", "/api/orders", true);
xhr.send();