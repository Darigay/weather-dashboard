 
const toDate = new Date(); 
const dateEl=document.getElementById("date");
const searchEl = document.getElementById("search-btn");

const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const uvidxEl = document.getElementById("uvidx");

const historyEl = document.getElementById("history");
const datenow= new Date();
const [month, day, year]  = [datenow.getMonth(2), datenow.getDate(), datenow.getFullYear()];

function getInfo() {
    
    
    const cityEl = document.getElementById("city");
    const cityNameEl = document.getElementById("city-name");
  
    cityNameEl.innerHTML = cityEl.value + "("+ month +"/"+ day +"/"+ year + ")" ;



    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityEl.value + '&appid=5942c39fd4705ad68a82c1a924a217bd')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var lon = data['coord']['lon'];
            var lat = data['coord']['lat'];
            currentweather(lat, lon);
        });
    
}

function currentweather(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&units=imperial'+ '&appid=5942c39fd4705ad68a82c1a924a217bd')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var Temp=data.current.temp;
        var Wind=data.current.wind_speed;
        var humidity=data.current.humidity;
        var UVI=data.current.uvi;

        tempEl.innerHTML="Temp: "+Temp+ "F";
        windEl.innerHTML="Wind: "+Wind+ "MPH";
        humidityEl.innerHTML="Humidity: "+humidity+ "%";
        uvidxEl.innerHTML="UV Index: "+UVI;
    })
}




//const APIKey = "7e7b7a60d3f0d0c5a3d4bd29354c351f";

/* let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" ;
let file = queryUrl */



 /* setInterval(() =>{
    const time = moment().format('1');
    const day = time.getdate();
    const month = time.getMonth();
    const year = time.getYear();

    dateEl.innerHTML = '(' + month + '/' + day + '/' + year + ')'
}, 1000);
  */







