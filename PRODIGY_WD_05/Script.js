const container = document.querySelector('.container');
const search = document.querySelector('.searchbox button');
const weatherBox = document.querySelector('.weatherbox');
const weatherDetails = document.querySelector('.weather_details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
	const APIKey = '69e175209a9d002205f91ad685830dd8';
	const city = document.querySelector('.searchbox input').value;

	if (city === '') return;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
		.then(response => response.json())
		.then(json => {

			if(json.cod == '404')
			{
				container.style.height = '400px';
				weatherBox.classList.remove('active');
				weatherDetails.classList.remove('active');
				error404.classList.add('active');
				return;
			}
			container.style.height = '555px';
			weatherBox.classList.add('active');
			weatherDetails.classList.add('active');
			error404.classList.remove('active');

			const image = document.querySelector('.weatherbox img');
			const temperature = document.querySelector('.weatherbox .temperature'); // Corrected the selector
			const description = document.querySelector('.weatherbox .description'); // Corrected the selector
			const humidity = document.querySelector('.weather_details .humidity span');
			const wind = document.querySelector('.weather_details .wind span');

			switch (json.weather[0].main) {
				case 'Clear':
					image.src = 'images/clear.png';
					break;
				case 'Rain':
					image.src = 'images/rain.png';
					break;
				case 'Snow':
					image.src = 'images/snow.png';
					break;
				case 'Clouds':
					image.src = 'images/clouds.png';
					break;
				case 'Mist':
				case 'Haze':
					image.src = 'images/mist.png';
					break;
				default:
					image.src = 'images/search.png';
			}

			temperature.innerHTML = `${json.main.temp}°C`; // Update the temperature content
			description.innerHTML = json.weather[0].description; // Update the description content
			humidity.innerHTML = `${json.main.humidity}%`; // Update the humidity content

			wind.innerHTML = json.wind.speed; // Update the wind content
		});
});
