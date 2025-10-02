
const answer = Math.floor(Math.random() * 101);
console.log(answer);
var count = 0;

let time_num = 0
function counting_time(){
    time_num++;
    console.log(time_num)
}


function guess(){

    let input_num = document.forms['Guessnum']['Guess'].value;
    

    console.log(input_num);
    if(input_num > answer){
        alert("So big");
        count = count+1;
    }
    else if( input_num < answer){
        alert("So small");
        count = count+1;
    }
    else{
        count= count+1;

        alert("Correct, U have try "+count+" times." )
        
        const answer = Math.floor(Math.random() * 101);
        console.log(answer);

        count = 1
        let start = setInterval(counting_time, 1000)
    }
}



