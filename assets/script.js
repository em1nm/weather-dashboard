let key = '77dc5ebc256a7aa57e335dc878ece7c7';
// Displays Current Date
let current = dayjs().format('MM/DD/YYYY');
// let futre = dayjs().add(i, 'day');
$('#currentDate').text(current);
// Get the value of oldSearches and create an empty array
let prevSearches = JSON.parse(localStorage.getItem('prevSearches')) || [];
let searchHistoryId = $('#search-history');
// Update headers with context of input & save to localStorage when button is clicked 
$('#searchBtn').click(function () {
    // Push the value of location 
    prevSearches.push($('#location').val());
    // Change array into a string
    let oldSearchesStr = JSON.stringify(prevSearches);
    // Store the string in local storage
    localStorage.setItem('prevSearches', oldSearchesStr);
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val($('#location').val());
    searchHistoryId.append(newBtn);
    removeForecast();
    dailyWeather();
    forecast();
});

// create buttons based on what's stored
$.each(prevSearches, function (i, value) {
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val(value);
    searchHistoryId.append(newBtn);
});

// search-history container
searchHistoryId.on('click', '.historyBtn', function () {
    $('#city').text($(this).val());
    removeForecast();
});

// Create a clear history 
const clearHistory = $('<input type="button" class="btn btn-danger col-12 mb-2" id="clearHistory" />');
clearHistory.val('Clear History');
$('#historyFooter').append(clearHistory);

$('#clearHistory').click(function () {
    // Clear local storage
    localStorage.removeItem('prevSearches');

    // Remove history button
    $('.historyBtn').remove();
});

//update the value of dailyWeather 
searchHistoryId.on('click', '.historyBtn', function () {
    const cityName = $(this).val();
    $('#location').val(cityName); 
    dailyWeather(cityName);
    forecast(cityName);
});

function removeForecast() {
    for (let i = 0; i <= 5; i++) {
        $('#day' + i).remove();
    }
}

function dailyWeather() {
    let cityName = $('#location').val();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`)
        .then((response) => response.json())
        .then((data) => {
            // Updates Header
            $('#city').text(`${$('#location').val()}`);

            // Updates Body
            $('#dailyTemp').text(`Temp: ${data.main.temp} F`);
            $('#dailyWind').text(`Wind: ${data.wind.speed} Mph`);
            $('#dailyHumidity').text(`Humidity: ${data.main.humidity}%`);
            // Remove previous icons 
            $('#weatherIcon').empty();

            const weatherIcon = $(`<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`)
            $('#weatherIcon').append(weatherIcon);
        });
}

function forecast() {
    let cityName = $('#location').val();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 1; i <= 5; i++) {
                // Create card element
                const card = $('<div class="card mx-auto col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-2  m-1"></div>').attr('id', `day${i}`);
                // Create card header with incrementing date
                const header = $('<div class="card-header"></div>').text(`${dayjs().add(i, 'day').format("MM-DD-YYYY")}`);
                // Create card body
                const body = $('<div class="card-body"></div>');
                // Create group
                const li = $('<ul class="list-group list-group-flush"></ul>');
                // Add list items with IDs
                const weatherIcon = $(`<li class="list-group-item" id="forecastIcon${i}"><img src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png"></li>`)
                $('#forecastIcon').append(weatherIcon);
                let temp = $(`<li class="list-group-item" id="temp${i}"></li>`).text(data.list[i].main.temp + " F");
                let wind = $(`<li class="list-group-item" id="wind${i}"></li>`).text(data.list[i].wind.speed + " Mph");
                let humidity = $(`<li class="list-group-item" id="humidity${i}"></li>`).text(data.list[i].main.humidity + " %");
                // add list items to list group
                li.append(weatherIcon, temp, wind, humidity);
                // add list group to card body
                body.append(li);
                // add header and body to card
                card.append(header, body);
                // add card to target element
                $('#5day').append(card);

            }
        })
}
