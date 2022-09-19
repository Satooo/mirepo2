
// [ [ { seMuestra : false, emoji : "112312312" } , {...}], [{...}, {...}] , [{...}, {...}]  ]

let board; // global
let numSelected=0;
let firstCasilla;
let totalCasilla;


let victory=0;
let cardIndex=0;

let titulo=document.getElementById("titulo");

function createBoard(numRows, numCols) {
    const rows = []
    totalCasilla=numRows*numCols;
    cards=shuffleCards();
    for (let i = 0; i < numRows; i++) {
        const casillas = []

        // crear casillas
        for (let j = 0; j < numCols; j++) {
            casillas.push({
                seMuestra : false,
                emoji :cards[cardIndex],
                match: false
            })
            cardIndex++;
        }

        rows.push(casillas)
    }

    return rows
}
function mostrarCards(board){
    for(let i=0;i<6;i++){
        for(let j=0;j<4;j++){
            board[i][j].seMuestra = true;
        }
    }
    renderizarBoard(board);
    setTimeout(
        ()=>{
            for(let i=0;i<6;i++){
                for(let j=0;j<4;j++){
                    board[i][j].seMuestra = false;
                }
            }
            renderizarBoard(board)
        },2000
    );
}

function shuffleCards(){
    let cards = ["&#x1F354;","&#x1F354;","&#x1F354;","&#x1F354;","&#x1F354;","&#x1F354;","&#x1F354;","&#x1F354;",
    "&#x1F370;","&#x1F370;","&#x1F370;","&#x1F370;","&#x1F370;","&#x1F370;","&#x1F370;","&#x1F370;",
    "&#129409;","&#129409;","&#129409;","&#129409;","&#129409;","&#129409;","&#129409;","&#129409;"];
    let shuffled = cards.sort(() => Math.random() - 0.5);

    return shuffled;
    
}

function printBoard(board) {
    for (let row of board) {
        let rowStr = ""
        for (let casilla of row) {
            rowStr = rowStr + casilla + " "
        }
        console.log(rowStr)
    }
}

function setValue(board, row, col, value) {
    board[row][col] = value
}

//function getValue(board, row, col) {
const getValue = (board, row, col) => {
    return board[row][col]
}

const renderizarBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
        const casillas = board[i]
        for (let j=0; j < casillas.length; j++) {
            const butCasilla = document.getElementById(`${i}_${j}`) // string interpolation
            if (casillas[j].seMuestra || casillas[j].match) {
                butCasilla.innerHTML = casillas[j].emoji
            }else {
                butCasilla.innerHTML = ""
            }
            
        }
    }
}

const casillaOnClick = (row, col) => {
    if(numSelected<2){
        console.log(numSelected);
    const casilla = getValue(board, row, col)
    casilla.seMuestra = true
    renderizarBoard(board)
    numSelected++
    if (numSelected==1){
        firstCasilla=casilla;
    }
    if(numSelected==2){
        if(firstCasilla.emoji==casilla.emoji){
            firstCasilla.match=true;
            casilla.match=true;
            victory++;
        }
        setTimeout(()=>{
            firstCasilla.seMuestra=false;
            casilla.seMuestra=false;
            numSelected=0;
            renderizarBoard(board)
            if(victory==12){
                console.log("gano");
                titulo.innerHTML="Memoria Game <b>You won!</b>"
            }
        },1000);
        
    }
    }
    
    
}

const main = () => {
    board = createBoard(6, 4) 
    renderizarBoard(board)
    mostrarCards(board)

}

main()











