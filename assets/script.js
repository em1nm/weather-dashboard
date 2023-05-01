let key = '77dc5ebc256a7aa57e335dc878ece7c7';
// Displays Current Date
let now = dayjs().format('MM/DD/YYYY');
// let futre = dayjs().add(i, 'day');
$('#currentDate').text(now);
// Get the value of oldSearches and create an empty array
let oldSearches = JSON.parse(localStorage.getItem('oldSearches')) || [];
let searchHistoryId = $('#search-history');
// Update headers with context of input & save to localStorage when button is clicked 
$('#searchBtn').click(function () {
    // Push the value of location 
    oldSearches.push($('#location').val());
    // Changes array into a string
    let oldSearchesStr = JSON.stringify(oldSearches);
    // Store the string in local storage
    localStorage.setItem('oldSearches', oldSearchesStr);
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val($('#location').val());
    searchHistoryId.append(newBtn);
    removeForecast();
    dailyWeather();
    forecast();
});


