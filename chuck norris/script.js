const chiste = document.getElementById('chiste')
const button = document.getElementById('button')

button.addEventListener('click', () => {
    $.getJSON('https://api.chucknorris.io/jokes/random', function(data){
        chiste.innerHTML = data.value
    })
})