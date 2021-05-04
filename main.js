var friendlyGrid = document.getElementById('friendlyBoard');
var enemyGrid = document.getElementById('enemyBoard');

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

function checkVertically(whichBoard, xpos, ypos, remainingToBePlaced){
    //Check boundary
    if(xpos < 0 || xpos > 7 || ypos < 0 || ypos > 7){
        return false;
    }
     //Say we've arrived at a taken tile
     if(whichBoard[xpos][ypos] == true){
        return false;
    }
    if(whichBoard[xpos][ypos] == false && remainingToBePlaced == 0){
        whichBoard[xpos][ypos] = true;
        return true;
    }
    if(checkVertically(whichBoard, xpos + 1, ypos, remainingToBePlaced - 1)){
        whichBoard[xpos][ypos] = true;
        return true;
    }
    if(checkVertically(whichBoard, xpos - 1, ypos, remainingToBePlaced - 1) == true){
        whichBoard[xpos][ypos] = true;
        return true;
    }
}

function placeShip(whichBoard, xpos, ypos, remainingToBePlaced, id){
    //Check boundary
    if(xpos < 0 || xpos > 7 || ypos < 0 || ypos > 7 || remainingToBePlaced < 0){
        return false;
    }
    //Say we've arrived at a taken tile
    if(whichBoard[xpos][ypos] == true){
        return false;
    }
    if(whichBoard[xpos][ypos] == false && remainingToBePlaced == 0){
        whichBoard[xpos][ypos] = id;
        return true;
    }
    if(placeShip(whichBoard, xpos + 1, ypos, remainingToBePlaced - 1, id)){
        whichBoard[xpos][ypos] = id;
        return true;
    }
    if(placeShip(whichBoard, xpos - 1, ypos, remainingToBePlaced - 1, id)){
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
}

generateShips(friendlyGridShips);
generateShips(enemyGridShips);

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if (Math.floor(Math.random() * 10) < 2) { enemyGridShips[i][j] = true }
    }
}

// Initalize Enemy Board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        var gridPiece = document.createElement("DIV");
        gridPiece.className = 'gridPiece';
        gridPiece.id = `enemy${(i*8) + j}`
        
        gridPiece.addEventListener('click', function(event) {
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
