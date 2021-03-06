var input = document.getElementById('message')
var image = document.getElementById('image')

function returnGif() {
  if (image.value.includes('giphy')) {
    var gif = image.value.split('-')
    return ('//giphy.com/embed/' + gif.slice(-1)[0] + '?html5=true')
  } else {
    return image.value
  }
}

input.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    submitChat()
  }
})
image.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    submitChat()
  }
})

function submitChat() {
  fetch('/chats', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: input.value,
        image: returnGif()
    })
  })
  .then(response => response.json())
  input.value = ''
  image.value = ''
  image.classList.add('hidden')
}

var imageButton = document.getElementById('imageButton')
imageButton.addEventListener('click', function() {
  image.classList.remove('hidden')
})

function addChatMessage(chat) {
  var li = document.createElement('li')
  li.classList.add('list-group-item', 'flex')
  var message = document.createElement('div')
  message.classList.add('chat_display', 'text-left')
  message.innerHTML = chat.message
  li.appendChild(message)
  if (chat.image != null && chat.image != '') {
    var imageDiv = document.createElement('div')
    imageDiv.classList.add('chat_display', 'text-center')
    var image = document.createElement('iframe')
    image.setAttribute('frameBorder', '0')
    image.setAttribute('allowFullScreen', 'true')
    image.src = chat.image
    imageDiv.appendChild(image)
    li.appendChild(imageDiv)
  } else {
    var placeholder = document.createElement('div')
    placeholder.classList.add('placeholder')
    li.appendChild(placeholder)
  }
  var ul = document.getElementById('messages')
  var first = document.querySelector('.list-group-item')
  ul.insertBefore(li, first)
}

// Pusher Setup
var pusher = new Pusher('6e5f67bde794d28881ed', {
  encrypted: true
})

var pusherChannel = pusher.subscribe('chat_app')

pusherChannel.bind('new_chat', function(chat) {
  addChatMessage(chat)
})
