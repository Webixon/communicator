document.addEventListener('DOMContentLoaded', () => {
    getAllMsg()
})
let btn = document.querySelector('#btn');
let notify = document.querySelector('#notify')
let allMsg = null;
let board = document.querySelector('#board')
let textArea = document.querySelector('#textArea');
let submit = document.querySelector('#submit')
let upVote = document.getElementsByClassName('voteUp')

function getAllMsg () {
    allMsg = document.querySelectorAll('.unread').length
    notify.textContent = allMsg;
    return allMsg;
}

function clearNotifications () {    
    let msg = document.querySelectorAll('.msg')
    msg.forEach(e => {
       e.classList.remove('unread')
    })
    notify.textContent = getAllMsg()
}

function newMsg () {    
    if(textArea.value == ""){
        return
    }else{
    let resp = document.createElement('div');
    resp.classList.add('msg')
    resp.classList.add('unread')
    resp.textContent = textArea.value
    board.append(resp)
    allMsg += 1; 
    notify.textContent = allMsg;  
    textArea.value = " "
}
}

function upVoteScore () {
    
    let voteNum = document.querySelectorAll('.voteNum').value
    
    console.log(voteNum)
    
}

submit.addEventListener('click', newMsg)
btn.addEventListener('click', clearNotifications)
upVote.addEventListener('click', upVoteScore)
