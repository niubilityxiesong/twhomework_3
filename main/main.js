var NORMAL_PRODUCT_LENGTH = 10;

module.exports = function printInventory(inputs) {

   let allData = require("./datbase.js");
   let productData = allData.loadAllItems();
   let cutData = allData.loadPromotions();
   let countProduce =[];

   countProduce = get_produces_numbers(inputs);
   console.log(countProduce);
};

function get_produces_numbers(inputs) {
    let countProduce = []
    let countNum = 1;

    if(inputs.length === 0){
        console.log('inputs length error!');
        return -1;
    }

    for (let i = 0; i < inputs.length - 1; i++) {
        if(inputs[i].length === NORMAL_PRODUCT_LENGTH){
            if(inputs[i] === inputs[i + 1]){
                countNum++;
            }
            else{
                countProduce[inputs[i]] = countNum;
                countNum = 1;
            }
        }
        else {
            let tempNum = inputs[i].slice(NORMAL_PRODUCT_LENGTH + 1);
            countProduce[inputs[i].slice(0,10)] = parseInt(tempNum);
        }
    }
    countProduce[inputs[inputs.length - 1]] = countNum;
    return countProduce;
}