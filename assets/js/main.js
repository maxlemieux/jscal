document.addEventListener('DOMContentLoaded', function () {
    // Reference to main display container
    const mainElement = $( '#main' );
    
    // Show the current day of the week, month and day of month
    const showDay = function () {
        // Target element for current day display
        const currentDay = $( '#currentDay' );
        const dayText = moment().format('dddd, MMMM DD');
        currentDay.text(dayText);   
    };
    showDay();

    // Create rows on the page for each hour of the workday
    const showCalendar = function () {
        let notesForm, notesInput;
        let thisHour, timeString;

        // Loop from 0900 hours to 1700 hours
        for (i=9; i<=17; i++) {
            // Display as 12 hour time
            thisHour = moment(i+':00', 'HH:mm');
            timeString = thisHour.format('hA');
            const hourRow = $( '<div>' );
            hourRow.attr('class', 'row');
            hourRow.attr('id', timeString);
            mainElement.append(hourRow);

            // Add three columns to each row for the time, the notes field and the save button
            const timeCol = $( '<div>' );
            timeCol.attr('class', 'col-1 text-right p-3');
            timeCol.css('border-style', 'dashed none none none');
            timeCol.css('border-color', 'grey');
            timeCol.text(timeString);
            hourRow.append(timeCol);

            const notesCol = $( '<div>' );
            notesCol.attr('class', 'col-10 p-0');

            // Check if we are printing a past, present or future hour and set background color
            if (moment().diff(thisHour) > 3600000) {
                notesCol.css('background-color', 'silver');    
            } else if (moment().diff(thisHour) < 3600000 && moment().diff(thisHour) > 0) {
                notesCol.css('background-color', 'DarkSalmon');
            } else {
                notesCol.css('background-color', 'DarkSeaGreen');
            };

            hourRow.append(notesCol);

            const saveCol = $( '<div>' );
            saveCol.attr('class', 'col-1 rounded-right text-center p-3 save');
            saveCol.attr('data-time-string', timeString);
            saveCol.css('background-color', 'teal');
            saveCol.html('<h3><span class="fas fa-save"></span></h3>');
            hourRow.append(saveCol);

            // Add input field to notesCol
            notesForm = $( '<form>' );
            notesForm.attr('class', 'notes-form m-1');
            notesForm.css('height', '90%');
            notesCol.append(notesForm);
            notesInput = $( `<input id='notes${timeString}' type='text'>` );
            notesInput.attr('class', 'form-control-plaintext p-3');
            notesInput.css('height', '100%');
            notesForm.append(notesInput);
        };
    };
    showCalendar();

    // Show notes from localstorage on page
    const showNotes = function () {
        let allNotes;
        if (localStorage.getItem('allNotes')) {
            allNotes = JSON.parse(localStorage.getItem('allNotes'));
            const keys = Object.keys(allNotes);
            for (key of keys) {
                //console.log(allNotes[key]);
                $( `#notes${key}` ).val(allNotes[key]);
            };
        };
    };
    showNotes();

    // Function to save notes to a localstorage object
    const saveNote = function (dataTimeString) {
        let allNotes, thisNote;
        thisNote = $( `#notes${dataTimeString}` ).val();
        console.log(thisNote);
        // Get notes object if existing
        if (localStorage.getItem('allNotes')) {
            allNotes = JSON.parse(localStorage.getItem('allNotes'));
        } else {
            allNotes = {};
        };
        allNotes[dataTimeString] = thisNote;
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
    };
    
    // Bind a function to save the notes from the same row when save button is clicked
    $( '.save' ).on('click', function () {
        let dataTimeString;
        dataTimeString = $(this).attr('data-time-string');
        saveNote(dataTimeString);
    });

    // Do nothing when enter key is pressed in a notes field, we want to save with the save button instead
    $( '.notes-form').on('submit', function (event) {
        event.preventDefault();
    });
});