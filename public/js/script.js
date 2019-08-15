console.log("Client side javascript is not loaded.")

// fetch('http://localhost:3000/weather?search=Delhi').then((response) => {
//   response.json().then((data) =>{
//     console.log(data)
//   })
// })

const form = document.querySelector('form')
const search = document.getElementsByClassName('search-field')
const result = document.getElementById('results')


form.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = search[0].value;
  fetch('http://localhost:3000/weather?search='+address).then((response) => {
    response.json().then((data) => {
      if(data.error){
        result.textContent = data.error
      }else{
        result.textContent = data.location + ': ' + data.forecast
      }
    })
  })
})
