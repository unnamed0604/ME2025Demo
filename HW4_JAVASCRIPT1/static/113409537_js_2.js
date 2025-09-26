
document.write(
    '<input type="text" name="A" id="input"><br>'
)
for(var i=0; i<=9; i++){
{
    if((i+1)%3==0){
        document.write(
        '<button onclick="document.getElementById(\'input\').value +=\''+i+'\'">'+i+'</button><br>'
        )

    }
    else{
            document.write(
    '<button onclick="document.getElementById(\'input\').value +=\''+i+'\'">'+i+'</button>' 
        )

    }
}
}
document.write(
   '<button onclick="Clear()">Clear</button><br>'

)
function Clear(){
   document.getElementById('input').value =" "

}


document.write(
   '<button onclick="Plus()">+</button>'
)
function Plus(){
   document.getElementById('input').value +="+"
}


document.write(
   '<button onclick="Sub()">-</button>'
)
function Sub(){
   document.getElementById('input').value +="-"
}


document.write(
   '<button onclick="Mul()">*</button>'
)
function Mul(){
   document.getElementById('input').value +="*"
}


document.write(
   '<button onclick="Div()">/</button>'
)
function Div(){
   document.getElementById('input').value +="/"
}


document.write(
   '<button onclick="left()">(</button>'
)
function left(){
   document.getElementById('input').value +="("
}


document.write(
   '<button onclick="right()">)</button>'
)
function right(){
   document.getElementById('input').value +=")"
}

document.write(
   '<button onclick="equal()">=</button>'
)
function equal(){
   let equation = eval(document.getElementById('input').value)
   alert(document.getElementById("input").value + "=" + equation)

}




