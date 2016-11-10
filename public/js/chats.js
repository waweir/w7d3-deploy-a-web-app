var input = document.getElementById('message')
var image = document.getElementById('image')

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetch('/chats', {
          method: 'POST',
          body: JSON.stringify({
              message: input.value,
              image: image.value,
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      input.value = ''
      image.value = ''
      image.classList.add('hidden')
    }
})

var imageButton = document.getElementById('imageButton')
imageButton.addEventListener('click', function() {
  image.classList.remove('hidden')
  console.log('test')
})

// Pusher Setup
var pusher = new Pusher('6e5f67bde794d28881ed', {
  encrypted: true
})

var pusherChannel = pusher.subscribe('chat_app')

pusherChannel.bind('new_chat', function(chat) {
  addChatMessage(chat)
})
