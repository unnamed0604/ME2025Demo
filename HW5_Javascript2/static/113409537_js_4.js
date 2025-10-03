var checkboxes = document.querySelectorAll('.checkItem')
var checkItem1 = document.getElementById("checkItem1")
var checkItem2 = document.getElementById("checkItem2")
var checkItem3 = document.getElementById("checkItem3")
var checkallbox = document.getElementById("checkall")
var checkout = document.getElementById("alltotal")

var total1 = document.getElementById("total1")
var stock1 = document.getElementById("buy_number_1")
var price1 = document.getElementById("price1")


var total2 = document.getElementById("total2")
var stock2 = document.getElementById("buy_number_2")
var price2 = document.getElementById("price2")


var total3 = document.getElementById("total3")
var stock3 = document.getElementById("buy_number_3")
var price3 = document.getElementById("price3")


console.log("hi")
console.log(document.getElementById("checkall").checked);
console.log("hi")

function checkall(){
    if(checkallbox.checked == true){
        checkboxes.forEach(cb => cb.checked =true)
        total1.textContent = stock1.value*price1.textContent
        total2.textContent = stock2.value*price2.textContent
        total3.textContent = stock3.value*price3.textContent
        checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)

    }else if (checkallbox.checked == false){
        checkboxes.forEach(cb => cb.checked =false)
        checkout.textContent = 0
    }
}



function plus1(){
    if(stock1.value<20){
        stock1 =document.getElementById("buy_number_1")
        stock1.value =parseInt(stock1.value) + 1
        total1.textContent = stock1.value*price1.textContent
    }
    if(checkItem1.checked == false){
        total1.textContent =0
    }
    else{
        checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
}
function minus1(){
    if(stock1.value>1){
    stock1 =document.getElementById("buy_number_1")
    stock1.value =parseInt(stock1.value) - 1
    total1.textContent = stock1.value*price1.textContent
    }
    if(checkItem1.checked == false){
        total1.textContent =0
    }
    else{
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
}



function plus2(){
    if(stock2.value<40){
        stock2 =document.getElementById("buy_number_2")
        stock2.value =parseInt(stock2.value) + 1
        total2.textContent = stock2.value*price2.textContent
    }
    if(checkItem2.checked == false){
        total2.textContent =0
    }
    else{
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
}
function minus2(){
    if(stock2.value>1){
    stock2 =document.getElementById("buy_number_2")
    stock2.value =parseInt(stock2.value) - 1
    total2.textContent = stock2.value*price2.textContent
    }
    if(checkItem2.checked == false){
        total2.textContent =0
    }
    else{
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
}


function plus3(){
    if(stock3.value<30){
        stock3 =document.getElementById("buy_number_3")
        stock3.value =parseInt(stock3.value) + 1
        total3.textContent = stock3.value*price3.textContent
    }
    if(checkItem3.checked == false){
        total3.textContent =0
    }
    else{
        checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
}
function minus3(){
    if(stock3.value>1){
    stock3 =document.getElementById("buy_number_3")
    stock3.value =parseInt(stock3.value) - 1
    total3.textContent = stock3.value*price3.textContent
    }
    if(checkItem3.checked == false){
        total3.textContent =0
    }
    else{
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
}

stock1.addEventListener("input", () => {
    if(stock1.value>20){
        stock1.value = 20
         total1.textContent = stock1.value*price1.textContent
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
    if(isNaN(stock1.value) || stock1.value<1){
        stock1.value = 1
         total1.textContent = stock1.value*price1.textContent
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }


})
stock2.addEventListener("input", () => {
    if(stock2.value>40){
        stock2.value = 40
         total2.textContent = stock2.value*price2.textContent
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
    if(isNaN(stock2.value) ||stock2.value<1){
        stock2.value = 1
         total2.textContent = stock2.value*price2.textContent
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }


})
stock3.addEventListener("input", () => {
    if(stock3.value>30){
        stock3.value = 30
         total3.textContent = stock3.value*price3.textContent
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }
    if(isNaN(stock3.value) ||stock1.value<1){
        stock3.value = 1
         total3.textContent = stock3.value*price1.textContent
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)
    }


})





checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const allChecked = Array.from(checkboxes).every(item => item.checked);
        checkallbox.checked = allChecked;

        if(checkItem1.checked==true){
            total1.textContent = stock1.value*price1.textContent
        }
        else{
            total1.textContent = 0
        }
        if(checkItem2.checked==true){
            total2.textContent = stock2.value*price2.textContent
        }
        else{
            total2.textContent = 0
        }
        if(checkItem3.checked==true){
            total3.textContent = stock3.value*price3.textContent
        }
        else{
            total3.textContent = 0
        }
         checkout.textContent = parseInt(total1.textContent) + parseInt(total2.textContent) + parseInt(total3.textContent)

    });
});

total1.textContent = 0
total2.textContent = 0
total3.textContent = 0
checkout.textContent = 0



