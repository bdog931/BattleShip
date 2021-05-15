var friendlyGrid = document.getElementById('friendlyBoard');
var enemyGrid = document.getElementById('enemyBoard');
let inGame = false;
let yourTurn = false;

let friendlyTilesUnHit = 17;
let enemyTilesUnHit = 17;

var enemyGridShips = [
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
];

var friendlyGridShips = [
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
    [ false, false, false, false, false, false, false, false ],
];

function placeShipHorizontally(whichBoard, xpos, ypos, remainingToBePlaced, id){
    console.log("placing ship " + id + " at " + xpos + "  " + ypos + " with " + remainingToBePlaced + " remaining to be placed");
    //Check boundary
    if(xpos < 0 || xpos > 7 || ypos < 0 || ypos > 7 || remainingToBePlaced < 1){
        return false;
    }
    //Say we've arrived at a taken tile
    if(whichBoard[xpos][ypos] != false){
        return false;
    }
    //This position is untaken, and there are no remaining tiles to be placed
    if(whichBoard[xpos][ypos] == false && remainingToBePlaced == 1){
        whichBoard[xpos][ypos] = id + 1;
        return true;
    }
    //If it may be placed up along the x axis
    if(placeShipHorizontally(whichBoard, xpos, ypos + 1, remainingToBePlaced - 1, id)){
        whichBoard[xpos][ypos] = id + 1;
        return true;
    }
}

function placeShipVertically(whichBoard, xpos, ypos, remainingToBePlaced, id){
    console.log("placing ship " + id + " at " + xpos + "  " + ypos + " with " + remainingToBePlaced + " remaining to be placed");
    //Check boundary
    if(xpos < 0 || xpos > 7 || ypos < 0 || ypos > 7 || remainingToBePlaced < 1){
        return false;
    }
    //Say we've arrived at a taken tile
    if(whichBoard[xpos][ypos] != false){
        return false;
    }
    //This position is untaken, and there are no remaining tiles to be placed
    if(whichBoard[xpos][ypos] == false && remainingToBePlaced == 1){
        whichBoard[xpos][ypos] = id + 1;
        return true;
    }
    //If it may be placed up along the x axis
    if(placeShipVertically(whichBoard, xpos + 1, ypos, remainingToBePlaced - 1, id)){
        whichBoard[xpos][ypos] = id + 1;
        return true;
    }
}

function generateShips(grid) {
    ships = [ 2, 3, 3, 4, 5 ]

    ships.forEach((ship, i) => {
        let placed = false;
        while(placed == false) {
        const x = Math.floor(Math.random() * 8)
        const y = Math.floor(Math.random() * 8)
        
        letVerticallyOrHorizontallyPlaceShips = Math.random();
        
        console.log("V or H is " + letVerticallyOrHorizontallyPlaceShips);

        if(letVerticallyOrHorizontallyPlaceShips <= .5){
            if(placeShipVertically(grid, x, y, ship, i.toString())) {
                placed = true;
            }
        }
        if(letVerticallyOrHorizontallyPlaceShips > .5){
            if(placeShipHorizontally(grid, x, y, ship, i.toString())) {
                placed = true;
            }
        }


        }
    })
    return true;
}

// Initalize Enemy Board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        var gridPiece = document.createElement("DIV");
        gridPiece.className = 'gridPiece';
        gridPiece.id = `enemy${(i*8) + j}`
        gridPiece.addEventListener('click', function(event) {
            playerFire(i, j);
          })

        enemyGrid.appendChild(gridPiece); 
    }
}

// Initalize Friendly Board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        var gridPiece = document.createElement("DIV");
        gridPiece.className = 'gridPiece';
        gridPiece.id = `friendly${(i*8) + j}`;
        if (friendlyGridShips[i][j]) {
            gridPiece.style.backgroundColor = '#fff'
        }
        gridPiece.addEventListener('click', function(event) {
            if(inGame == false){
                return;
            }
            var relevantPiece = document.getElementById(`friendly${(i*8) + j}`)
            if (friendlyGridShips[i][j]) {
                relevantPiece.style.backgroundColor = '#DC143C'
                console.log('The clicked ship was #', friendlyGridShips[i][j])
            } 
            else { relevantPiece.style.backgroundColor = 'white' } 
          })
        friendlyGrid.appendChild(gridPiece); 
    }
}

function resetDisplay(){
    for(let i=0; i<8;i++){
        for(let j=0;j<8;j++){
            var relevantPiece = document.getElementById(`friendly${(i*8) + j}`);
            var relevantPieceOnEnemey = document.getElementById(`enemy${(i*8) + j}`);
            relevantPiece.style.backgroundColor = "#585858";
            relevantPieceOnEnemey.style.backgroundColor = "#585858";
        }
    }
}

document.getElementById("startGame").addEventListener("click", function(){
    document.getElementById("startGame").disabled = true;
    document.getElementById("endGame").disabled = false;
    yourTurn = true;
    document.getElementById("randomlyPlaceShips").disabled = true; 
    inGame = true;
    return
})

function clearBotMemory(){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            botMemory[i][j] == false;
        }
    }
}

function clearPlayerMemory(){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            playerMemory[i][j] == false;
        }
    }
}

function endGame(){
    document.getElementById("randomlyPlaceShips").disabled = false;
    document.getElementById("endGame").disabled = true; 
    clearBotMemory();
    clearPlayerMemory();
    friendlyTilesUnHit = 17;
    enemyTilesUnHit = 17;
    resetDisplay();
    inGame = false;
}

document.getElementById("endGame").addEventListener("click", function(){
    document.getElementById("randomlyPlaceShips").disabled = false;
    document.getElementById("endGame").disabled = true; 
    resetDisplay();
    inGame = false;
    return
})

generateShips(enemyGridShips);

function displayShips(){
    for(let i =0; i< 8; i++){
        for(let j =0; j< 8; j++){
            var relevantPiece = document.getElementById(`friendly${(i*8) + j}`)
            if(friendlyGridShips[i][j] != false){
                relevantPiece.style.backgroundColor = '#3987c9';
            }
            else { relevantPiece.style.backgroundColor = '#585858'; } 
        }
    }
}

function clearShips(whichBoard){
    for(let i =0; i< 8; i++){
        for(let j = 0; j< 8; j++){
            whichBoard[i][j] = false;
        }
    }
}

document.getElementById("randomlyPlaceShips").addEventListener("click", function(){
    document.getElementById("startGame").disabled = false;
    clearShips(friendlyGridShips);
    generateShips(friendlyGridShips);
    setTimeout(() => {
        displayShips();
        console.log('displayShips')
    }, 250)
})

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

var playerMemory = [
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
    const xpos = Math.floor(Math.random() * 8);
    const ypos = Math.floor(Math.random() * 8);
    //Checks to see if he's shot here before -- if he has, he randomly guesses until he hasn't shot there, then he returns that
    if(botMemory[xpos][ypos] == true){
        return(randomFire());
    }
    console.log(xpos + "  " + ypos);
    return([xpos, ypos]);
}

function checkWinCondition(){
    if(friendlyTilesUnHit == 0){
        alert("You lose");
        endGame();
        return true;
    }
    if(enemyTilesUnHit == 0){
        alert("You win");
        endGame();
        return true;
    }
}

function playerFire(i, j){
    if(inGame == false && yourTurn == false ){
        return;
    }
    if(playerMemory[i][j] == true){
        return;
    }
    var relevantPiece = document.getElementById(`enemy${(i*8) + j}`)
    if (enemyGridShips[i][j]){ 
        relevantPiece.style.backgroundColor = '#DC143C'; //carmine
        enemyTilesUnHit = enemyTilesUnHit - 1;
        playerMemory[i][j] = true;
     } 
    else { 
        relevantPiece.style.backgroundColor = 'black';
        playerMemory[i][j] = true;
    }
    if(checkWinCondition()){
        return;
    }
    yourTurn = false;
    let positions = randomFire();
    let x = positions[0];
    let y = positions[1];
    botMemory[x][y] = true;
    if(friendlyGridShips[x][y] != false){
        document.getElementById(`friendly${(x*8) + y}`).style.backgroundColor = '#DC143C';
        friendlyTilesUnHit = friendlyTilesUnHit - 1;
    }
    else{
        document.getElementById(`friendly${(x*8) + y}`).style.backgroundColor = 'black';
    }
    checkWinCondition();
}



