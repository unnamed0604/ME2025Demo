var checkboxes = document.querySelectorAll('.checkItem')
var checkallbox = document.getElementById("checkall")

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

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const allChecked = Array.from(checkboxes).every(item => item.checked);
        checkallbox.checked = allChecked;
    });
});
