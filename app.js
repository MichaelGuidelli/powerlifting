function calculateSet(event) {
  event.preventDefault();

  document.getElementById("setCalculated").style.display = "block";
  document.getElementById("reset-button").style.display = "block";

  const percentage = parseFloat(document.getElementById("percentage").value);
  let personalRecord;
  if (
    document.getElementById("personal-record-group").style.display !== "none"
  ) {
    personalRecord = parseFloat(
      document.getElementById("personal-record").value
    );
  } else {
    personalRecord = parseFloat(document.getElementById("custom-weight").value);
  }
  if (isNaN(percentage) || isNaN(personalRecord)) {
    document.getElementById("setCalculated").innerText =
      "Inserisci valori validi";
    return;
  }
  const setCalculated = (percentage / 100) * personalRecord;
  document.getElementById("setCalculated").innerText =
    "Carico Allenante: " + setCalculated.toFixed(2) + " kg";
}

function resetForm() {
  document.getElementById("setCalculated").style.display = "none";
  document.getElementById("reset-button").style.display = "none";
}

function toggleElementDisplay(elementId) {
  let element = document.getElementById(elementId);
  element.style.display = element.style.display === "none" ? "block" : "none";
}

function changeMode() {
  toggleElementDisplay("personal-record-group");
  toggleElementDisplay("custom-weight-group");
}

function toggleButtonVisibility() {
  const inputs = ["squat-pr", "bench-pr", "deadlift-pr"].map((id) =>
    document.getElementById(id)
  );
  const allDisabled = inputs.every((input) => input.disabled);
  document.getElementById("changePersonalRecordButton").style.display =
    allDisabled ? "block" : "none";
  document.getElementById("savePersonalRecordsButton").style.display =
    allDisabled ? "none" : "block";
}

function activatePersonalRecordsInputs(event) {
  event.preventDefault();
  document.getElementById("squat-pr").disabled = false;
  document.getElementById("bench-pr").disabled = false;
  document.getElementById("deadlift-pr").disabled = false;
  toggleButtonVisibility();
}

function deactivatePersonalRecordsInputs(event) {
  event.preventDefault();
  document.getElementById("squat-pr").disabled = true;
  document.getElementById("bench-pr").disabled = true;
  document.getElementById("deadlift-pr").disabled = true;
  savePersonalRecords();
  toggleButtonVisibility();
}

function updateTotal() {
  const squatPr = parseFloat(document.getElementById("squat-pr").value) || 0;
  const benchPr = parseFloat(document.getElementById("bench-pr").value) || 0;
  const deadliftPr =
    parseFloat(document.getElementById("deadlift-pr").value) || 0;

  const total = squatPr + benchPr + deadliftPr;

  if (total > 0) {
    document.getElementById("yourTotal").innerText =
      "Totale: " + total.toFixed(2) + "kg";
  }
}

function savePersonalRecords() {
  const squatPr = document.getElementById("squat-pr").value;
  const benchPr = document.getElementById("bench-pr").value;
  const deadliftPr = document.getElementById("deadlift-pr").value;

  localStorage.setItem("squatPr", squatPr);
  localStorage.setItem("benchPr", benchPr);
  localStorage.setItem("deadliftPr", deadliftPr);
  updateTotal();
  loadPersonalRecords();
}

function loadPersonalRecords() {
  const squatPr = localStorage.getItem("squatPr") || "";
  const benchPr = localStorage.getItem("benchPr") || "";
  const deadliftPr = localStorage.getItem("deadliftPr") || "";

  document.getElementById("squat-pr").value = squatPr;
  document.getElementById("bench-pr").value = benchPr;
  document.getElementById("deadlift-pr").value = deadliftPr;

  const selectElement = document.getElementById("personal-record");
  const options = selectElement.options;

  for (let i = 0; i < options.length; i++) {
    switch (options[i].textContent) {
      case "Squat":
        options[i].value = squatPr;
        break;
      case "Bench":
        options[i].value = benchPr;
        break;
      case "Deadlift":
        options[i].value = deadliftPr;
        break;
      default:
        break;
    }
  }
  updateTotal();
}

document.addEventListener("DOMContentLoaded", function () {
  loadPersonalRecords();
  updateTotal();
});
