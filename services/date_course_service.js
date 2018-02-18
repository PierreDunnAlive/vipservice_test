module.exports = (value, currency) => {

    const request = require("request");
    const dt = new Date();
    const parseString = require('xml2js').parseString;

    let today = `${dt.getDate()}/`;
    if (dt.getMonth() + 1 < 10) {
        today = today + `0${dt.getMonth() + 1}/${dt.getFullYear()}`;
    } else {
        today = today + `${dt.getMonth() + 1}/${dt.getFullYear()}`;
    }

    return new Promise((resolve, reject) => {

        if (currency == "RUB") {

            return resolve(parseFloat(value))

        }
        request.get(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${today}`, (err, res) =>{
            if (err) {
                console.log(err);
                reject(err);
            }
        
            parseString(res.body, (err, stat) => {
                
                if (err) {
                    console.log(err);
                    reject(err);
                }
                
                let valute = stat.ValCurs.Valute;
                
                let match = null;

                valute.forEach(val => {

                    if (val.CharCode == currency){
                        match = val;
                    }

                });

                resolve(parseFloat(value) * parseFloat(match.Value[0].replace(",", ".")));

            });
        });
    })
}
