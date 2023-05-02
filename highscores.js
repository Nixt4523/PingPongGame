// Importing HTML Elements
const highscoreElement = document.getElementById('all-users-scores')
const highscoreElementInnerContent = highscoreElement.innerHTML

// Getting Users from Local Storage
let users = JSON.parse(window.localStorage.getItem('users'))

console.log(users)

// Sorting Users base on their Scores
sortedUsers = users.sort((a, b) => {
    if (a.score < b.score) {
        return 1
    }
    else if (a.score > b.score) {
        return -1
    }
    return 0
})  

sortedUsers.map((users, index) => {

    // Adding Elements to the HighScore Element
    highscoreElement.insertAdjacentHTML('beforeend',
        `<div class="hiddenElement delay-[${index * 100}ms] border-2 border-black h-[10vh] flex items-center justify-between p-4">
    <div class="flex items-center gap-2 flex-1">
        <h1 class="font-bold text-sm md:text-lg">#${index + 1}</h1>
        <h1 class="text-lg md:text-2xl">${users.name}</h1>
    </div>
    <h1 class="text-lg md:text-2xl">${users.username}</h1>
    <h1 class="text-lg md:text-2xl font-bold flex-1 text-right">${users.score}</h1>
</div>`
    )
})