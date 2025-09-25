const answer = Math.floor(Math.random() * 101);
console.log(answer);
var correct = 0;
var count = 1

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
        alert("Correct, U have try"+count+"times." )
        count = 1
    }
}
