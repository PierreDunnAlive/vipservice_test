const locator = document.querySelector("#locator").innerHTML;
const orderContainer = document.querySelector(".order-block");

let talker = new XMLHttpRequest();

talker.onload = function(){
    console.log(this.response)
    let psgs = JSON.parse(this.response);

    psgs.forEach(psg => {
        psg.locator = locator;
        
        let el = document.createElement("p");

        el.innerHTML = JSON.stringify(psg);
        orderContainer.appendChild(el);
    });
}

talker.open("GET", `/api/order/${locator}`, true);
talker.send();

//orderContainer.appendChild()