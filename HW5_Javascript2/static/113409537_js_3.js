var answer = Math.floor(Math.random() * 101);
console.log(answer);
var count = 0;

let title = document.getElementById('title')

var time_num = 0

var reset_flag =0

var start;



function reset(){

    answer = Math.floor(Math.random() * 101);
    console.log(answer);

    count = 0
    clearInterval(start)
    reset_flag = 1
    start = setInterval(counting_time, 1000)


}
function counting_time(){
    time_num++;
    console.log(time_num)
    if(reset_flag ==1){
        time_num = 0;
        reset_flag=0
    }
}



function guess(){

    let input_num = document.forms['Guessnum']['Guess'].value;
    
    
    

    console.log(input_num);

    if(input_num > answer){

        let new_element = document.createElement('h3')
        new_element.id="hint"
        new_element.textContent = 'The number is so big';
        title.appendChild(new_element)

        count = count+1;
        start = setInterval(counting_time, 1000)
    }
    else if( input_num < answer){
        alert("So small");
        count = count+1;
        start = setInterval(counting_time, 1000)
    }
    else{
        count= count+1;

        alert("Correct, U have try "+count+" times." )

        reset()

        
    }



}



