
document.write(
    '<input type="text" name="A" id="input"><br>'
)
for(var i=0; i<=9; i++){
{
    if(i%3==0){
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
