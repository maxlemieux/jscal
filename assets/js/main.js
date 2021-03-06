'use strict';
document.addEventListener('DOMContentLoaded', () => {
    /* Reference to main display container */
    const mainElement = document.querySelector('#main');
    
    /* Show the current day of the week, month and day of month */
    const showDay = () => {
        /* Target element for current day display */
        const currentDay = document.querySelector('#currentDay');
        const dayText = moment().format('dddd, MMMM DD');
        currentDay.textContent = dayText;   
    };

    /* Create rows on the page for each hour of the workday */
    const showCalendar = () => {
        let noteClass;
        
        /* Loop from 0900 hours to 1700 hours */
        for (let i=9; i<=17; i++) {
            /* Display as 12 hour time */
            const thisHour = moment(i+':00', 'HH:mm');
            const timeString = thisHour.format('hA');
            const hourDiff = moment().diff(thisHour);

            /* Insert a row to hold the hour, the note for that hour and the save button */
            mainElement.insertAdjacentHTML(
                'beforeend',
                `<div class='row' id='${timeString}'></div>`
            );
            const hourRow = document.getElementById(timeString);

            /* Add the hour column */
            hourRow.insertAdjacentHTML(
                'beforeend', 
                `<div class='hour col-1 text-right p-3'>${timeString}</div>`
            );

            /* Add the notes column */
            /* Check if we are printing notes for a past, present or future hour and set class for css coloring */
            /* Get the difference in milliseconds between the present moment and the hour we are printing for */
            if (hourDiff > 3600000) {
                noteClass = 'past';    
            } else if (hourDiff < 3600000 && hourDiff > 0) {
                noteClass = 'present';
            } else {
                noteClass = 'future';
            };
            /* Insert column for notes and get a reference to it as notesCol */
            hourRow.insertAdjacentHTML(
                'beforeend',
                `<div class='col-10 p-0 ${noteClass}' id='notes-${timeString}'></div>`
            );
            const notesCol = document.getElementById(`notes-${timeString}`);

            /* Insert textarea for notes */
            const inputString = `<textarea class='form-control-plaintext p-3' id='notes${timeString}' />`;
            notesCol.innerHTML = inputString;

            /* Insert save button */
            hourRow.insertAdjacentHTML(
                'beforeend',
                `<div class='col-1 saveBtn text-center p-3' data-time-string=${timeString}><i class='fas fa-save'></i></div>`
            );
        };
    };
  
    /* Show notes from local storage on page */
    const showNotes = () => {
        /* If there's a notes object in local storage, use it to get notes and display them */
        if (localStorage.getItem('allNotes')) {
            const allNotes = JSON.parse(localStorage.getItem('allNotes'));
            /* Notes are keyed by the hour */
            const keys = Object.keys(allNotes);
            for (const key of keys) {
                /* Get reference to the input field matching the note for this hour */
                const thisNote = document.getElementById(`notes${key}`);
                thisNote.value = allNotes[key];
            };
        };
    };

    /* Save notes to a local storage object */
    const saveNote = dataTimeString => {
        /* Get note from the value of the input field */
        const thisNote = document.getElementById(`notes${dataTimeString}`).value;
        let allNotes = {};

        /* Get notes object from local storage if existing */
        if (localStorage.getItem('allNotes')) {
            allNotes = JSON.parse(localStorage.getItem('allNotes'));
        };

        /* Add this note to the notes object */
        allNotes[dataTimeString] = thisNote;

        /* Save the notes object to local storage */
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
    };
    
    /* Set up event listeners */
    const addListeners = () => {
        /* Get an array of all the save buttons */
        const allSaveButtons = Array.prototype.slice.call(document.querySelectorAll('.saveBtn'));

        /* Bind a function to save the notes from the same row when save button is clicked */
        for (const saveButton of allSaveButtons) {
            /* Add an event listener to save the note on click */
            saveButton.addEventListener('click', function (event) {
                const dataTimeString = saveButton.getAttribute('data-time-string');
                saveNote(dataTimeString);
            });
        };
    };
    
    /* Build the page! */
    showDay();
    showCalendar();
    showNotes();
    addListeners();
});