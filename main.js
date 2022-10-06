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




function newMsg() {

    if (textArea.value == "") {
        return
    } else {
        let resp = document.createElement('div');
        
        board.append(resp)  


       
        resp.classList.add('msg', 'unread')
        resp.innerHTML = `<span class="name">Tomek Sośniewski</ span> <span style="font-weight: 100"> napisał: ${textArea.value}</span></br><span class='timeAgo' style="font-weight: 100">1min ago</span><div class='options'>      
        <div class="response responseVisible">
        <textarea class="textArea"></textarea><input type='submit' class='submit' value='submit'></input>
        </div>
        </div>`


        // let lastResp = document.querySelector('.unread')
       
        let buttonContainer = document.createElement('div')
        let optionsArea = document.querySelectorAll('.options')
        let lastOptions = optionsArea[optionsArea.length-1]
        buttonContainer.classList.add('voting');
       console.log(optionsArea)
       console.log(lastOptions)

        let votingArea = document.querySelector('#board').lastChild
        let beforeSpanArea = votingArea.lastChild
        votingArea.insertBefore(buttonContainer, beforeSpanArea)

        createVotingButtons(buttonContainer, 'button', 'voteBtn', 'voteUp', '+')
        createVotingButtons(buttonContainer, 'div', 'voteBtn', 'voteNum', '0')
        createVotingButtons(buttonContainer, 'button', 'voteBtn', 'voteDown', '-')
        // createButtonOrTextArea('textArea', 'textArea', null, resp)
        createButtonOrTextArea('div', 'replay', 'replay', lastOptions)
        allMsg += 1;
        notify.textContent = allMsg;
        textArea.value = " "


        voting()
        showReplay()

        // displayVoting()

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
        }
    }
}



submit.addEventListener('click', newMsg)
btn.addEventListener('click', clearNotifications)