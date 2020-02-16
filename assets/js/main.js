$(document).ready(function() {
    // Show the current day of the week, month and day of month
    const showCurrentDay = () => {
        // Target element for current day display
        currentDay = $( "#currentDay" );
        dayText = moment().format('dddd, MMMM DD');
        currentDay.text(dayText);   
    };
    showCurrentDay();

    
});