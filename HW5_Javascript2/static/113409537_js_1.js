var answer = Math.floor(Math.random() * 101);
console.log(answer);
var count = 0;
var countingtimes = 0;

var title = document.getElementById('title')

var container = document.getElementById('record')

var new_element = document.createElement('h3')
var timer = document.createElement('h2')
var guess_record = document.getElementById('record')
var record = document.createElement('li')


timer.textContent = "Time: "
title.appendChild(timer)


var record = document.createElement("li")

var time_num = 0
var reset_flag =0
var start;
var hint_flag =0
var guess_times = 0
var now


function reset(){

    answer = Math.floor(Math.random() * 101);
    console.log(answer);


    count = 0
    time_num = 0
    console.log(time_num)
    timer.textContent = "Time: "+time_num
    reset_flag = 1
<<<<<<< HEAD:HW5_Javascript2/static/113409537_js_3.js
=======
    clearInterval(start)
>>>>>>> 4245107aa7405531df075d82f125619af75d45da:HW5_Javascript2/static/113409537_js_1.js
    hint_flag = 0


}
function counting_time(){
    time_num++;
    console.log(time_num)

    if(reset_flag ==1){
        time_num = 0;
        console.log(time_num)
        timer.textContent = "Time: "+time_num
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
        var now = new Date()
        time = now.toLocaleTimeString()
        count= count+1;
<<<<<<< HEAD:HW5_Javascript2/static/113409537_js_3.js
        countingtimes++

        record = document.createElement("li")
        record.textContent = countingtimes+'. '+"guess "+count+" times and spent "+time_num+" secs "+time
        container.appendChild(record)

        alert("Correct, U have try "+count+" times and u spent "+time_num+" secs." )

=======
        guess_times++;
        now = new Date()
        now = now.toLocaleTimeString()

        alert("Correct, U have try "+count+" times and spent "+time_num+"secs." )

        record = document.createElement('li')
        record.textContent = guess_times+'. U have try '+count+" times and spend "+time_num+"secs."+now
        guess_record.appendChild(record)
        time_num=0
>>>>>>> 4245107aa7405531df075d82f125619af75d45da:HW5_Javascript2/static/113409537_js_1.js

        reset()

        
    }



}



