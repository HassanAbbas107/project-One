function init() {
    const message = document.querySelector("#message")
    const blocks = document.querySelectorAll(".block")
    /// buttons 
    const easybtn = document.querySelector("#easy")
    const normalbtn = document.querySelector("#normal")
    const hardbtn = document.querySelector("#Hard")
    let blockIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let shuffled
    let NewArr
    let total=10
    let timer
    let currentStep = 0
    let gameOver = false
    console.log(easybtn)
    easybtn.addEventListener('click', setEasy)
    normalbtn.addEventListener('click', setNormal)
    hardbtn.addEventListener('click', setHard)
    let contInte
    function setHard() {
        timer = 2000
        contInte = setInterval(countDown,1000)
        const countDownElement = document.querySelector("#countDown")
        function countDown(){
            total--;
            countDownElement.textContent=total+" seconds remaining"
            if(total<=0){
                clearInterval(contInte)
                countDownElement.textContent="Times up"
                setInterval(() => {
                    location.reload()
                }, 1000);
            }
            // else{
            //     total--
            // }
        }
        countDown()
        
        play()
    }
    function setNormal() {
        timer = 3000
        play()
    }
    function setEasy() {
        timer = 4500
        play()
    }
    function shuffle(array) {// Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }//end of the shuffle array function

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
        });//function for hading the number by make them equal to empty string 
    }

    blocks.forEach(block => {
        block.addEventListener('click', clickFun)
    })


    function clickFun(event) {
        blockIndex = NewArr[event.target.id]
        checkForWin(event)
        console.log('This is block index', blockIndex)
    }


    function checkForWin(event) {

        if (NewArr[event.target.id] === currentStep) {
            event.target.textContent = currentStep
            currentStep++
            total = 10
            // countDownElement.textContent=total+" seconds remaining"
            // clearInterval(contInte)
            console.log("This is correct")
            const list = event.target.classList;
            list.add("myStyle");
            if (currentStep === 9) {
                message.textContent = "NICE, YOU MAKE IT"//the win message
                setTimeout(() => {
                    location.reload()
                }, 3000);
            }
        } else {
            const list2 = event.target.classList;
            list2.add("myStyle2");

            blocks.forEach((block) => {
                block.addEventListener('click', () => {

                })
            })
            message.textContent = `YOU LOSE :(`//the lose message
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    }

    function play() {
        showNumber()
        setTimeout(hide, timer)

    }
    play()
} document.addEventListener("DOMContentLoaded", init);