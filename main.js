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
    resp.innerHTML = `<span class="name">Tomek Sośniewski</ span> <span style="font-weight: 100">${textArea.value}</span><a class='msgLink' href='#'>... read message</a></br><span class='timeAgo' style="font-weight: 100">1min ago</span>`
    board.append(resp)
    allMsg += 1; 
    notify.textContent = allMsg;  
    textArea.value = " "
}
}


function voting () {
    let upVote = document.getElementsByClassName('voteUp')
    let downVote = document.getElementsByClassName('voteDown')
    for (let i = 0; i < upVote.length; i++) {
      upVote[i].onclick = function() {
        let div = this.nextElementSibling; 
        div.textContent ++}
      downVote[i].onclick = function() {
        let div = this.previousElementSibling;
        div.textContent --}  
       } 
    }

voting()




submit.addEventListener('click', newMsg)
btn.addEventListener('click', clearNotifications)

