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
const key = '682d65cd5f8f2fec0645e96fa514960b';
let units = 'metric';
let metrica = '°C';
let locacion = document.getElementById('lugar');
let encodedLoc;

function cargarCiudad(){
    console.log(locacion)
    if(typeof locacion == 'string'){
        encodedLoc = encodeURI(locacion);
    } else encodedLoc = encodeURI(locacion.value);
    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${encodedLoc}&appid=${key}&units=${units}`, function(data){
        ciudad.textContent = data.name;
        temperatura.textContent = Math.floor(data.main.temp);
        grados.innerHTML = metrica;
        wicon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        descripcion.textContent = data.weather[0].descripcion
        locacion.value = ''
    })
    container.style.visibility = 'visible';
    metricaBtn.style.visibility = 'visible';
}

function toggleMetric(){
    if(celBtn.classList.contains('active')){
        fahrBtn.classList.add('active');
        celBtn.classList.remove('active');
        locacion = ciudad.innerHTML
        cargarCiudad()
    } else {
        celBtn.classList.add('active')
        fahrBtn.classList.remove('active')
        metrica = '°F';
        units = 'imperial';
        locacion = ciudad.innerHTML
        cargarCiudad()
    }
}

enviarBtn.addEventListener('click', cargarCiudad);
fahrBtn.addEventListener('click', toggleMetric);
celBtn.addEventListener('click', toggleMetric);

