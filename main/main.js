// 1，代码风格一致（函数以小写开头）

let allData = require("./datbase.js");
const NORMAL_PRODUCT_LENGTH = 10;

module.exports = function printInventory(inputs) {

   let productData = allData.loadAllItems();
   let cutData = allData.loadPromotions();
   let countProduce =[];
   let cutProduct = [];

   countProduce = Get_Produces_Numbers(inputs);
   cutProduct = Get_Product_Cut(countProduce, cutData[0]['barcodes']);
   Print_List(countProduce, cutProduct, productData);

};

function Get_Produces_Numbers(inputs) {
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

function Get_Product_Cut(countProduce, cutData) {
    let cutProduct = [];
    let keyName = Object.keys(countProduce);

    for (let i = 0; i < keyName.length; i++) {
        if(cutData.indexOf(keyName[i]) != -1){
            cutProduct[keyName[i]] = Math.floor(countProduce[keyName[i]] / 3);
        }
    }
    return cutProduct;
}

function Print_List(countProduce, cutProduct, productData){
    let keyName = Object.keys(countProduce);
    let cutName = Object.keys(cutProduct);
    let sumMoney = [];
    let lessMoney = 0;
    let result = "";

    result += "***<没钱赚商店>购物清单***\n";
    for (let i = 0; i < keyName.length; i++) {
        let location = parseInt(keyName[i].slice(4,10));

        if(cutName.indexOf(keyName[i]) === -1){
            sumMoney.push(productData[location]["price"] * countProduce[keyName[i]]);
        }
        else {
            sumMoney.push(productData[location]["price"] * (countProduce[keyName[i]] - cutProduct[cutName[cutName.indexOf(keyName[i])]]));
        }
        result += '名称：' + productData[location]["name"] + '，数量：' + countProduce[productData[location]["barcode"]]
            + productData[location]["unit"] + '，单价：' + productData[location]["price"].toFixed(2)
            + '(元)，小计：' + sumMoney[i].toFixed(2) + '(元)\n';
    }

    result += '----------------------\n';
    result += '挥泪赠送商品：\n';
    for (let i = 0; i < cutName.length; i++) {
        let location = parseInt(cutName[i].slice(4,10));
        result += '名称：' + productData[location]["name"] + '，数量：' + cutProduct[productData[location]["barcode"]]
        + productData[location]["unit"] + '\n';
        lessMoney += cutProduct[productData[location]["barcode"]] * productData[location]["price"];
    }
    result += '----------------------\n';
    result += '总计：' + sumMoney.reduce((x, y) => x + y).toFixed(2) + '(元)\n';
    result += '节省：' + lessMoney.toFixed(2) + '(元)\n';
    result += '**********************';

    console.log(result);
}