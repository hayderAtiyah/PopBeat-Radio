let reportCounter = 0;
let assignDJCounter = 0;
let assignDJArr = [];

let log = console.log;

let DjsAssigned = [];

function assignDj(name, song, date) {
    this.name;
    this.song;
    this.date;
};
let editBox = document.getElementById("editBox");
let editRadioGroup = document.getElementById("radio-group");
let songAssignByDjFelid = document.getElementById("song");
let addSongButton = document.getElementById("addSongButton");
let editCalander = document.getElementById("editCalander");



/**
 * method to display the report whenever it gets one.
 * @param {to keep track of the current report, will be changed to stored in data base later} reportCounter
 */
function generateReportTable(reportCounter) {
    if (reportCounter == 6) return;
    setTimeout(() => {
        reportCounter++;

        let tr = document.createElement("tr");

        //first part of the row.
        let td1 = document.createElement("td");
        let span1 = document.createElement("span");
        let p1 = document.createElement("p");
        p1.className = "dateOfAssign";
        p1.textContent = "mm/dd/yyyy";
        span1.appendChild(p1);
        td1.textContent = "song was Assigned by Producer ";
        td1.appendChild(span1);
        tr.appendChild(td1);

        //second part of the row

        let td2 = document.createElement("td");
        td2.textContent = "DJ did not played the song ";
        let button = document.createElement("button");
        let span2 = document.createElement("span");

        button.id = "reportView";
        button.textContent = "view details";

        span2.appendChild(button);
        td2.appendChild(span2);
        tr.appendChild(td2);
        const viewAll = document.getElementById("viewAll");
        document.getElementById("reportTable").insertBefore(tr, viewAll);
        //This is an example of Listener Approach.
        button.addEventListener("click", () => {
            document.getElementById("details-box").style.display = "block";
        });



        generateReportTable(reportCounter);
    }, 500);
}

/**
 * to cancel the view details after it been clicked.
 */
document.getElementById("details-button").addEventListener("click", () => {
        document.getElementById("details-box").style.display = "none";
    })
    /**
     * method to dynamically assign Dj to a song with a date. 
     */
function generateAssignDJ(DjName, song, date) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = DjName + " assigned to " + song + " " + date;
    let span = document.createElement("span");
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.textContent = "DELETE";
    // Remove the entire row
    deleteBtn.addEventListener("click", function() {
        tr.remove();
    });
    span.appendChild(deleteBtn);
    td.appendChild(span);
    tr.appendChild(td);
    assignDJArr.push(tr);
    log(assignDJArr);
    assignDJCounter++;
    document.getElementById("assignTable").appendChild(tr);
}


let keysPressed = {};
/**
 * method to create a shortcut of any two keys and buttons as featureID or it could be search bar.
 */
function shortCutTrigger(key1, key2, featureID) {
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key.toLowerCase()] = true;
        if (keysPressed[key1.toLowerCase()] && keysPressed[key2.toLowerCase()]) {
            event.preventDefault();
            document.getElementById(featureID).focus();
            document.getElementById(featureID).click();
            keysPressed[key1.toLowerCase()] = false;
            keysPressed[key2.toLowerCase()] = false;
            log("her");
        }
    })
    document.addEventListener("keyup", (event) => {
        keysPressed[event.key.toLowerCase()] = false;
    });
}



function restEditUI() {
    editBox.style.display = "none";
    editRadioGroup.style.display = "none";
    songAssignByDjFelid.style.display = "none";
    addSongButton.style.display = "none";
    editCalander.style.display = "none";
    songAssignByDjFelid.value = "";
    editRadioGroup.querySelectorAll("input").forEach(input => input.checked = false);
    editCalander.value = "";


}


function assignDjEdit() {
    restEditUI();

    document.addEventListener("click", () => {
        editBox.style.display = "block";
        editRadioGroup.style.display = "block";
        editRadioGroup.addEventListener("change", (event) => {
            event.preventDefault();
            const DjSelected = document.querySelector(":checked");
            if (DjSelected) {
                editRadioGroup.style.display = "none";

                songAssignByDjFelid.style.display = "block";
                addSongButton.style.display = "block";

                addSongButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (songAssignByDjFelid.value === "") {
                        return;
                    }
                    songAssignByDjFelid.style.display = "none";
                    editCalander.style.display = "block";

                    editCalander.addEventListener("change", (event) => {
                        const datePicked = event.target.value;
                        if (datePicked === "") {
                            return;
                        }
                        addSongButton.addEventListener("click", (event) => {
                            event.preventDefault();
                            const assignedDJ_to_Date = new assignDj(DjSelected.nextElementSibling.textContent, songAssignByDjFelid.value, datePicked);
                            DjsAssigned.push(assignedDJ_to_Date);

                            addSongButton.style.display = "none";
                            editCalander.style.display = "none";
                            generateAssignDJ(DjSelected.nextElementSibling.textContent, songAssignByDjFelid.value, datePicked);
                            addDiv.style.display = "block";
                            DjSelected = null;
                            datePicked = null;
                            editRadioGroup.removeEventListener("change", handleEditRadioGroupChange);
                            addSongButton.removeEventListener("click", handleAddSong);
                            editCalander.removeEventListener("change", handleEditCalanderChange);

                            log(DjsAssigned[0]);
                        }, { once: false })
                    }, { once: true });
                }, { once: false });
            }
        }, { once: true });
    }, { once: true });
}


document.getElementById("yesBtnId").addEventListener("click", () => {
    addDiv.style.display = "none";
    editBox.style.display = "block";
    editRadioGroup.style.display = "block";
    //before I go into this method I wanna make sure that everything so it will be brand new
    assignDjEdit();
});



document.getElementById("noBtnId").addEventListener("click", () => {
    restEditUI();
});







restEditUI();
generateReportTable(reportCounter);
//shortcut to search.
shortCutTrigger("shift", "f", "searchBox");
//shortcut to apply.
shortCutTrigger("shift", "enter", "applyKey");
generateAssignDJ("hayder", "laa", "11/06/2024");
generateAssignDJ("ali", "laa", "11/06/2024");
generateAssignDJ("ahmed", "laa", "11/06/2024");
assignDjEdit();