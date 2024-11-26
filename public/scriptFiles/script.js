let reportCounter = 0;
let assignDJCounter = 0;
let assignDJArr = [];

let log = console.log;

let DjsAssigned = [];

function assignDj(name, song, date) {
    this.name = name;
    this.song = song;
    this.date = date;
};
let editBox = document.getElementById("editBox");
let editRadioGroup = document.getElementById("radio-group");
let songAssignByDjFelid = document.getElementById("song");
let addSongButton = document.getElementById("addSongButton");
let editCalander = document.getElementById("editCalander");
let addDiv = document.getElementById("addDiv");
let DjSelected = null;
let datePicked = null;

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
    }, 5000);
}

/**
 * to cancel the view details after it been clicked.
 */


/*
document.getElementById("details-button").addEventListener("click", () => {
        document.getElementById("details-box").style.display = "none";
    })
*/

let tempDeleted = [];
/**
 * method to dynamically assign Dj to a song with a date. 
 */
function generateAssignDJ(DjName, song, date) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = `${DjName} assigned to ${song} on ${date}`;

    let span = document.createElement("span");
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.textContent = "DELETE";

    deleteBtn.addEventListener("click", function () {
        tr.remove();
        tempDeleted.push({
            djName: DjName,
            djSong: song,
            djDate: date
        });
    });

    span.appendChild(deleteBtn);
    td.appendChild(span);
    tr.appendChild(td);
    assignDJArr.push(tr);
    log(assignDJArr);
    assignDJCounter++;
    if (document.getElementById("assignTable") == true) {
        console.log("found it");
    }
    document.getElementById("assignTable").appendChild(tr);
}


document.getElementById("applyKey").addEventListener("click", () => {
    var check = false;
    fetch('/api/deleteApplied', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deleted: tempDeleted
            })
        })
        .then(res => {
            if (res.ok) {
                console.log("Delete array sent");
                check = true;
                tempDeleted = [];
            } else {
                console.log("Could not send delete array");
            }
        })
        .catch(error => {
            console.log("Error applying the changes:", error);
        });

    if (check == true) {
        alert("Changes applied.");
    } else {
        alert("no updates happens.");
    }

});



document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/api/assignedDjs');
        const assignedDjs = await response.json();

        assignedDjs.forEach(dj => {
            generateAssignDJ(dj.djName, dj.songName, dj.dateOfAssign);
        });
    } catch (error) {
        console.error("Error fetching assigned DJs:", error);
    }
});



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
    // Hide all elements
    editBox.style.display = "none";
    editRadioGroup.style.display = "none";
    songAssignByDjFelid.style.display = "none";
    addSongButton.style.display = "none";
    editCalander.style.display = "none";
    addDiv.style.display = "none";

    // Clear all input values and selections
    songAssignByDjFelid.value = "";
    editCalander.value = "";
    editRadioGroup.querySelectorAll("input").forEach(input => input.checked = false);

}

/**
 * method to assign new Dj to a song and date from the user.
 */
function assignDjEdit() {
    document.getElementById("editBtnKey").addEventListener("click", () => {
        editBox.style.display = "block";
        editRadioGroup.style.display = "block";
        let songError = createErrorMsg("songError", songAssignByDjFelid);
        let dateError = createErrorMsg("dateError", editCalander);

        editRadioGroup.addEventListener("change", (event) => {
            event.preventDefault();
            DjSelected = document.querySelector(":checked");

            if (DjSelected) {
                editRadioGroup.style.display = "none";
                songAssignByDjFelid.style.display = "block";
                addSongButton.style.display = "block";

                addSongButton.addEventListener("click", (event) => {
                    event.preventDefault();

                    // Validate song input
                    if (songAssignByDjFelid.value === "") {
                        songError.textContent = "Please enter a song name.";
                        return;
                    } else {
                        songError.textContent = "";
                    }

                    songAssignByDjFelid.style.display = "none";
                    editCalander.style.display = "block";

                    editCalander.addEventListener("change", (event) => {
                        datePicked = event.target.value;

                        let today = new Date();
                        let todayDate = today.getFullYear() + "-" +
                            String(today.getMonth() + 1).padStart(2, "0") + "-" +
                            String(today.getDate()).padStart(2, "0");

                        // Validate date input
                        if (datePicked === "" || datePicked < todayDate) {
                            dateError.textContent = "Please select a valid future date.";
                        } else {
                            dateError.textContent = ""; // Clear any existing error

                            // Only proceed when both fields are valid
                            let assignedDJ_to_Date = new assignDj(
                                DjSelected.nextElementSibling.textContent,
                                songAssignByDjFelid.value,
                                datePicked
                            );

                            DjsAssigned.push(assignedDJ_to_Date);
                            generateAssignDJ(DjSelected.nextElementSibling.textContent, songAssignByDjFelid.value, datePicked);

                            addSongButton.style.display = "none";
                            editCalander.style.display = "none";
                            addDiv.style.display = "block";

                            DjSelected = null;
                            datePicked = null;
                        }
                    });
                });
            }
        });
    });
}

function createErrorMsg(id, element) {
    let errorMsg = document.createElement("span");
    errorMsg.id = id;
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "18px";
    element.parentNode.insertBefore(errorMsg, element.nextSibling);
    return errorMsg;
}






/*
document.getElementById("yesBtnId").addEventListener("click", () => {
    restEditUI();
    addDiv.style.display = "none";
    editBox.style.display = "block";
    editRadioGroup.style.display = "block";

    DjSelected = null;
    editRadioGroup.querySelectorAll("input").forEach(input => input.checked = false);

    assignDjEdit();
});




document.getElementById("noBtnId").addEventListener("click", () => {
    restEditUI();
    assignDjEdit();
});



function loadExistingAssignments() {
    const savedAssignments = JSON.parse(localStorage.getItem("DjsAssigned"));
    if (savedAssignments) {
        DjsAssigned = savedAssignments;
        DjsAssigned.forEach(dj => {
            generateAssignDJ(dj.name, dj.song, dj.date);
        });
    }
}

let checkQuestionClicked = false;
const questionsInstance = new Questions();

const questionList = document.getElementById("QuestionList");
const questionButton = document.getElementById("questionKey");

questionButton.addEventListener("click", () => {
    if (checkQuestionClicked) {
        questionList.style.display = "none";
        checkQuestionClicked = false;
    } else {
        questionList.style.display = "block";

        if (questionList.children.length === 0) {
            questionsInstance.getAll().forEach(qa => {
                const questionCard = document.createElement("div");
                questionCard.classList.add("question-card");

                const questionText = document.createElement("div");
                questionText.classList.add("question-text");
                questionText.textContent = qa.question;

                const answerText = document.createElement("div");
                answerText.classList.add("answer-text");
                answerText.textContent = qa.answer;

                questionCard.appendChild(questionText);
                questionCard.appendChild(answerText);

                questionCard.addEventListener("click", () => {
                    questionCard.classList.toggle("active");
                });

                questionList.appendChild(questionCard);
            });
        }
        checkQuestionClicked = true;
    }
});

*/

//loadExistingAssignments();
//restEditUI();

//generateReportTable(reportCounter);
//shortcut to search.
shortCutTrigger("shift", "f", "searchBox");
//shortcut to apply.
shortCutTrigger("shift", "enter", "applyKey");

//assignDjEdit();