let button = document.getElementById('button')

let icono = document.getElementById('icono')

let campo0 = document.getElementById('campo0');
let campo1 = document.getElementById('campo1');
let campo2 = document.getElementById('campo2');
let campo3 = document.getElementById('campo3');
let campo4 = document.getElementById('campo4');
let campo5 = document.getElementById('campo5');
let campo6 = document.getElementById('campo6');
let campo7 = document.getElementById('campo7');
let campo8 = document.getElementById('campo8');

let apiKey = 'a83c3860118257a27759290cedd6fae9';
let url = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;


// FUNCIÓN PARA LA PETICIÓN A LA API
function getInfo() {
    let ciudad = document.getElementById('ciudad');
    let pais = document.getElementById('select');

    // PETICIÓN A LA API
    axios.get(`${url}${ciudad.value},${pais.value}`).then(function (response) {
        console.log(response)
        updateInfo(response.data);
        ciudad.value = '';

    }).catch(e => {

        // EN CASO DE ERROR EN LA PETICIÓN
        updateInfoError()

    });
}

function updateInfo(data) {
    console.log(data);

    // TIEMPO DESPEJADO, NUBLADO O LLUVIOSO
    let weather = data.weather[0].main;

    // ICONO DEL CIELO
    let iconoCielo = data.weather[0].icon;

    //COMPONENTE DEL VIENTO
    let windDeg = data.wind.deg;
    let componenteViento = '';
    if (22, 5 <= windDeg < 67, 5) {
        componenteViento = 'noreste (NE)'
    } else if (67, 5 <= windDeg < 112, 5) {
        componenteViento = 'este (E)'
    } else if (112, 5 <= windDeg < 157, 5) {
        componenteViento = 'sureste (SE)'
    } else if (157, 5 <= windDeg < 202, 5) {
        componenteViento = 'sur (S)'
    } else if (202, 5 <= windDeg < 247, 5) {
        componenteViento = 'suroeste (SO)'
    } else if (247, 5 <= windDeg < 292, 5) {
        componenteViento = 'oeste (O)'
    } else if (292, 5 <= windDeg < 337, 5) {
        componenteViento = 'noroeste (NO)'
    } else {
        componenteViento = 'norte (N)'
    }

    //VELOCIDAD DEL VIENTO
    let windSpeed = ((data.wind.speed) * 3.6);
    windSpeed = Math.round(windSpeed * 100) / 100;
    console.log(componenteViento + windSpeed);


    // HORA DE AMANECER Y ATARDECER
    let sunrise = data.sys.sunrise;
    let dateSunrise = new Date(sunrise * 1000);
    let horaSunrise = dateSunrise.toLocaleTimeString();

    let sunset = data.sys.sunset;
    let dateSunset = new Date(sunset * 1000);
    let horaSunset = dateSunset.toLocaleTimeString();

    // INFORMACIÓN OBTENIDA EN LA PETICIÓN
    campo0.innerText = `El tiempo en ${data.name}`;
    campo1.innerText = `Temperatura: ${data.main.temp}ºC`;
    campo2.innerText = `Sensación térmica: ${data.main.feels_like}ºC`;
    campo3.innerText = `Temperatura mínima: ${data.main.temp_min}ºC`;
    campo4.innerText = `Temperatura máxima: ${data.main.temp_max}ºC`;
    campo5.innerText = `Viento: ${windSpeed}kms/h de componente ${componenteViento}`;
    campo6.innerText = `Humedad relativa: ${data.main.humidity}%`;
    campo7.innerText = `Hora del amanecer: ${horaSunrise}`;
    campo8.innerText = `Hora del atardecer: ${horaSunset}`;
    icono.src = `http://openweathermap.org/img/w/${iconoCielo}.png`;
    icono.style.display = "inline-block"


}

function updateInfoError() {

    campo0.innerText = `No se ha podido obtener información sobre la localidad solicitada`;
    campo1.innerText = '';
    campo2.innerText = '';
    campo3.innerText = '';
    campo4.innerText = '';
    campo5.innerText = '';
    campo6.innerText = '';
    campo7.innerText = '';
    campo8.innerText = '';
    icono.style.display = "none"

}

button.addEventListener('click', getInfo);
