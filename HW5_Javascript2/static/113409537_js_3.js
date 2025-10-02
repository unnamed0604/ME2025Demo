var answer = Math.floor(Math.random() * 101);
console.log(answer);
var count = 0;

var title = document.getElementById('title')
var new_element = document.createElement('h3')
var timer = document.createElement('h2')
timer.textContent = "Time: "
title.appendChild(timer)

var time_num = 0

var reset_flag =0

var start;
var hint_flag =0


function reset(){

    answer = Math.floor(Math.random() * 101);
    console.log(answer);

    count = 0
    clearInterval(start)
    reset_flag = 1
    start = setInterval(counting_time, 1000)
    hint_flag = 0


}
function counting_time(){
    time_num++;
    console.log(time_num)
    if(reset_flag ==1){
        time_num = 0;
        reset_flag=0
    }
    timer.textContent = "Time: "+time_num
}



function guess(){

    let input_num = document.forms['Guessnum']['Guess'].value;
    console.log(input_num);


    
    if (hint_flag == 1){
        title.removeChild(new_element)
        hint_flag = 0
    }
    

    
    if(input_num > answer){

        new_element = document.createElement('h3')
        new_element.textContent = 'The number is so big';
        title.appendChild(new_element)
        hint_flag =1

        count = count+1;
        clearInterval(start)
        start = setInterval(counting_time, 1000)
    }
    else if( input_num < answer){

        new_element = document.createElement('h3')
        new_element.textContent = 'The number is so small';
        title.appendChild(new_element)
        hint_flag =1

        count = count+1;
        clearInterval(start)
        start = setInterval(counting_time, 1000)
    }
    else{
        count= count+1;

        alert("Correct, U have try "+count+" times." )

        reset()

        
    }



}



