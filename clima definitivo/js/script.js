document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e5772ba6b43ee416f769af20af640216'; // Reemplaza con tu API Key
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const pressure = document.getElementById('pressure');
    const humidity = document.getElementById('humidity');
    const cityElement = document.getElementById('ciudad'); // Elemento para la ciudad
    const weatherText = document.getElementById('weather-text'); // Elemento para el texto del clima
    const skeleton = document.querySelector('.skeleton');
    const realContent = document.getElementById('real-content');

    // Función para obtener la ubicación del usuario
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchWeather, handleError);
        } else {
            console.error("La geolocalización no está soportada por este navegador.");
        }
    }

    // Función para manejar errores de geolocalización
    function handleError(error) {
        console.error("Error al obtener la ubicación:", error);
    }

    // Función para obtener los datos del clima y la ciudad
    function fetchWeather(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const reverseGeoApiURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

        // Obtener el clima
        fetch(weatherApiURL)
            .then(response => response.json())
            .then(data => {
                
                temperature.textContent = `Temperatura: ${data.main.temp} °C`;
                sensacion.textContent = `Sensación: ${data.main.feels_like} °C`;
                pressure.textContent = `Presión: ${data.main.pressure} hPa`;
                humidity.textContent = `Humedad: ${data.main.humidity}%`;

                // Obtener el icono según el clima
                const weather = data.weather[0].main.toLowerCase();
                const { iconUrl, text } = getWeatherIcon(weather);
                weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${weather}">`;
                weatherText.textContent = text; // Muestra el texto del clima

                // Obtener el nombre de la ciudad
                return fetch(reverseGeoApiURL);
            })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const city = data[0].name;
                    cityElement.textContent = `${city}`; // Muestra la ciudad en el elemento correspondiente
                } else {
                    cityElement.textContent = 'Ciudad: No disponible';
                }

                // Ocultar esqueleto y mostrar contenido real
                skeleton.style.display = 'none';
                realContent.style.display = 'flex';
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Función para obtener el ícono del clima y el texto
    function getWeatherIcon(weather) {
        switch (weather) {
            case 'clear':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/1788/1788866.png',
                    text: 'Soleado'
                }; // Reemplaza con tu URL
            case 'clouds':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/5110/5110971.png',
                    text: 'Nublado'
                };
            case 'rain':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/1704/1704940.png',
                    text: 'Lluvioso'
                }; // Reemplaza con tu URL
            case 'drizzle':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/11145/11145552.png',
                    text: 'Llovizna'
                }; // Reemplaza con tu URL
            case 'thunderstorm':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/11627/11627477.png',
                    text: 'Tormenta'
                }; // Reemplaza con tu URL
            case 'snow':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/2204/2204343.png',
                    text: 'Nieve'
                }; // Reemplaza con tu URL
            case 'mist':
            case 'fog':
            case 'haze':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/1207/1207566.png',
                    text: 'Niebla'
                }; // Reemplaza con tu URL
            case 'dust':
            case 'sand':
            case 'ash':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/3750/3750401.png',
                    text: 'Polvo'
                }; // Reemplaza con tu URL
            case 'squall':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/2204/2204344.png',
                    text: 'Ráfaga'
                }; // Reemplaza con tu URL
            case 'tornado':
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/10735/10735416.png',
                    text: 'Tornado'
                }; // Reemplaza con tu URL
            default:
                return {
                    iconUrl: 'https://cdn-icons-png.flaticon.com/128/9274/9274176.png',
                    text: 'Desconocido'
                }; // Reemplaza con tu URL
        }
    }

    // Llama a la función para obtener la ubicación
    getLocation();
    setInterval(getLocation, 30000);
});
