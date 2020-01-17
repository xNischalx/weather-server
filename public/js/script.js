console.log('Client Side Javascript is loading');


const weatherAddress = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherAddress.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = "Loading..";
    messageTwo.textContent = "";
    fetch(`http://localhost:3000/weather?address=${address.value}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error;
        }
        else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})