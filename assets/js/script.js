 
const toDate = new Date(); 
const dateEl=document.getElementById("date");
const searchEl = document.getElementById("search-btn");
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const uvidxEl = document.getElementById("uvidx");
const currentPicEl=document.getElementById("current-pic");

const historyEl = document.getElementById("history");
const datenow= new Date();
const [month, day, year]  = [datenow.getMonth()+1, datenow.getDate(), datenow.getFullYear()];

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);


function getInfo(city) {
    var searchCity = city || cityEl.value;
   
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=5942c39fd4705ad68a82c1a924a217bd')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var lon = data['coord']['lon'];
            var lat = data['coord']['lat'];
            let weatherPic = data.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                     
            currentweather(lat, lon);
           
        });
    dailyForecast(searchCity);

    const cityNameEl = document.getElementById("city-name");
    cityNameEl.innerHTML = searchCity + "(" + month + "/" + day + "/" + year + ")";
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

        tempEl.innerHTML="Temp: "+Temp+ " &#176F";
        windEl.innerHTML="Wind: "+Wind+ "MPH";
        humidityEl.innerHTML="Humidity: "+humidity+ "%";
        
        //uvidxEl.setAttribute("class","badge badge-danger");
        uvidxEl.innerHTML="UV Index: <span id='uv-value'>"+ UVI + "</span>";
         var uvValue = document.getElementById("uv-value");
        if(UVI<4){
            uvValue.style.backgroundColor="green";
        }
        else if(UVI>6){
            uvValue.style.backgroundColor="red";
        }
        else{
            uvValue.style.backgroundColor="yellow";
        }
    });

}

function dailyForecast(cityname) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&units=imperial' + '&appid=5942c39fd4705ad68a82c1a924a217bd')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const forecastEls = document.querySelectorAll(".forecast");
            for (i = 0; i < forecastEls.length; i++) {
                forecastEls[i].innerHTML = "";
                const forecastIndex = i * 8 + 4;
                const forecastDate = new Date(data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt", data.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + data.list[forecastIndex].main.temp + " &#176F";
                forecastEls[i].append(forecastTempEl);
                const forecastWindEl = document.createElement("p");
                forecastWindEl.innerHTML = "Wind: " + data.list[forecastIndex].wind.speed + " MPH";
                forecastEls[i].append(forecastWindEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
            }

        });
    }
         

 searchEl.addEventListener("click",function(){
    const searchTerm=cityEl.value;
   getInfo(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();
})

function renderSearchHistory(){
    historyEl.innerHTML="";
    for(let i=0;i<searchHistory.length;i++){
        const historyItem = document.createElement("button");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("class","form-control d-block fw-bold bg-secondary mb-3");
        historyItem.setAttribute("value",searchHistory[i]);
        historyItem.textContent=searchHistory[i];
        historyItem.addEventListener("click",function(){
              getInfo(historyItem.textContent);
               //console.log(historyItem.textContent);
        })
        historyEl.append(historyItem);
    }
  
}

renderSearchHistory();
if(searchHistory.length>0) {
    getInfo(searchHistory[searchHistory.length-1]);
} 

