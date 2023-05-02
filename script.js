// Importing HTML Elements
const playerName = document.getElementById('name')
const playerUsername = document.getElementById('username')
const playBtn = document.getElementById('play-btn')

// Play Button
playBtn.onclick = function (e) {
    e.preventDefault()

    // Getting Users from Local Storage
    let allUsers = JSON.parse(window.localStorage.getItem('users')) || []

    // Setting Current User in Session Storage
    window.sessionStorage.setItem('currentUser',
        JSON.stringify({
            "name": playerName.value,
            "username": playerUsername.value,
            "score": 0
        })
    )

    // Checking Users array is Empty and Player name and username is not equal to ''
    if (allUsers.length === 0 && (playerName.value !== '' && playerUsername.value !== '')) {
        allUsers.push(
            {
                "name": playerName.value,
                "username": playerUsername.value,
                "score": 0
            }
        )
    }

    let alreadyUser = false
    
    // Checking if User already Exists
    allUsers.forEach((user) => {
        if (user.username === playerUsername.value) {
            alreadyUser = true
        }
    })

    // Adding User in the allUsers array
    if (!alreadyUser && (playerName.value !== '' && playerUsername.value !== '')) {
        allUsers.push({
            "name": playerName.value,
            "username": playerUsername.value,
            "score": 0
        })
    }

    // Setting Users in Local Storage
    window.localStorage.setItem('users', JSON.stringify(allUsers))

    // Playing the game if Player name and username is not equal to ''
    if (playerName.value !== '' && playerUsername.value !== '') {
        window.location.href = '/game.html'
    }
    playerName.value = ''
    playerUsername.value = ''
}