// JavaScript source code

function hideshowOptions() {
    let BURG = document.getElementById('hamburg')
    let OPTIONS = document.getElementById('GAMEOPTIONS')
    let value = BURG.getAttribute('value')
    console.log(OPTIONS)
    console.log('value=', value)
    if (value == 'open') {
        OPTIONS.style.display = 'none'
        BURG.setAttribute('value', 'closed')
    }
    else if (value == 'closed') {
        OPTIONS.style.display = 'flex'
        BURG.setAttribute('value', 'open')
    }
    else {
        message = `Unexpected click handling in get_set_BURG(). value = ${value}`
    }
    console.log("hamburg clicked.")

}
function getSetBurg() {
    let BURG = document.getElementById('hamburg')
    BURG.addEventListener('click', hideshowOptions);
}
