var snailPrice = 100;
var energyConsumedByPerson = 200;
var energyProducedBySnail = 100;
var contractMoneyValue = 100;

var totalSnails = 100;
var totalMoney = 1000;
var totalPeople = 5;

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function snailsAreDying() {
    var diedSnails = generateRandomNumber(totalSnails / 3);
    totalSnails = totalSnails - diedSnails;

    if(totalSnails < 0) {
        totalSnails = 0;
    }
}

function howMuchEnergyIsNeeded() {
    return totalPeople * energyConsumedByPerson;
}

function howMuchEnergyIsProduced() {
    return totalSnails * energyProducedBySnail;
}

function receiveMoneyFromPeople() {
    var receivedMoney = totalPeople * contractMoneyValue;
    totalMoney = totalMoney + receivedMoney;
}

function refundMoneyToPeople() {
    var refundedMoney = totalPeople * contractMoneyValue;
    totalMoney = totalMoney - refundedMoney;
}

function peopleAreGrowingUp() {
    var bornPeople = generateRandomNumber(totalPeople);
    var diedPeople = generateRandomNumber(totalPeople / 3);
    totalPeople = totalPeople + bornPeople - diedPeople;
}

function updateGraphics() {
    document.getElementById("totalSnailsText").innerHTML = totalSnails.toString();
    document.getElementById("totalMoneyText").innerHTML = totalMoney.toString();
    document.getElementById("totalPeopleText").innerHTML = totalPeople.toString();

    document.getElementById("energyNeededText").innerHTML = howMuchEnergyIsNeeded().toString();
    document.getElementById("energyProducedText").innerHTML = howMuchEnergyIsProduced().toString();

    if(howMuchEnergyIsProduced() > howMuchEnergyIsNeeded()) {
        document.getElementById("electricityImage").classList.remove('hide');
    } else {
        document.getElementById("electricityImage").classList.add('hide');
    }
}

function buySnail() {
    totalSnails = totalSnails + 1;
    totalMoney = totalMoney - snailPrice;

    updateGraphics();
}

function elaborateGameCycle() {

    if(howMuchEnergyIsProduced() > howMuchEnergyIsNeeded()) {
        receiveMoneyFromPeople();
    } else {
        refundMoneyToPeople();
    }

    snailsAreDying();
    peopleAreGrowingUp();

    updateGraphics();

    if (totalMoney < 0) {
        alert('You have lots of debts. Tha bank acquired your snails and you LOSE everything!');
    } else if (totalPeople <= 0) {
        alert('People died before your company. The money you have is safe now!')
    } else {
        setTimeout(function () {
            elaborateGameCycle();
        }, 3000);
    }
}

function start() {
    elaborateGameCycle();
}

start();
