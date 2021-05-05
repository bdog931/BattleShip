var friendlyGrid = document.getElementById('friendlyBoard');
var enemyGrid = document.getElementById('enemyBoard');
let inGame = false;
let yourTurn = false;

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

function placeShip(whichBoard, xpos, ypos, remainingToBePlaced, id){
    console.log("placing ship " + id + " at " + xpos + "  " + ypos + " with " + remainingToBePlaced + " remaining to be placed");
    //Check boundary
    if(xpos < 0 || xpos > 7 || ypos < 0 || ypos > 7 || remainingToBePlaced < 1){
        return false;
    }
    //Say we've arrived at a taken tile
    if(whichBoard[xpos][ypos] === true){
        return false;
    }
    //This position is untaken, and there are no remaining tiles to be placed
    if(whichBoard[xpos][ypos] == false && remainingToBePlaced == 1){
        whichBoard[xpos][ypos] = id;
        return true;
    }
    //If it may be placed up along the x axis
    if(placeShip(whichBoard, xpos + 1, ypos, remainingToBePlaced - 1, id)){
        whichBoard[xpos][ypos] = id;
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
        
        if(placeShip(grid, x, y, ship, i.toString())) {
            placed = true;
        }
        }
    })
    return true;
}

    //Let it be players turn
    //If player hit, mark it and proclaim it -- contrariwise contrarily
    //If player wins, send them to the menu


// Initalize Enemy Board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        var gridPiece = document.createElement("DIV");
        gridPiece.className = 'gridPiece';
        gridPiece.id = `enemy${(i*8) + j}`
        
        gridPiece.addEventListener('click', function(event) {
            if(inGame == false){
                return;
            }
            var relevantPiece = document.getElementById(`enemy${(i*8) + j}`)
            if (enemyGridShips[i][j]) { relevantPiece.style.backgroundColor = '#DC143C'  } //carmine
            else { relevantPiece.style.backgroundColor = 'white' }
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

document.getElementById("startGame").addEventListener("click", function(){
    document.getElementById("startGame").disabled = true;
    document.getElementById("endGame").disabled = false;
    yourTurn = true;
    document.getElementById("randomlyPlaceShips").disabled = true; 
    inGame = true;
    return
})

document.getElementById("endGame").addEventListener("click", function(){
    document.getElementById("randomlyPlaceShips").disabled = false;
    document.getElementById("endGame").disabled = true; 
    inGame = false;
    return
})

generateShips(enemyGridShips);

function displayShips(){
    for(let i =0; i< 8; i++){
        for(let j =0; j< 8; j++){
            var relevantPiece = document.getElementById(`friendly${(i*8) + j}`)
            if(friendlyGridShips[i][j] == true){
                relevantPiece.style.backgroundColor = '#3987c9';
            }
            else { relevantPiece.style.backgroundColor = 'white'; } 
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


