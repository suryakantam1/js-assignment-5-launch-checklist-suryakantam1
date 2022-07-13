// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.

    document.getElementById("missionTarget").innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star} </li>
        <li>Distance from Earth: ${distance} </li>
        <li>Number of Moons: ${moons} </li>
    </ol>
    <img src=${imageUrl} height=250>`;
}

function validateInput(textInput) {
    if (textInput === "")
        return "Empty";
    else if (isNaN(textInput))
        return "Not a Number";
    else if (!isNaN(textInput))
        return "Is a Number";
}

function formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass) {

    if (validateInput(pilotName) === "Empty" || validateInput(copilotName) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        alert("All fileds are required!");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
        alert("Fuel level and Cargo mass should be numbers");
    } else if (validateInput(pilotName) === "Is a Number" || validateInput(copilotName) === "Is a Number") {
        alert("Pilot Name and Copilot Name should not be a number");
    } else {

        // alert("scripthelper: field validation successful ");

        //document.getElementById("faultyItems").style.visibility = "hidden";
        document.getElementById("faultyItems").style.visibility = "visible";
        document.getElementById(list[5].id).innerHTML = `${pilotName} is Ready.`
        document.getElementById(list[6].id).innerHTML = `${copilotName} is Ready.`

        if (fuelLevel >= 10000 && cargoMass <= 10000) {
            document.getElementById(list[7].id).innerHTML = `Fuel level ${fuelLevel} high enough for launch.`;
            document.getElementById(list[7].id).style.color = "green";
            document.getElementById(list[8].id).innerHTML = `Cargo mass ${cargoMass} kilograms low enough for launch.`;
            document.getElementById(list[8].id).style.color = "green";
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "green";
        } else if (fuelLevel < 10000 && cargoMass > 10000) {
            document.getElementById(list[7].id).innerHTML = `Fuel level ${fuelLevel} low enough for launch.`;
            document.getElementById(list[7].id).style.color = "red";
            document.getElementById(list[8].id).innerHTML = `Cargo mass ${cargoMass} kilograms is too much for launch.`;
            document.getElementById(list[8].id).style.color = "red";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
        } else if (fuelLevel < 10000 && cargoMass <= 10000) {
            document.getElementById(list[7].id).innerHTML = `Fuel level ${fuelLevel} liters too low for launch.`;
            document.getElementById(list[7].id).style.color = "red";
            document.getElementById(list[8].id).innerHTML = `Cargo mass ${cargoMass} kilograms low enough for launch.`;
            document.getElementById(list[8].id).style.color = "green";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
        } else if (fuelLevel >= 10000 && cargoMass > 10000) {
            document.getElementById(list[7].id).innerHTML = `Fuel level ${fuelLevel} high enough for launch.`;
            document.getElementById(list[7].id).style.color = "green";
            document.getElementById(list[8].id).innerHTML = `Cargo Mass ${cargoMass} kilograms is too much for launch.`;
            document.getElementById(list[8].id).style.color = "red";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {

    let index = Math.floor(Math.random() * planets.length);
    addDestinationInfo(document, planets[index].name, planets[index].diameter, planets[index].star, planets[index].distance, planets[index].moons, planets[index].image);

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
