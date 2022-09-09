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
const decoration = ["&#127921;","&#127881;","&#127880;"];
let matrix=[];
let finishedGame=0;
let seconds=5;
let total_points=0;
let partial_points=0;
let total_buttons=0;
let row=0;
let col=0;
let selectedCards=0;
let points=0;
let wait=0;
let rounds=0;

let card1={
  emoji:"",
  position:0,
  enabled:true
};
let card2={
  emoji:"",
  position:0,
  enabled:true
};
r3.addEventListener("click",()=>{
  r3.style.backgroundColor="lightGray";
  row=2;
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
  row=6;
  r3.style.backgroundColor="#f0f0f0";
  r4.style.backgroundColor="#f0f0f0";
});
c3.addEventListener("click",()=>{
  c3.style.backgroundColor="lightGray";
  col=2;
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
  col=6;
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
    timer.style.display="none";
    noContent.style.display="none";
    if(row<=0 || col<=0){
      row=4;
      col=4;
    }
    createBoard(row,col);
    total_buttons = row*col;
    numCardsAvailable=total_buttons;
    let cantEmoji1=0;
    let cantEmoji2=0;
    let cantEmoji3=0;
    if(total_buttons==4){
      while(cantEmoji1<2 || cantEmoji2<2){
        cantEmoji1=0;
        cantEmoji2=0;
        matrix=[];
        for(let i=1;i<=total_buttons;i++){
          randPos = Math.floor(Math.random() * (1 - 0 + 1) ) + 0;
          matrix.push(emojis[randPos]);
          if(randPos==0){
            cantEmoji1++;
          }
          if(randPos==1){
            cantEmoji2++;
          }
        }
      }
    }else{
      while((cantEmoji1%2!=0) || (cantEmoji2%2!=0) || (cantEmoji3%2!=0) || cantEmoji1==0 || cantEmoji2==0 ||cantEmoji3==0){
        cantEmoji1=0;
        cantEmoji2=0;
        cantEmoji3=0;
        matrix=[];
        for(let i=1;i<=total_buttons;i++){
          randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
          matrix.push(emojis[randPos]);
          if(randPos==0){
            cantEmoji1++;
          }
          if(randPos==1){
            cantEmoji2++;
          }
          if(randPos==2){
            cantEmoji3++;
          }
        }
      }
    }

    

 
      randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
      chosenEmoji=decoration[randPos];
      findEmoji.innerHTML=chosenEmoji;
      foundThem.style.display="none";
      createMenu.style.display="none";
      
      for(let i=1;i<=total_buttons;i++){
        document.getElementById(i).innerHTML="&#129409;";
        document.getElementById(i).addEventListener("click",()=>{
          if(selectedCards<2 && document.getElementById(i).className!="bg-success rounded me-3 mb-3 fs-2 w-100 h-100" && document.getElementById(i).className!="bg-danger rounded me-3 mb-3 fs-2 w-100 h-100"){
            document.getElementById(i).style.filter="brightness(75%)";
            if(selectedCards==0){
              document.getElementById(i).innerHTML=matrix[i-1];
              card1.emoji=matrix[i-1];
              card1.position=i;
              selectedCards++;
            }else if(selectedCards==1 && card1.position!=i){
              document.getElementById(i).innerHTML=matrix[i-1];
              card2.emoji=matrix[i-1];
              card2.position=i;
              if(card1.emoji==card2.emoji){
                points++;
                rounds++;
                numEmoji.innerHTML="&#127881; Match &#127881;";
                document.getElementById(card1.position).style.filter="brightness(100%)";
                document.getElementById(card1.position).className="bg-success rounded me-3 mb-3 fs-2 w-100 h-100";
                document.getElementById(card2.position).style.filter="brightness(100%)";
                document.getElementById(card2.position).className="bg-success rounded me-3 mb-3 fs-2 w-100 h-100";
                if(points*2==total_buttons){
                  finishedGame=1;
                  numEmoji.innerHTML="&#127942; You won 	&#127942; ";
                  findEmoji.innerHTML="&#127948;";
                }
                if(finishedGame==0){
                setTimeout(()=>{numEmoji.innerHTML="Rounds &#128377;: "+rounds+" & Points &#129354;: "+points;},1500);
                }
                
              }else if(selectedCards==1 && card1.emoji!=card2.emoji){
                rounds++;
                document.getElementById(i).innerHTML=matrix[i-1];
                numEmoji.innerHTML="&#128148; Oops, no match! &#128148;";
                setTimeout(()=>{numEmoji.innerHTML="Shuffling the cards..";},900);
                wait=1;
                setTimeout(()=>{
                document.getElementById(card1.position).innerHTML="&#129409;";
                document.getElementById(card1.position).style.filter="brightness(100%)";
                document.getElementById(card1.position).className="bg-warning rounded me-3 mb-3 fs-2 w-100 h-100";
                document.getElementById(card2.position).innerHTML="&#129409;";
                document.getElementById(card2.position).style.filter="brightness(100%)";
                document.getElementById(card2.position).className="bg-warning rounded me-3 mb-3 fs-2 w-100 h-100";
                document.getElementById(card2.position).innerHTML="&#129409;";
                if(total_buttons==4){
                  randPos = Math.floor(Math.random() * (1 - 0 + 1) ) + 0;
                  matrix[card1.position-1]=emojis[randPos];
                  randPos = Math.floor(Math.random() * (1 - 0 + 1) ) + 0;
                  matrix[card1.position-1]=emojis[randPos];
                }else{
                  randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
                  matrix[card1.position-1]=emojis[randPos];
                  randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
                  matrix[card1.position-1]=emojis[randPos];

                }
                numEmoji.innerHTML="Rounds &#128377;: "+rounds+" & Points &#129354;: "+points;
                wait=0;
                selectedCards=0;
                card1.emoji="";
                card1.position=0;
                card2.emoji="";
                card2.position=0;
                },1500);
              }
              selectedCards++;
            }else if(selectedCards==1 && card1.position==i){
              document.getElementById(card1.position).innerHTML="&#129409;";
              document.getElementById(i).style.filter="brightness(100%)";
              card1.emoji="";
              card1.position=0;
              card2.emoji="";
              card2.position=0;
              selectedCards=0;
            }
            
            
            if(selectedCards==2 && wait==0){
              selectedCards=0;
              card1.emoji="";
              card1.position=0;
              card2.emoji="";
              card2.position=0;
            }
            if(finishedGame==1){
              numEmoji.innerHTML="&#127942; You won 	&#127942; ";
            }
            
              
          }
      });
      }
      
    gameMenu.style.display="flex";
    reload.style.display="flex";
    
    

});



reloadButton.addEventListener("click",()=>{
  matrix=[];
  finishedGame=0;
  let cantEmoji1=0;
  let cantEmoji2=0;
  let cantEmoji3=0;
  points=0;
  rounds=0;
  wait=0;
  numEmoji.innerHTML="Rounds &#128377;: "+rounds+" & Points &#129354;: "+points;
  if(total_buttons==4){
    while(cantEmoji1<2 || cantEmoji2<2){
      cantEmoji1=0;
      cantEmoji2=0;
      matrix=[];
      for(let i=1;i<=total_buttons;i++){
        randPos = Math.floor(Math.random() * (1 - 0 + 1) ) + 0;
        matrix.push(emojis[randPos]);
        if(randPos==0){
          cantEmoji1++;
        }
        if(randPos==1){
          cantEmoji2++;
        }
      }
    }
  }else{
    while((cantEmoji1%2!=0) || (cantEmoji2%2!=0) || (cantEmoji3%2!=0) || cantEmoji1==0 || cantEmoji2==0 ||cantEmoji3==0){
      cantEmoji1=0;
      cantEmoji2=0;
      cantEmoji3=0;
      matrix=[];
      for(let i=1;i<=total_buttons;i++){
        randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
        matrix.push(emojis[randPos]);
        if(randPos==0){
          cantEmoji1++;
        }
        if(randPos==1){
          cantEmoji2++;
        }
        if(randPos==2){
          cantEmoji3++;
        }
      }
    }
  }
  randPos = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
  chosenEmoji=decoration[randPos];
  findEmoji.innerHTML=chosenEmoji;
  foundThem.style.display="none";
  for(let i=1;i<=total_buttons;i++){
    document.getElementById(i).innerHTML="&#129409;";
    document.getElementById(i).className="bg-warning rounded me-3 mb-3 fs-2 w-100 h-100";
    document.getElementById(i).style="brightness(100%)";
  }
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

