// JavaScript source code
//SOUNDS

const clearNoise = new Audio("ice_cubes.wav")
const clicky = new Audio("clicky_noise.wav")
const plunk = new Audio("plunk.wav")
const boom = new Audio("boom.wav")
const winner = new Audio("winner.wav")

let MUTEBUTTON = null;



function mute() {

    if (MUTEBUTTON == null) {
        MUTEBUTTON = document.getElementById("mute")
    }
    
    let current = MUTEBUTTON.getAttribute('value')
    if (current == 'ON') {
        window.localStorage.setItem('sound', 'OFF')
        clearNoise.volume = 0
        clicky.volume = 0
        plunk.volume = 0
        boom.volume = 0
        winner.volume = 0
        MUTEBUTTON.setAttribute('value', 'OFF')
        MUTEBUTTON.innerHTML = '<i class="fas fa-volume-mute fa-3x"></i>SOUND OFF'
            
    }
    else {
        window.localStorage.setItem('sound', 'ON')
        clearNoise.volume = (1)
        clicky.volume = (0.8)
        plunk.volume = (0.5)
        boom.volume = (0.5)
        winner.volume = (0.5)
        MUTEBUTTON.setAttribute('value', 'ON')
        MUTEBUTTON.innerHTML = '<i class="fas fa-volume-up fa-3x"></i>SOUND ON'

    }
    
}



