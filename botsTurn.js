//Somehow keep track of which tiles have been previously guessed at
var botMemory = [
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
];

//Firing Mechanism
function randomFire(){
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);
    //Checks to see if he's shot here before -- if he has, he randomly guesses until he hasn't shot there, then he returns that
    if(botMemory[xpos][ypos] == true){
        return(randomFire());
    }
    return(xpos, ypos);
}