function init() {
const blocks = document.querySelectorAll(".block")
// let randomBox=Array.from({length: 9}, () => Math.floor(Math.random() * 9));//1st random method
let blockIndex=[0,1,2,3,4,5,6,7,8]
let shuffled 
let NewArr
let total
let currentStep
let gameOver=false
   function shuffle(array) {// Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }//end of the shuffle array function

// function getNum(event){
//     // for(let i =0;i<blockIndex.lenght;i++){
//     // blockIndex=event.target.id}
//     if(gameOver){return}
//     const clickedBlock = event.target;
//         const clickedValue = clickedBlock.textContent
//         currentStep=clickedValue
//         console.log(clickedValue);
    
// }
    function showNumber(){
        NewArr=shuffle(Array.from(blockIndex));
        console.log(NewArr)
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].textContent=NewArr[i]
            
        }
    }
    function hide() {
    blocks.forEach(Element => {
          Element.textContent=''  
        });
    }
    
    blocks.forEach(block=>{
        block.addEventListener('click',clickFun)
    })
    function clickFun(event) {
         blockIndex=NewArr[ event.target.id]
        console.log(blockIndex)
    }
    function play(){
        showNumber()
        setInterval(hide, 3000)
        
    }play()
    }document.addEventListener("DOMContentLoaded", init);