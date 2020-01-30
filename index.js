console.log("loading index.js...");
let filename = "";

function Export2Doc(event, element) {
    event.preventDefault();
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

function isDDLEmpty() {
    let newDDLS = document.getElementById("ddlsCreated").value;
    let alteredDDLS = document.getElementById("ddlsAltered").value;
    if (newDDLS == "" && alteredDDLS == "") {
        document.getElementById("migrateDDL").style.display = "none";
        document.getElementById("newDDLS").innerHTML = "<li>NONE</li>";
        document.getElementById("alteredDDLS").innerHTML = "";
    } else {
        document.getElementById("migrateDDL").style.display = "block";
    }

}
function isETLEmpty() {
    let newETLS = document.getElementById("newSquencesJobs").value;
    let alteredETLS = document.getElementById("alteredSquencesJobs").value;
    if (newETLS == "" && alteredETLS == "") {
        document.getElementById("migrateDataStageETL").style.display = "none";
        document.getElementById("newETLS").innerHTML = "<li>NONE</li>";
        document.getElementById("alteredETLS").innerHTML = "";
    } else {
        document.getElementById("migrateDataStageETL").style.display = "block";
    }
}
function isVariableEmpty() {
    let newVariables = document.getElementById("environmentVariablesNew").value;
    let alteredVariables = document.getElementById("environmentVariablesAltered").value;
    if (newVariables == "" && alteredVariables == "") {
        document.getElementById("migrateEnvironmentVariables").style.display = "none";
        document.getElementById("environmentVariablesList").innerHTML = "<li>NONE</li>";
        document.getElementById("environmentVariablesList2").innerHTML = "";
    } else {
        document.getElementById("migrateEnvironmentVariables").style.display = "block";
    }
}
function isSpecialInstructionsEmpty() {
    let specialInstructions = document.getElementById("specialInstructions").value;
    if (specialInstructions == "") {
        document.getElementById("specialInstructionsSection").style.display = "none";
    } else {
        document.getElementById("specialInstructionsSection").style.display = "block";
    }
}



isDDLEmpty();
isETLEmpty();
isSpecialInstructionsEmpty();
isVariableEmpty();

function formListener(event) {
    switch (event.target.name) {
        case "ticketNumber":
            handleTitle(event);
            break;
        case "releaseVersion":
            handleTitle(event);
            break;
        case "enviornmentTypeList":
            handleTitle(event);
            break;
        case "datamartList":
            handleTitle(event);
            break;
        case "newSquencesJobs":
            handleNewETL(event);
            break;
        case "migrateBatch":
            handleTitle(event);
            break;
        case "migrateSchema":
            handleTitle(event);
            break;
        case "alteredSquencesJobs":
            handleAlteredETL(event);
            break;
        case "ddlsCreated":
            handleNewDDLS(event);
            break;
        case "ddlsAltered":
            handleAlteredDDLS(event);
            break;
        case "executionList":
            handleExecutionList(event);
            break;
        case "otherExecute":
            handleOtherExecute(event);
            break;
        case "specialInstructions":
            handleSpecialInstructions(event);
            break;
        case "environmentVariablesNew":
            handleEnvironmentVariablesNew(event);
            break;
        case "environmentVariablesAltered":
            handleEnvironmentVariablesAltered(event);
            break;
        default:
            console.log(event.target.value);
    }
    isDDLEmpty();
    isETLEmpty();
    isSpecialInstructionsEmpty();
    isVariableEmpty();
}

function handleEnvironmentVariablesNew(event) {
    let environmentVariables = document.getElementById("environmentVariablesNew").value.split("\n");

    document.getElementById("environmentVariablesList").innerHTML = "";
    if (document.getElementById("environmentVariablesAltered").value === "")
        document.getElementById("environmentVariablesList2").innerHTML = "";
    if (environmentVariables != "") {
        for (let variable in environmentVariables) {
            let listItem = document.createElement("li");
            listItem.innerHTML = environmentVariables[variable] + " (New)";
            document.getElementById("environmentVariablesList").appendChild(listItem);
        }
    } else {
        document.getElementById("environmentVariablesList").innerHTML = "";
    }
}

function handleEnvironmentVariablesAltered(event) {
    let environmentVariables = document.getElementById("environmentVariablesAltered").value.split("\n");

    document.getElementById("environmentVariablesList2").innerHTML = "";
    if (document.getElementById("environmentVariablesNew").value === "")
        document.getElementById("environmentVariablesList").innerHTML = "";
    if (environmentVariables != "") {
        for (let variable in environmentVariables) {
            let listItem = document.createElement("li");
            listItem.innerHTML = environmentVariables[variable] + " (Altered)";
            document.getElementById("environmentVariablesList2").appendChild(listItem);
        }
    } else {
        document.getElementById("environmentVariablesList2").innerHTML = "";
    }
}

function handleNewETL(event) {
    let newSquencesJobs = document.getElementById("newSquencesJobs").value.split("\n");

    document.getElementById("newETLS").innerHTML = "";
    if (document.getElementById("alteredSquencesJobs").value === "")
        document.getElementById("alteredETLS").innerHTML = "";
    if (newSquencesJobs != "") {
        for (let job in newSquencesJobs) {
            let listItem = document.createElement("li");
            listItem.innerHTML = newSquencesJobs[job] + " (New)";
            document.getElementById("newETLS").appendChild(listItem);
        }
    } else {
        document.getElementById("newETLS").innerHTML = "";
    }
}

function handleAlteredETL(event) {
    let alteredSquencesJobs = document.getElementById("alteredSquencesJobs").value.split("\n");

    document.getElementById("alteredETLS").innerHTML = "";
    if (document.getElementById("newSquencesJobs").value === "")
        document.getElementById("newETLS").innerHTML = "";
    if (alteredSquencesJobs != "") {
        for (let job in alteredSquencesJobs) {
            let listItem = document.createElement("li");
            listItem.innerHTML = alteredSquencesJobs[job] + " (Altered)";
            document.getElementById("alteredETLS").appendChild(listItem);
        }
    } else {
        document.getElementById("alteredETLS").innerHTML = "";
    }
}

function handleNewDDLS(event) {
    let ddlsCreated = document.getElementById("ddlsCreated").value.split("\n");

    document.getElementById("newDDLS").innerHTML = "";
    if (document.getElementById("ddlsAltered").value === "")
        document.getElementById("alteredDDLS").innerHTML = "";
    if (ddlsCreated != "") {
        for (let ddl in ddlsCreated) {
            let listItem = document.createElement("li");
            listItem.innerHTML = ddlsCreated[ddl] + " (New)";
            document.getElementById("newDDLS").appendChild(listItem);
        }
    } else {
        document.getElementById("newDDLS").innerHTML = "";
    }
}

function handleAlteredDDLS(event) {
    let ddlsAltered = document.getElementById("ddlsAltered").value.split("\n");

    document.getElementById("alteredDDLS").innerHTML = "";
    document.getElementById("ddlsMigration").innerHTML = "";
    if (document.getElementById("ddlsCreated").value === "")
        document.getElementById("newDDLS").innerHTML = "";
    if (ddlsAltered != "") {
        for (let ddl in ddlsAltered) {
            let listItem = document.createElement("li");
            listItem.innerHTML = ddlsAltered[ddl] + " (Altered)";
            document.getElementById("alteredDDLS").appendChild(listItem);
            if (!document.getElementById("migrateSchema").checked) {
                listItem = document.createElement("li");
                listItem.innerHTML = ddlsAltered[ddl];
                document.getElementById("ddlsMigration").appendChild(listItem);
            }
        }
    } else {
        document.getElementById("alteredDDLS").innerHTML = "";
        document.getElementById("ddlsMigration").innerHTML = "";
    }
}

function handleSpecialInstructions(event) {
    let specialInstructions = document.getElementById("specialInstructions").value;
    document.getElementById("specialInstructionsDoc").innerHTML = specialInstructions;
}

function handleExecutionList(event) {
    document.getElementById("otherExecute").style.display = "none";
    document.getElementById("otherExecute").removeAttribute("required");
    if (event.target.value === "other") {
        document.getElementById("otherExecute").style.display = "block";
        document.getElementById("otherExecute").setAttribute("required", "");
        document.getElementById("jobExecuteOne").innerHTML = "";
    } else {
        document.getElementById("jobExecuteOne").innerHTML = event.target.value;
    }
}

function handleOtherExecute(event) {
    document.getElementById("jobExecuteOne").innerHTML = event.target.value;
}

function handleTitle(event) {

    let ticketNumber = document.getElementById("ticketNumber").value;
    let releaseVersion = document.getElementById("releaseVersion").value;
    let server = "";
    let database = "";
    let datamart = document.getElementById("datamartList").value;
    let enviornmentType = document.getElementById("enviornmentTypeList").value;
    let migrateBatch;
    let migrateSchema;
    if (document.getElementById("migrateBatch").checked)
        migrateBatch = true;
    if (document.getElementById("migrateSchema").checked)
        migrateSchema = true;
    if (enviornmentType === "TST") {
        server = "ERADS12";
        database = "DWETLTST";
    } else if (enviornmentType === "PRD") {
        server = "ERADS13";
        database = "DWETLPRD";
    }

    let svnurl = "\\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\";

    /* Set Title and File Name */
    let title = datamart + "_" + enviornmentType + " " + releaseVersion + " Migration Script (" + ticketNumber + ")";
    filename = title + ".doc";
    document.getElementById("docTitle").innerHTML = title;

    /* Migrate DDLs Points */
    document.getElementById("migrateDDLOne").innerHTML = "Using your SQL Client log in to the project's schema on " + database;
    document.getElementById("migrateDDLTwo").innerHTML = migrateSchema ? "Back up the entire schema to " + svnurl + "backup\\{ DDLName }.sql" : "Back up the DDLS listed below to " + svnurl + "backup\\{ DDLName }.sql";

    /* Execute SQL Point */
    document.getElementById("executeOne").innerHTML = "Open \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\import\\" + datamart + "_" + enviornmentType + "_" + releaseVersion + ".sql";

    /* Backups */
    document.getElementById("backupPre").innerHTML = "<b>Back up entire Batch_" + datamart + " (pre migration)</b>";
    document.getElementById("migrateDsx").innerHTML = migrateBatch ? "<b>Migrate DSX to " + datamart + "_" + enviornmentType + "</b> (Full batch folder)" : "<b>Migrate DSX to " + datamart + "_" + enviornmentType + "</b>";
    document.getElementById("backupPost").innerHTML = "<b>Back up entire Batch_" + datamart + " (post migration)</b>";

    /* Pre Backup Bullet Points */
    document.getElementById("backupOne").innerHTML = "Open DS Designer and log on to " + datamart + "_" + enviornmentType + " on " + server;
    document.getElementById("backupTwo").innerHTML = "Export Batch_" + datamart + ", with executables, exclude read-only to \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\backup\\Batch_" + datamart + "_" + enviornmentType + "_Pre.dsx";
    document.getElementById("backupThree").innerHTML = "Commit to SVN with comment \"" + datamart + " " + releaseVersion + " to " + enviornmentType + " before migration\"";

    /* Migrate Bullet Points */
    document.getElementById("migrateOne").innerHTML = "Open DS Designer and log on to " + datamart + "_" + enviornmentType + " on " + server;
    document.getElementById("migrateTwo").innerHTML = "Import the file already saved to subversion: \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\import\\" + datamart + "_" + enviornmentType + "_" + releaseVersion + ".dsx";
    document.getElementById("migrateThree").innerHTML = "Compile job (Tools -> Multiple Job Compile (All Jobs)";

    /* Post Backup Bullet Points */
    document.getElementById("backupFour").innerHTML = "Export Batch_" + datamart + ", with executables, exclude read-only to \\ERA\\trunk\\Releases\\" + datamart + "\\" + releaseVersion + "\\backup\\Batch_" + datamart + "_" + enviornmentType + "_Post.dsx";
    document.getElementById("backupFive").innerHTML = "Commit to SVN with comment \"" + datamart + " " + releaseVersion + " to " + enviornmentType + " after migration\"";
    document.getElementById("backupSix").innerHTML = "Close DS Designer connection to " + datamart + "_" + enviornmentType + " on " + server;

    /* Environment Variable Points */
    document.getElementById("migrateVariableOne").innerHTML = "Open DS Administrator log in to " + server + " and open the environment variables for " + datamart + "_" + enviornmentType;
    document.getElementById("migrateVariableTwo").innerHTML = "Manually migrate the variables listed in the summary of this document";
    document.getElementById("migrateVariableThree").innerHTML = "Make sure to click \"Ok\" once you are done changing the variables";

    handleAlteredDDLS(event);

}