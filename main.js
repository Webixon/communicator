document.addEventListener('DOMContentLoaded', () => {
    getAllMsg()
})
let btn = document.querySelector('#btn');
let notify = document.querySelector('#notify')
let allMsg = null;
let board = document.querySelector('#board')
let textArea = document.querySelector('#textAreaMain');
let submit = document.querySelector('#submitMain')
let upVote = document.getElementsByClassName('voteUp')

function getAllMsg() {
    allMsg = document.querySelectorAll('.unread').length
    notify.textContent = allMsg;
    return allMsg;
}

function clearNotifications() {
    let msg = document.querySelectorAll('.msg')
    msg.forEach(e => {
        e.classList.remove('unread')
    })
    notify.textContent = getAllMsg()
}

function createVotingButtons(appendPlace, elementType, elementClassNr1, elementClassNr2, value) {
    let element = document.createElement(elementType);
    element.classList.add(elementClassNr1, elementClassNr2)
    element.textContent = value
    appendPlace.append(element)
}

function createButtonOrTextArea (elementType, className, value, appendPlace ){
    let element = document.createElement(elementType)
    element.classList.add(className)
    element.textContent = value
    appendPlace.append(element)
}

function placingVotingButtons (messages, spans) {
    // console.log(buttons, place)
    let buttonContainer = document.createElement('div')
    buttonContainer.classList.add('voting');
    messages.insertBefore(buttonContainer,spans)
    createVotingButtons(buttonContainer, 'button', 'voteBtn', 'voteUp', '+')
    createVotingButtons(buttonContainer, 'div', 'voteBtn', 'voteNum', '0')
    createVotingButtons(buttonContainer, 'button', 'voteBtn', 'voteDown', '-')
    voting()
}

function newMsg(msgText, inputPlace = board) {

    if (textArea.value == "") {
        return
    } else {
        let resp = document.createElement('div');  

        console.log(msgText) 

        // console.log(inputPlace)
        inputPlace.append(resp)       // tu trzeba zrobic if'a czy na główny ekran odpowiedz czy konkretnie odpowiedz do innej 
 
        resp.classList.add('msg', 'unread')
        resp.innerHTML = `<span class="name">Tomek Sośniewski</ span> <span style="font-weight: 100"> napisał:  ${msgText}</span></br><span class='timeAgo' style="font-weight: 100">1min ago</span><div class='options'>      
        <div class="response responseVisible">
        <textarea class="textArea"></textarea><input type='submit' class='submit newSubmit' value='submit'></input>
        </div>
        </div>`
        
        let optionsArea = document.querySelectorAll('.options')
        let lastOptions = optionsArea[optionsArea.length-1]
     
        let lastM = document.querySelectorAll('.msg')
        let lastMsg = lastM[lastM.length-1]
        createButtonOrTextArea('div', 'replay', 'replay', lastOptions) // creating replay btn button
       

        let allSpans = document.querySelectorAll('.name')
        let lastSpan = allSpans[allSpans.length-1]
        placingVotingButtons(lastMsg, lastSpan)
        allMsg += 1;
        notify.textContent = allMsg;
        textArea.value = " ";
        voting()
        showReplay()
        
    }
}

function voting() {
    let upVote = document.getElementsByClassName('voteUp')
    let downVote = document.getElementsByClassName('voteDown')
    for (let i = 0; i < upVote.length; i++) {
        upVote[i].onclick = function () {
            let div = this.nextElementSibling;
            div.textContent++
        }
        downVote[i].onclick = function () {
            let div = this.previousElementSibling;
            div.textContent--
        }
    }
}

voting()

function showReplay() {
    let replayBtn = document.querySelectorAll('.replay');
    let response = document.querySelectorAll('.response')
    for (let i = 0; i < replayBtn.length; i++) {
        replayBtn[i].onclick = function () {
            response[i].classList.toggle('responseVisible')
            response[i].classList.toggle('replayActive')
            createReplay()
            
        }
    }
}
function createReplay () {
    let activeResponse = document.querySelectorAll('.textArea')
    let responseBox = document.querySelectorAll('.response')
    let submitBtn = document.querySelectorAll('.newSubmit')
    let allMsg = document.querySelectorAll('.msg')
    let i = 0
    for (let i = 0; i < activeResponse.length; i++) {
        submitBtn[i].onclick = function () {
           responseBox[i].classList.remove('replayActive')
           responseBox[i].classList.add('responseVisible')
            newMsg(activeResponse[i].value, allMsg[i])
            let allSpans = document.querySelectorAll('.name')
            console.log(allSpans[i])
            placingVotingButtons(allMsg[i], allSpans[i].lastChild)
           
        }
        
        
    }


         

}


submit.addEventListener('click', newMsg)
btn.addEventListener('click', clearNotifications)