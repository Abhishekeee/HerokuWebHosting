const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const submitBtn = document.getElementById('submitBtn');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const day = document.getElementById('day');
const today = document.getElementById('today');
const show = document.querySelector('.data_hide');

// To add Enter button Functionality
cityName.addEventListener('keypress', (e) => e.key === 'Enter' ? document.getElementById('submitBtn').click() : null)

// Dealing with day and Month
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const d = new Date();
day.innerText = days[d.getDay()];
today.innerText = `${d.getDate()} ${months[d.getMonth()]}`;

const getInfo = async () => {
    let cityVal = cityName.value;
    if (cityVal === '') {
        city_name.innerText = `Please write city name before search`;
        show.style = "visibility:hidden";
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6c149de54c9c26c28579020ecb2ced5e`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // Setting Temperature and City name
            temp.innerHTML = `${arrData[0].main.temp} &deg;C`;
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            // Dealing with weather ICONS
            const Temp_status = arrData[0].weather[0].main;
            if (Temp_status == 'Haze')
                temp_status.innerHTML = `<i class="bi bi-cloud-haze-fill"></i>`;
            else if (Temp_status == 'Clouds')
                temp_status.innerHTML = `<i class="bi bi-cloud-fill"></i>`;
            else if (Temp_status == 'Rain')
                temp_status.innerHTML = `<i class="bi bi-cloud-drizzle-fill text-info"></i>`;
            else
                temp_status.innerHTML = `<i class="bi bi-brightness-high-fill text-warning"></i>`;

            show.style = "visibility:visible";

        } catch (error) {
            city_name.innerText = `Please Enter the city name properly`;
            show.style = "visibility:hidden";
        }
    }
}
submitBtn.addEventListener('click', getInfo);