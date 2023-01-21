const socket = io('https://andychat.onrender.com/')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const params = new URLSearchParams(window.location.search);
let nameParam = params.get('name');

appendMessage('You joined')
socket.emit('new-user', nameParam)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`, data.color)
})

socket.on('user-connected', name => {
  appendMessage(`${name} joined`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message;
  if (message.startsWith("You")){
    messageElement.style.backgroundColor = '#3f6296'
  } else {
    messageElement.style.backgroundColor = '#b3d0ff'
  }
  if (messageContainer.children.length > 17) {
    messageContainer.children[0].remove()
  }
  messageContainer.append(messageElement);
}