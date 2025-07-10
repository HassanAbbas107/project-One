function init() {
const blocks = document.querySelectorAll(".block")
// let randomBox=Array.from({length: 9}, () => Math.floor(Math.random() * 9));//1st random method
let blockIndex=['','','','','','','','','']
function shuffle(arrayOfindex){
    for(let i=arrayOfindex.lenght-1;i>0;i--){
    const j=Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }return arrayOfindex;
}//end of the shuffle array function

function getNum(event){
    for(let i =0;i<blockIndex.length;i++){
    blockIndex=event.target.id
    blockIndex.textContent
    }
}

    
    blocks.forEach(block=>{
        block.addEventListener('click',getNum)
    })

    function play(){
        
    }
    }document.addEventListener("DOMContentLoaded", init);