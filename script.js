const apiKey = '9464c3a77ad1248d3a6cde776e625118';
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
        const city = 'Lusaka';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherContainer = document.getElementById('weather');
                const hours = data.list.slice(0, 5); // Get weather for the next 4 hours
                hours.forEach(hour => {
                    const weatherCard = document.createElement('div');
                    weatherCard.className = 'weather-card';
                    const iconCode = hour.weather[0].icon;
                    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    weatherCard.innerHTML = `
                <h2>${new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
                <img class="weather-icon" src="${iconUrl}" alt="${hour.weather[0].description}">
                <h2> ${hour.main.temp}°C</h2>
                <h4>Humidity: ${hour.main.humidity}%</h4>
                <h4> ${hour.weather[0].description}</h4>
                <h4>Wind Speed: ${hour.wind.speed} m/s</h4>
            `;

                    weatherContainer.appendChild(weatherCard);
                });
            });

        /* const locationInput = document.getElementById('locationInput');
         const searchButton = document.getElementById('searchButton');
         const locationElement = document.getElementById('location');
         const weatherIcon = document.getElementById('weather-icon');
         const temperatureElement = document.getElementById('temperature');
         const descriptionElement = document.getElementById('description');
         const humidityElement = document.getElementById('humidity');
         const forecastElement = document.getElementById('forecast');
         const windspeedElement = document.getElementById('wind');
 
         searchButton.addEventListener('click', () => {
             const location = locationInput.value;
             if (location) {
                 fetchWeather(location);
                 fetchForecast(location);
             }
         });*/

        document.addEventListener('DOMContentLoaded', () => {
            const calendarBody = document.getElementById('calendar-body');
            const monthYear = document.getElementById('month-year');
            const prevMonthButton = document.getElementById('prev-month');
            const nextMonthButton = document.getElementById('next-month');

            let currentMonth = new Date().getMonth();
            let currentYear = new Date().getFullYear();

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            function updateCalendar() {
                const firstDay = new Date(currentYear, currentMonth, 1).getDay();
                const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

                calendarBody.innerHTML = '';
                monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

                let date = 1;
                for (let i = 0; i < 6; i++) {
                    const row = document.createElement('tr');

                    for (let j = 0; j < 7; j++) {
                        const cell = document.createElement('td');
                        if (i === 0 && j < firstDay) {
                            cell.textContent = '';
                        } else if (date > daysInMonth) {
                            break;
                        } else {
                            cell.textContent = date;
                            if (date === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
                                cell.classList.add('current-date');
                            }
                            date++;
                        }
                        row.appendChild(cell);
                    }
                    calendarBody.appendChild(row);
                }
            }

            prevMonthButton.addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                updateCalendar();
            });

            nextMonthButton.addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                updateCalendar();
            });

            updateCalendar();
        });



        /*function fetchWeather(location) {
            const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    locationElement.textContent = data.name;
                    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                    descriptionElement.textContent = data.weather[0].description;
                    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
                    windspeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                    changeBackground(data.weather[0].main);
                    document.getElementById('weather-icon').src = `Images/illustrations/${data.weather[0].main.toLowerCase()}.svg`;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }*/


        // script.js
        document.addEventListener('DOMContentLoaded', () => {
            const apiKey = '9464c3a77ad1248d3a6cde776e625118';

            function fetchForecastData(city, apiKey) {
                const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        displayForecastData(data);
                    })
                    .catch(error => console.error('Error fetching forecast data:', error));
            }

            function displayWeatherData(data) {
                const locationElement = document.getElementById('location');
                const temperature = document.getElementById('temperature');
                const humidity = document.getElementById('humidity');
                const windSpeed = document.getElementById('wind-speed');
                const description = document.getElementById('description');
                const weatherIcon = document.getElementById('weather-icon');
                const windVane = document.getElementById('wind-vane');
                const currentTime = document.getElementById('current-time');

                locationElement.textContent = ` ${data.name}, ${data.sys.country}`;
                temperature.textContent = ` ${data.main.temp} °C`;
                humidity.textContent = `Humidity: ${data.main.humidity} %`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                description.textContent = ` ${data.weather[0].description}`;
                weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                weatherIcon.alt = data.weather[0].description;
                const windDegree = data.wind.deg;

                // Display current time
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                currentTime.textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
            }

            function displayForecastData(data) {
                const forecastContainer = document.getElementById('forecast-container');
                forecastContainer.innerHTML = '';

                // Filter the forecast data to show one entry per day at 12:00
                const forecastList = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

                // Display only the next 5 days including today
                const nextFiveDays = forecastList.slice(0, 5);

                nextFiveDays.forEach(forecast => {
                    const forecastDay = document.createElement('div');
                    forecastDay.classList.add('forecast-day');

                    const date = new Date(forecast.dt_txt);
                    const day = date.toLocaleDateString(undefined, { weekday: 'long' });
                    const temperature = forecast.main.temp;
                    const description = forecast.weather[0].description;
                    const humidity = forecast.main.humidity;
                    const windspeed = forecast.wind.speed;
                    const iconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

                    forecastDay.innerHTML = `
                <h3>${day}</h3>
                <img src="${iconUrl}" alt="${description}">
                <h2> ${temperature} °C</h2>
                <h4>${description}</h4>
                <h4> Humidity: ${humidity} %</h4>
                <h4> Wind speed: ${windspeed} m/s </h4>
            `;

                    forecastContainer.appendChild(forecastDay);
                });
            }

            // Get the user's current location and fetch weather data
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            displayWeatherData(data);
                            fetchForecastData(data.name, apiKey);
                        })
                        .catch(error => console.error('Error fetching weather data:', error));
                });
            }
        });


        /*
                  function fetchForecast(location) {
                       const url = `${forecastUrl}?q=${location}&appid=${apiKey}&units=metric`;
                       fetch(url)
                           .then(response => response.json())
                           .then(data => {
                               forecastElement.innerHTML = '';
                               const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
                               forecastList.slice(0, 7).forEach(day => {
                                   const forecastDay = document.createElement('div');
                                   forecastDay.classList.add('forecast-day');
                                   const dayName = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
                                   forecastDay.innerHTML = `
                                       <h3>${dayName}</h3>
                                       <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
                                       <p>Temp: ${Math.round(day.main.temp)}°C</p>
                                       <p>${day.weather[0].description}</p>
                                       <img src="Images/illustrations/${day.weather[0].main.toLowerCase()}.jpg" alt="${day.weather[0].main}">
                                   `;
                                   forecastElement.appendChild(forecastDay);
                               });
                           })
                           .catch(error => {
                               console.error('Error fetching forecast data:', error);
                           });
                   } 
        
                function fetchCurrentLocationWeather() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(position => {
                            const { latitude, longitude } = position.coords;
                            const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                            fetch(url)
                                .then(response => response.json())
                                .then(data => {
                                    locationElement.textContent = data.name;
                                    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                                    descriptionElement.textContent = data.weather[0].description;
                                    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
                                    windspeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                                    changeBackground(data.weather[0].main);
                                    document.getElementById('weather-icon').src = `Images/illustrations/${data.weather[0].main.toLowerCase()}.jpg`;
                                })
                                .catch(error => {
                                    console.error('Error fetching current location weather data:', error);
                                }); 
        
                            const forecastUrlWithCoords = `${forecastUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                            fetch(forecastUrlWithCoords)
                                .then(response => response.json())
                                .then(data => {
                                    forecastElement.innerHTML = '';
                                    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
                                    forecastList.slice(0, 7).forEach(day => {
                                        const forecastDay = document.createElement('div');
                                        forecastDay.classList.add('forecast-day');
                                        const dayName = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
                                        forecastDay.innerHTML = `
                                            <img class="day-icon" src="Images/illustrations/${day.weather[0].main.toLowerCase()}.jpg" alt="${day.weather[0].main}">
                                             <h3>${dayName}</h3>
                                            <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
                                            <p>Temp: ${Math.round(day.main.temp)}°C</p>
                                            <p>${day.weather[0].description}</p>
                                        `;
                                        forecastElement.appendChild(forecastDay);
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching forecast data:', error);
                                });
                        });
                    } else {
                        console.error('Geolocation is not supported by this browser.');
                    }
                }*/

        // script.js
        document.addEventListener('DOMContentLoaded', () => {
            const apiKey = '9464c3a77ad1248d3a6cde776e625118';


            const searchButton = document.getElementById('search-btn');
            const cityInput = document.getElementById('city-input');

            searchButton.addEventListener('click', () => {
                const city = cityInput.value;
                fetchWeatherData(city, apiKey);
            });

            function fetchWeatherData(city, apiKey) {
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        displayWeatherData(data);
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
            }

            function displayWeatherData(data) {
                const locationElement = document.getElementById('location');
                const temperature = document.getElementById('temperature');
                const humidity = document.getElementById('humidity');
                const windSpeed = document.getElementById('wind-speed');
                const description = document.getElementById('description');
                const weatherIcon = document.getElementById('weather-icon');
               

                locationElement.textContent = ` ${data.name}, ${data.sys.country}`;
                temperature.textContent = ` ${data.main.temp} °C`;
                humidity.textContent = `Humidity: ${data.main.humidity} %`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                description.textContent = ` ${data.weather[0].description}`;
                weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                weatherIcon.alt = data.weather[0].description;
                // Set wind vane direction based on wind degree
                const windDegree = data.wind.deg;
            }

            // Get the user's current location and fetch weather data
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            displayWeatherData(data);
                        })
                        .catch(error => console.error('Error fetching weather data:', error));
                });
            }
        });



        document.addEventListener("DOMContentLoaded", function() {
             const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const today = new Date(); const dayName = days[today.getDay()];
             document.getElementById("day").innerText = dayName; });





        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
        }

        setInterval(updateTime, 1000);
        updateTime();

        /* function changeBackground(weather) {
            let backgroundUrl = '';
            switch (weather.toLowerCase()) {
                case 'clear':
                    backgroundUrl = 'Images/illustrations/clear sky.jpg';
                    break;
                case 'heavy rain':
                    backgroundUrl = 'Images/illustrations/heavy rain.jpg';
                    break;
                case 'clouds':
                    backgroundUrl = 'Images/illustrations/darkcloud.jpg';
                    break;
                case 'rain':
                    backgroundUrl = 'Images/illustrations/rain.jpg';
                    break;
                case 'light rain':
                    backgroundUrl = 'Images/illustrations/light rain.jpg';
                    break;
                case 'snow':
                    backgroundUrl = 'Images/illustrations/snow.jpg';
                    break;
                case 'thunderstorm':
                    backgroundUrl = 'Images/illustrations/thunderstorm.jpg';
                    break;
                default:
                    backgroundUrl = 'Images/illustrations/sky clea.jpg';
                    break;
            }
            document.getElementById('currentWeatherIcon').style.backgroundImage = `url(${backgroundUrl})`;
        }*/

          function toggleDropdown(event) {
            event.stopPropagation(); // Prevent the click event from propagating to the body
            var dropdown = document.getElementById("myDropdown");
            if (dropdown.style.display === "none" || dropdown.style.display === "") {
                dropdown.style.display = "block";
            } else {
                dropdown.style.display = "none";
            }
        }

        // Function to hide the dropdown
        function hideDropdown() {
            var dropdown = document.getElementById("myDropdown");
            dropdown.style.display = "none";
        }

        // Add event listeners
        document.getElementById("dropdownButton").addEventListener("click", toggleDropdown);
        document.body.addEventListener("click", hideDropdown);


    const images = [
        ' url(Images/illustrations/image\ 5.jpg)', // Replace with your image URLs
        ' (Images/illustrations/world\ map.jpeg',
        'Images/illustrations/image\ 5.jpg'
    ];

    let currentIndex = 0;

    function changeBackground() {
        document.body.style.backgroundImage = `url(${images[currentIndex]})`;
        currentIndex = (currentIndex + 1) % images.length;
    }

    setInterval(changeBackground, 5000); // Change image every 5 seconds
    changeBackground(); // Set initial background





       
