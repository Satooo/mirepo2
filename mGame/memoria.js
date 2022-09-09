const noContent=document.getElementById("no-content");
const create= document.getElementById("create");
let rowButton = document.getElementById("rowButton");
let colButton = document.getElementById("colButton");
let numRowText=document.getElementById("rText");
let numColText=document.getElementById("cText");
let numEmoji =document.getElementById("numEmoji");
let container = document.getElementById("matrix");
let reload = document.getElementById("reload");
let reloadButton = document.getElementById("reloadButton");
let timer = document.getElementById("timer");
let chosenEmoji;
let createMenu = document.getElementById("createMenu");
let gameMenu = document.getElementById("gameMenu");
let foundThem= document.getElementById("foundThem");
let findEmoji =document.getElementById("findEmoji");
let submit = document.getElementById("submitAnswer");
const emojis = ["&#128011;","&#128013;","&#128033;"];
let matrix=[];
let finishedGame=0;
let seconds=5;
let total_points=0;
let partial_points=0;
let total_buttons=0;
let row=0;
let col=0;

r3.addEventListener("click",()=>{
  r3.style.backgroundColor="lightGray";
  row=3;
  r4.style.backgroundColor="#f0f0f0";
  r5.style.backgroundColor="#f0f0f0";
});
r4.addEventListener("click",()=>{
  r4.style.backgroundColor="lightGray";
  row=4;
  r5.style.backgroundColor="#f0f0f0";
  r3.style.backgroundColor="#f0f0f0";
});
r5.addEventListener("click",()=>{
  r5.style.backgroundColor="lightGray";
  row=5;
  r3.style.backgroundColor="#f0f0f0";
  r4.style.backgroundColor="#f0f0f0";
});
c3.addEventListener("click",()=>{
  c3.style.backgroundColor="lightGray";
  col=3;
  c4.style.backgroundColor="#f0f0f0";
  c5.style.backgroundColor="#f0f0f0";
});
c4.addEventListener("click",()=>{
  c4.style.backgroundColor="lightGray";
  col=4;
  c5.style.backgroundColor="#f0f0f0";
  c3.style.backgroundColor="#f0f0f0";
});
c5.addEventListener("click",()=>{
  c5.style.backgroundColor="lightGray";
  col=5;
  c3.style.backgroundColor="#f0f0f0";
  c4.style.backgroundColor="#f0f0f0";
});

function createBoard(numRows, numCols){
    let numId=0;
    for(let i=0;i<numRows;i++){
      let row = document.createElement("div");
      row.className="row mb-3 flex-nowrap";
      for(let j=0;j<numCols;j++){
        tempRow=row;
        let col = document.createElement("div");
        col.className="col";
        
        let lion = document.createElement("button");
        lion.className="bg-warning rounded me-3 mb-3 fs-2 w-100 h-100 border border-2 border-dark";
        
        numId++;
        lion.setAttribute("id",numId);
        lion.innerHTML="&#129409;";

        col.appendChild(lion.cloneNode(true));
        tempRow.appendChild(col.cloneNode(true));
      }
      container.appendChild(tempRow.cloneNode(true));
      
    }
}

create.addEventListener("click",()=>{
    noContent.style.display="none";
    if(row<=0 || col<=0){
      row=4;
      col=4;
    }
    createBoard(row,col);
    total_buttons = row*col;
    for(let i=1;i<=total_buttons;i++){
      randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
      document.getElementById(i).innerHTML=emojis[randPos];
      matrix.push(emojis[randPos]);
    }
    
    timer.style.display="flex";
    let timeLeft = setInterval(()=>{
      timer.textContent=seconds;
      seconds--;
    },900);
    
    seconds=5;

    setTimeout(()=>{
      randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
      chosenEmoji=emojis[randPos];
      findEmoji.innerHTML=chosenEmoji;
      timer.style.display="none";
      clearInterval(timeLeft);
      foundThem.style.display="flex";
      
      for(let i=1;i<=total_buttons;i++){
        if(matrix[i-1]==chosenEmoji){
          total_points++;
        }
        document.getElementById(i).innerHTML="&#129409;";
        document.getElementById(i).addEventListener("click",()=>{
          if(document.getElementById(i).style.filter!="brightness(75%)"){
          document.getElementById(i).style.filter="brightness(75%)"; 
          document.getElementById(i).innerHTML="&#128520;";
          if(matrix[i-1]==chosenEmoji){
            partial_points++;
          }
          }else{
            document.getElementById(i).style.filter="brightness(100%)";
            document.getElementById(i).className="bg-warning rounded me-3 mb-3 fs-2 w-100 h-100";
            document.getElementById(i).textContent="";
            document.getElementById(i).innerHTML="&#129409;";
            if(matrix[i-1]==chosenEmoji){
            partial_points--;
          }
          }
          });
      }
      numEmoji.textContent="There's "+total_points+ " emojis like this among the cards.";
    },5000);
    
    createMenu.style.display="none";
    gameMenu.style.display="flex";
    
    

});

submit.addEventListener("click",()=>{
  if(finishedGame!=1){
    alert("You got "+partial_points+"/"+total_points);
    numEmoji.textContent="These were your emojis, you got "+partial_points+"/"+total_points+" of them";
    for(let i=1;i<=total_buttons;i++){
      document.getElementById(i).innerHTML=matrix[i-1];
    }
  }
  finishedGame=1;
  reload.style.display="flex";

});

reloadButton.addEventListener("click",()=>{
  numEmoji.textContent="Remember the position of the emojis";
  total_points=0;
  partial_points=0;
  findEmoji.innerHTML="&#10067;";
  finishedGame=0;
  foundThem.style.display="none";
  reload.style.display="none";
  for(let i=1;i<=total_buttons;i++){
      randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
      document.getElementById(i).innerHTML=emojis[randPos];
      document.getElementById(i).style.filter="brightness(100%)";
    document.getElementById(i).className="bg-warning rounded me-3 mb-3 fs-2 w-100 h-100";
      matrix[i-1]=(emojis[randPos]);
    }
  
  seconds=5;
  timer.textContent=seconds;
  timer.style.display="flex";
  let timeLeft = setInterval(()=>{
      timer.textContent=seconds;
      seconds--;
    },900);
  setTimeout(()=>{
    randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
    chosenEmoji=emojis[randPos];
    findEmoji.innerHTML=chosenEmoji;
    timer.style.display="none";
    clearInterval(timeLeft);
    foundThem.style.display="flex";
      
      for(let i=1;i<=total_buttons;i++){
        if(matrix[i-1]==chosenEmoji){
          total_points++;
        }
        document.getElementById(i).innerHTML="&#129409;";
      }numEmoji.textContent="There's "+total_points+ " emojis like this among the cards.";
    },5000);

});



function fadeOutEffect(id) {
  var fadeEffect = setInterval(function () {
      if (!id.style.opacity) {
          id.style.opacity = 1;
      }
      if (id.style.opacity > 0) {
          id.style.opacity -= 0.1;
      } else {
          clearInterval(fadeEffect);
      }
  }, 50);
}
function 
fadeInEffect(id) {
var opacity = 0;
var intervalID = setInterval(function() {

if (opacity < 1) {
  opacity = opacity + 0.1
  id.style.opacity = opacity;
} else {
  clearInterval(intervalID);
}
  }, 50);
      }

