document.addEventListener('DOMContentLoaded', function () {
    // Reference to main display container
    //const mainElement = $( '#main' );
    const mainElement = document.querySelector( '#main' );

    // Show the current day of the week, month and day of month
    const showDay = function () {
        // Target element for current day display
        const currentDay = document.querySelector('#currentDay');
        const dayText = moment().format('dddd, MMMM DD');
        currentDay.textContent = dayText;   
    };
    showDay();

    // Create rows on the page for each hour of the workday
    const showCalendar = () => {
        let notesForm, notesInput;
        let thisHour, timeString;

        // Loop from 0900 hours to 1700 hours
        for (i=9; i<=17; i++) {
            // Display as 12 hour time
            thisHour = moment(i+':00', 'HH:mm');
            timeString = thisHour.format('hA');

            // Insert a row to hold the hour, the note for that hour and the save button
            mainElement.insertAdjacentHTML('beforeend', `<div class='row' id=${timeString}></div>`);
            const hourRow = document.getElementById(timeString);

            // Add the hour column
            hourRow.insertAdjacentHTML(
                'beforeend', 
                `<div class='hour col-1 text-right p-3'>${timeString}</div>`
            );

            // Add the notes column
            // Check if we are printing notes for a past, present or future hour and set class for css coloring
            let noteClass;
            if (moment().diff(thisHour) > 3600000) {
                noteClass = 'past';    
            } else if (moment().diff(thisHour) < 3600000 && moment().diff(thisHour) > 0) {
                noteClass = 'present';
            } else {
                noteClass = 'future';
            };

            hourRow.insertAdjacentHTML(
                'beforeend',
                `<div class='col-10 p-0 ${noteClass}' id='notes-${timeString}'></div>`
            );
            notesCol = document.getElementById(`notes-${timeString}`);

            hourRow.insertAdjacentHTML(
                'beforeend',
                `<div class='col-1 save saveBtn text-center p-3' data-time-string=${timeString}><i class='fas fa-save'></i></div>`
            );
            
            notesCol.innerHTML = `<form class="notes-form m-1"><input class='form-control-plaintext p-3' id='notes${timeString}' type='text'></form>`;
        };
    };
    showCalendar();

    // Show notes from localstorage on page
    const showNotes = () => {
        let allNotes;
        if (localStorage.getItem('allNotes')) {
            allNotes = JSON.parse(localStorage.getItem('allNotes'));
            const keys = Object.keys(allNotes);
            for (key of keys) {
                const thisNote = document.getElementById(`notes${key}`);
                thisNote.value = allNotes[key];
            };
        };
    };
    showNotes();

    // Function to save notes to a localstorage object
    const saveNote = function (dataTimeString) {
        let allNotes, thisNote;
        // Get note from the input field
        thisNote = document.getElementById(`notes${dataTimeString}`).value;

        // Get notes object if existing
        if (localStorage.getItem('allNotes')) {
            allNotes = JSON.parse(localStorage.getItem('allNotes'));
        } else {
            allNotes = {};
        };
        
        // Add this note to the notes object
        allNotes[dataTimeString] = thisNote;

        // Save the notes object to local storage
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
    };
    
    // Bind a function to save the notes from the same row when save button is clicked
    // Get an array of all the save buttons
    const allSaveButtons = Array.prototype.slice.call(document.querySelectorAll('.save'));
    for (const saveButton of allSaveButtons) {
        // Add an event listener to save the note on click
        saveButton.addEventListener('click', function (event) {
            const dataTimeString = saveButton.getAttribute('data-time-string');
            saveNote(dataTimeString);
        });
    };

    // Do nothing when enter key is pressed in a notes field, we want to save with the save button instead
    $( '.notes-form').on('submit', function (event) {
        event.preventDefault();
    });
});