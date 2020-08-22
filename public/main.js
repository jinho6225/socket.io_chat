const socket = io();
const sendingForm = document.querySelector('#chat')
const nameField = document.querySelector('#name')
const msgField = document.querySelector('#message')
const messageBox = document.querySelector(".messages__history");

sendingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    socket.emit('send msg', {
        message: msgField.value,
        nick: nameField.value,
    })
    msgField.value = "";
})

socket.on('rcvd msg', ({ message, nick }) => {
    addMsg({ message, nick })
})

const addMsg = ({ message, nick }) => {
    const receivedMsg = `
    <div class="incoming__message">
        <div class="message__author">${nick}</div>
        <div class="message__context">${message}</div>
    </div>`;
    messageBox.innerHTML += receivedMsg;
};