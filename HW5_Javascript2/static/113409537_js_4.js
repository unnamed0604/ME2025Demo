var checkboxes = document.querySelectorAll('.checkItem')
var checkallbox = document.getElementById("checkall")

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
    }
    else if (checkallbox.checked == false){
        checkboxes.forEach(cb => cb.checked =false)
    }

}

function plus1(){
    if(stock1.value<20){
        stock1 =document.getElementById("buy_number_1")
        stock1.value =parseInt(stock1.value) + 1
    }

}
function minus1(){
    if(stock1.value>0){
    stock1 =document.getElementById("buy_number_1")
    stock1.value =parseInt(stock1.value) - 1
    }

}

function plus2(){
    if(stock1.value<40){
        stock2 =document.getElementById("buy_number_2")
        stock2.value =parseInt(stock2.value) + 1
    }

}
function minus2(){
    if(stock2.value>0){
    stock2 =document.getElementById("buy_number_2")
    stock2.value =parseInt(stock2.value) - 1
    }

}

function plus3(){
    if(stock3.value<30){
        stock3 =document.getElementById("buy_number_3")
        stock3.value =parseInt(stock3.value) + 1
    }

}
function minus3(){
    if(stock1.value>0){
    stock3 =document.getElementById("buy_number_3")
    stock3.value =parseInt(stock3.value) - 1
    }

}

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const allChecked = Array.from(checkboxes).every(item => item.checked);
        checkallbox.checked = allChecked;
    });
});

total1.textContent = stock1.value*price1.textContent
total2.textContent = stock2.value*price2.textContent
total3.textContent = stock3.value*price3.textContent



