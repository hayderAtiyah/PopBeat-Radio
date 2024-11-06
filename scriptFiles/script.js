let reportCounter = 0;

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

    button.id = "reportViewDetialsButton";
    button.textContent = "view details";

    span2.appendChild(button);
    td2.appendChild(span2);
    tr.appendChild(td2);
    const viewAll = document.getElementById("viewAll");
    document.getElementById("reportTable").insertBefore(tr, viewAll);

    generateReportTable(reportCounter);
  }, 500);
}

generateReportTable(reportCounter);
