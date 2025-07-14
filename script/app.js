function init() {
    const message = document.querySelector("#message")
    const blocks = document.querySelectorAll(".block")
    // let randomBox=Array.from({length: 9}, () => Math.floor(Math.random() * 9));//1st random method
    let blockIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let shuffled
    let NewArr
    let total
    let currentStep = 0
    let gameOver = false
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
    function showNumber() {
        NewArr = shuffle(Array.from(blockIndex));
        console.log(NewArr)
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].textContent = NewArr[i]

        }
    }
    function hide() {
        blocks.forEach(Element => {
            Element.textContent = ''
        });
    }

    blocks.forEach(block => {
        block.addEventListener('click', clickFun)
    })
    function lose() {
        //     blocks.forEach(block => {
        //         block.removeEventListener()
        //     });
    }
    function clickFun(event) {
        blockIndex = NewArr[event.target.id]
        checkForWin(event)
        console.log('This is block index', blockIndex)
    }


    function checkForWin(event) {

        if (NewArr[event.target.id] === currentStep) {
            event.target.textContent = currentStep
            currentStep++
            console.log("This is correct")
            const list = event.target.classList;
            list.add("myStyle");
            if (currentStep === 9) {
                message.textContent = "NICE, YOU MAKE IT"
                setTimeout(() => {
                    location.reload()
                }, 2000);
            }
        } else {
            const list2 = event.target.classList;
            list2.add("myStyle2");

            blocks.forEach((block) => {
                block.addEventListener('click', () => {

                })
            })
            message.textContent = "YOU LOSE :("
            setTimeout(() => {
                location.reload()
            }, 2000);
        }
    }

    function play() {
        showNumber()
        setTimeout(hide, 3000)

    }
    play()
} document.addEventListener("DOMContentLoaded", init);