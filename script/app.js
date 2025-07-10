function init() {
const blocks = document.querySelectorAll(".block")

function getNum(event){
const blockIndex=event.target.id
console.log(blockIndex)
}
blocks.forEach(block=>{
    block.addEventListener('click',getNum)
})
}document.addEventListener("DOMContentLoaded", init);