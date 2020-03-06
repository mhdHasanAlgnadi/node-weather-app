console.log('clint side javascrept')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const firstMessage = document.querySelector('#message-1')
const secondMessage = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchLocation.value
    firstMessage.textContent = 'Loding ...'
    secondMessage.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            console.log(data.error)
            firstMessage.textContent = data.error
        } else{
            console.log(data.location)
            firstMessage.textContent = data.location
            console.log(data.forecast)
            secondMessage.textContent = data.forecast
        }
    })
})
})