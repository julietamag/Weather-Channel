const enviarBtn = document.getElementById('enviar');
const container = document.getElementById('container');
const ciudad = document.getElementById('ciudad');
const temperatura = document.getElementById('temperatura');
const wicon = document.getElementById('wicon');
const descripcion = document.getElementById('descripcion');
const grados = document.getElementById('grados');
const fahrBtn = document.getElementById('fahrenheit');
const celBtn = document.getElementById('celcius');
const metricaBtn = document.getElementById('metric');
const errorDisplayer = document.getElementById('error-displayer')
let units = 'metric';
let metrica = '°C';
let locacion = document.getElementById('lugar');
let encodedLoc;

function cargarCiudad(){
    const key = '682d65cd5f8f2fec0645e96fa514960b';
    encodedLoc = encodeURI(locacion.value);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedLoc}&appid=${key}&units=${units}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        ciudad.textContent = data.name;
        temperatura.textContent = Math.round(data.main.temp);
        grados.innerHTML = metrica;
        wicon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        descripcion.innerHTML = data.weather[0].description;
        locacion.value = ''
        container.style.visibility = 'visible';
        metricaBtn.style.visibility = 'visible';
    })
    .catch(()=>{
        container.style.visibility = 'hidden';
        metricaBtn.style.visibility = 'hidden';
        errorDisplayer.innerHTML = "Please search for a valid city 😩";
    })
}

function toggleToCel(){
    if(fahrBtn.classList.contains('active')){
        fahrBtn.classList.remove('active')
        celBtn.classList.add('active')
        units = 'metric';
        metrica = '°C';
        grados.innerHTML = metrica;
        temperatura.innerHTML = Math.round((temperatura.innerHTML - 32) / 1.80);
    }
} 

function toggleToFahr() {
    if(celBtn.classList.contains('active')){
        celBtn.classList.remove('active');
        fahrBtn.classList.add('active');
        units = 'imperial';
        metrica = '°F';
        grados.innerHTML = metrica;
        temperatura.innerHTML = Math.round(1.80 * temperatura.innerHTML + 32);
    }
}

enviarBtn.addEventListener('click', cargarCiudad);
fahrBtn.addEventListener('click', toggleToFahr);
celBtn.addEventListener('click', toggleToCel);


// get request with Plataforma 5 spec
// $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${encodedLoc}&appid=${key}&units=${units}`, function(data){
    //     ciudad.textContent = data.name;
    //     temperatura.textContent = Math.round(data.main.temp);
    //     grados.innerHTML = metrica;
    //     wicon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    //     descripcion.textContent = data.weather[0].descripcion
    //     locacion.value = ''
    // })