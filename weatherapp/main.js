window.addEventListener('load', () =>{
    
let long;
let lat;
let temperatured = document.querySelector(".temperature-degree");
let weatherd = document.querySelector(".temperature-description");
let timezone = document.querySelector(".location-timezone");
let temperatures = document.querySelector(".temperature span");
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position =>{
    long = position.coords.longitude;
    lat = position.coords.latitude;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/61d068278caf0a12abad1a15756b4cd7/${lat},${long}`;
    fetch(api)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log(data);
         const {temperature,summary,icon} = data.currently;
         //console.log(data.currently.time);
         temperatured.textContent = temperature;
         temperatured.addEventListener('click', ()=>{
            if (temperatures.textContent == "F") {
                temperatures.textContent = "C";
                temperatured.textContent = Math.floor((temperature - 32) * 5/9);
            }else{
                temperatures.textContent = "F";
                temperatured.textContent = temperature;
                
            }
         });
         weatherd.textContent = "The weather is "+summary;
         weatherd.textContent += " But "+data.hourly.summary+" Wind Speed is "+data.currently.windSpeed;
         timezone.textContent = data.timezone ;
         setsIcon(icon, document.querySelector(".icon"));
});
});
    
}

function setsIcon(icon, iconId){

    const skycons = new Skycons({"color": "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); 
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
}
});