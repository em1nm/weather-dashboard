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
    // Stores the string in local storage
    localStorage.setItem('oldSearches', oldSearchesStr);
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val($('#location').val());
    searchHistoryId.append(newBtn);
    removeForecast();
    dailyWeather();
    forecast();
});

// create buttons based on what's stored
$.each(oldSearches, function (i, value) {
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
    localStorage.removeItem('oldSearches');

    // Remove history button
    $('.historyBtn').remove();
});

