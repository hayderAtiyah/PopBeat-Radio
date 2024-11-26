let reportCounter = 0;
let assignDJCounter = 0;
let assignDJArr = [];

let log = console.log;

let DjsAssigned = [];

function assignDj(name, song, date) {
    this.name = name;
    //this.song = song;
    this.date = date;
};
let editBox = document.getElementById("editBox");
editBox.style.block = "none";
let editRadioGroup = document.getElementById("radio-group");
//let songAssignByDjFelid = document.getElementById("song");
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
function generateAssignDJ(djName, date) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = `${djName} assigned on ${date}`;

    let span = document.createElement("span");
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.textContent = "DELETE";

    deleteBtn.addEventListener("click", function() {
        tr.remove();
        tempDeleted.push({
            djName: djName,
            djDate: date
        });
    });

    span.appendChild(deleteBtn);
    td.appendChild(span);
    tr.appendChild(td);
    assignDJArr.push(tr);
    log(assignDJArr);
    assignDJCounter++;
    document.getElementById("assignTable").appendChild(tr);
}



async function availableDjsGenerate() {
    let radioGroup = document.getElementById('radio-group');
    radioGroup.innerHTML = ''; // Clear existing content

    let legend = document.createElement('legend');
    legend.textContent = "Available Djs to assign:";
    radioGroup.appendChild(legend);

    try {
        const response = await fetch('/api/availableDjs');
        const availableDjs = await response.json();

        availableDjs.forEach((dj, index) => {
            // Create the radio input
            let radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'radio-group';
            radioInput.id = `radio-${index + 1}`;
            radioInput.value = dj.name;

            // Create the label
            let label = document.createElement('label');
            label.htmlFor = `radio-${index + 1}`;
            label.textContent = dj.name;

            // Append elements to the fieldset
            radioGroup.appendChild(radioInput);
            radioGroup.appendChild(label);
        });
    } catch (error) {
        console.error("Error fetching Available DJs:", error);
    }
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
    // Hide all elements
    editBox.style.display = "none";
    editRadioGroup.style.display = "none";
    //songAssignByDjFelid.style.display = "none";
    //addSongButton.style.display = "none";
    editCalander.style.display = "none";
    addDiv.style.display = "none";

    // Clear all input values and selections
    // songAssignByDjFelid.value = "";
    editCalander.value = "";
    editRadioGroup.querySelectorAll("input").forEach(input => input.checked = false);

}
let tempAdded = [];

/**
 * method to assign new Dj to a song and date from the user.
 */
function assignDjEdit() {
    document.getElementById("editBtnKey").addEventListener("click", () => {
        editBox.style.display = "block";
        editRadioGroup.style.display = "block";
        let dateError = createErrorMsg("dateError", editCalander);

        editRadioGroup.addEventListener("change", (event) => {
            event.preventDefault();
            DjSelected = document.querySelector(":checked");

            if (DjSelected) {
                editRadioGroup.style.display = "none";
                editCalander.style.display = "block";

                editCalander.addEventListener("change", (event) => {
                    datePicked = event.target.value;

                    let today = new Date();
                    let todayDate = today.getFullYear() + "-" +
                        String(today.getMonth() + 1).padStart(2, "0") + "-" +
                        String(today.getDate()).padStart(2, "0");


                    if (datePicked === "" || datePicked < todayDate) {
                        dateError.textContent = "Please select a valid future date.";
                    } else {
                        dateError.textContent = "";

                        let assignedDJ_to_Date = new assignDj(
                            DjSelected.nextElementSibling.textContent,
                            datePicked
                        );
                        DjsAssigned.push(assignedDJ_to_Date);
                        generateAssignDJ(DjSelected.nextElementSibling.textContent, datePicked);
                        tempAdded.push({
                            djName: String(DjSelected.nextElementSibling.textContent),
                            dateOfAssign: String(datePicked)
                        });
                        editCalander.style.display = "none";
                        addDiv.style.display = "block";
                        DjSelected = null;
                        datePicked = null;
                    }
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
            generateAssignDJ(dj.name, dj.date);
        });
    }
}


document.getElementById("applyKey").addEventListener("click", () => {
    var check = false;
    fetch('/api/deletedApplied', {
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

                tempDeleted = [];
            } else {
                console.log("Could not send delete array");
            }
        })
        .catch(error => {
            console.log("Error applying the changes:", error);
        });


    fetch('/api/addedApplied', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                added: tempAdded
            })
        })
        .then(res => {
            if (res.ok) {
                console.log("added array sent");

                tempAdded = [];
            } else {
                console.log("Could not send added array");
            }
        })
        .catch(error => {
            console.log("Error applying the changes:", error);
        });

    alert("Changes applied.");


});



document.addEventListener("DOMContentLoaded", async() => {
    try {
        const response = await fetch('/api/assignedDjs');
        const assignedDjs = await response.json();

        assignedDjs.forEach(dj => {
            generateAssignDJ(dj.djName, dj.dateOfAssign);
        });
    } catch (error) {
        console.error("Error fetching assigned DJs:", error);
    }
});

document.getElementById("calendar").addEventListener('change', async(event) => {
    try {
        const date = event.target.value;
        console.log(date);
        loadExistingAssignmentsByDate(date);

    } catch (error) {
        console.error("Error loading assigned DJs:", error);
    }
});

async function loadExistingAssignmentsByDate(date) {
    try {
        const response = await fetch('/api/assignedDjs');
        const assignedDjs = await response.json();
        document.getElementById("assignTable").innerHTML = "";
        assignedDjs.forEach(dj => {
            if (dj.dateOfAssign === date) {
                generateAssignDJ(dj.djName, dj.dateOfAssign);
            }

        });
    } catch (error) {
        console.error("Error fetching assigned DJs:", error);
    }

}

/*
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
restEditUI();

//generateReportTable(reportCounter);
//shortcut to search.
shortCutTrigger("shift", "f", "searchBox");
//shortcut to apply.
shortCutTrigger("shift", "enter", "applyKey");

assignDjEdit();