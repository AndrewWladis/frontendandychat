const socket = io('https://andychat.onrender.com/');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const modalTrigger = document.getElementById('modal-trigger');
const modal = document.getElementById("myModal");
const params = new URLSearchParams(window.location.search);
const pics = ['AndyMojis/waltuh.png', 'AndyMojis/sigma.png', 'AndyMojis/joker.png', 'AndyMojis/lightbulb.png', 'AndyMojis/skull.png', 'AndyMojis/bluecrystal.png', 'AndyMojis/chugjug.png', 'AndyMojis/crab.png', 'AndyMojis/waternoose.png', 'AndyMojis/herobrine.png']
let canType = true;
let nameParam = params.get('name');
let container = document.createElement('div');
container.id = 'message-container';
document.querySelector('.container').remove();
document.body.prepend(container);
const messageContainer = document.getElementById('message-container');
appendMessage('You joined');

socket.emit('new-user', nameParam)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`, data.color)
})

socket.on('ban', data => {
  console.log('banned! bruh')
})

socket.on('user-connected', name => {
  appendMessage(`${name} joined`)
})

socket.on('andymoji-message', data => {
  andimojiFunc(data.andimoji, data.name)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  if (message.length < 150) {
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
  } else {
    appendMessage('No messages can be over 150 characters!')
  }
})

function checkForMessageLimit() {
  if (screen.height - 90 < messageContainer.children.length * 38) {
    messageContainer.removeChild(messageContainer.getElementsByTagName('div')[0]);
  }
}

function appendMessage(message) {
  const messageElement = document.createElement('div')
  if (canType && message != 'null left') {
    messageElement.innerText = message;
    if (message.startsWith("You:")){
      messageElement.style.backgroundColor = '#3f6296'
      setInterval(function () {canType = true}, 3000);
    } else if (message == 'No messages can be over 150 characters!'){
      messageElement.style.backgroundColor = '#3f6296'
      messageElement.style.color = '#f79494';
    } else {
      messageElement.style.backgroundColor = '#b3d0ff'
    }
    messageContainer.append(messageElement);
    canType = false;
  } else {
    messageElement.style.backgroundColor = '#3f6296'
    messageElement.style.color = '#f79494';
    messageElement.innerText = 'No Spam! You can only send a message every 3 seconds'
    messageContainer.append(messageElement);
  }
  checkForMessageLimit()
}


function andimojiFunc(andimojiEx, person) {
  const messageElement = document.createElement('div')
  if (canType) {
    const andimoji = document.createElement('img');
    andimoji.classList.add('andymoji');
    modal.style.display = "none";
    messageElement.innerText = 'You: ';
    andimoji.src = `AndyMojis/${andimojiEx}.png`
    if (person === 'You'){
      messageElement.style.backgroundColor = '#3f6296'
    } else {
      messageElement.style.backgroundColor = '#b3d0ff'
    }
    messageElement.innerText = `${person}: `;
    messageElement.append(andimoji);
    messageElement.classList.add('flex-class');
    messageContainer.append(messageElement);
    canType = false;
    setInterval(function () {canType = true}, 5000);
  } else {
    messageElement.style.backgroundColor = '#3f6296'
    messageElement.style.color = '#f79494';
    messageElement.innerText = 'No Spam! You can only send a message every 5 seconds'
    messageContainer.append(messageElement);
  }
  checkForMessageLimit();
}




document.getElementById('waltuh').onclick = function() {
  andimojiFunc('waltuh', 'You')
  socket.emit('send-andymoji', 'waltuh')
}

document.getElementById('crab').onclick = function() {
  andimojiFunc('crab', 'You')
  socket.emit('send-andymoji', 'crab')
}

document.getElementById('waternoose').onclick = function() {
  andimojiFunc('waternoose', 'You')
  socket.emit('send-andymoji', 'waternoose')
}

document.getElementById('herobrine').onclick = function() {
  andimojiFunc('herobrine', 'You')
  socket.emit('send-andymoji', 'herobrine')
}

document.getElementById('chugjug').onclick = function() {
  andimojiFunc('chugjug', 'You')
  socket.emit('send-andymoji', 'chugjug')
}

document.getElementById('bluecrystal').onclick = function() {
  andimojiFunc('bluecrystal', 'You')
  socket.emit('send-andymoji', 'bluecrystal')
}

document.getElementById('skull').onclick = function() {
  andimojiFunc('skull', 'You')
  socket.emit('send-andymoji', 'skull')
}

document.getElementById('lightbulb').onclick = function() {
  andimojiFunc('lightbulb', 'You')
  socket.emit('send-andymoji', 'lightbulb')
}

document.getElementById('joker').onclick = function() {
  andimojiFunc('joker', 'You')
  socket.emit('send-andymoji', 'joker')
}

document.getElementById('sigma').onclick = function() {
  andimojiFunc('sigma', 'You')
  socket.emit('send-andymoji', 'sigma')
}

modalTrigger.src = pics[Math.floor(Math.random() * pics.length)];

modalTrigger.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}