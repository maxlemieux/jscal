$(document).ready(function() {
    // Reference to main display container
    mainElement = $( "#main" );
    
    // Show the current day of the week, month and day of month
    const showCurrentDay = () => {
        // Target element for current day display
        currentDay = $( "#currentDay" );
        dayText = moment().format('dddd, MMMM DD');
        currentDay.text(dayText);   
    };
    showCurrentDay();

    // Create rows on the page for each hour of the workday
    const showCalendar = () => {
        let hourRow = "";
        let timeCol = "";
        let notesCol = "";
        let saveCol = "";

        let notesForm = "";
        let notesInput = "";

        let timeString = "";
        // Loop from 0900 hours to 1700 hours
        for (i=9; i<=17; i++) {
            // Display as 12 hour time
            timeString = moment(i+":00", 'HH:mm').format('hA');
            hourRow = $( "<div>" );
            hourRow.attr("class", "row");
            hourRow.attr("id", timeString);
            mainElement.append(hourRow);

            // Add three columns to each row for the time, the notes field and the save button
            timeCol = $( "<div>" );
            timeCol.attr("class", "col-md-1 text-right p-3");
            timeCol.css("border-style", "dashed none none none");
            timeCol.css("border-color", "grey");
            timeCol.text(timeString);
            hourRow.append(timeCol);

            notesCol = $( "<div>" );
            notesCol.attr("class", "col-md-10 p-0");
            notesCol.css("background-color", "silver");
            hourRow.append(notesCol);

            saveCol = $( "<div>" );
            saveCol.attr("class", "col-md-1 rounded-right text-center p-3");
            saveCol.css("background-color", "teal");
            saveCol.html("<h3><span class='fas fa-save'></span></h3>");
            hourRow.append(saveCol);

            // Add input field to notesCol
            notesForm = $( "<form class='m-1'></form>" );
            notesForm.css("height", "90%");
            notesCol.append(notesForm);
            /*
            notesInput = $( `<div class='form-group p-0 m-0'>\
                                <input class='form-control-plaintext m-0' id='notes${timeString}' type='text'>\
                            </div>` );
            */
            notesInput = $( `<input class='form-control-plaintext p-3' id='notes${timeString}' type='text'>` );
            notesInput.css("height", "100%");
            notesForm.append(notesInput);
    
        };
    };
    showCalendar();
});