const personen=[
    {
        voornaam: 'Jan',
        familienaam: 'Janssens',
        geboorteDatum: new Date('2010-10-10'),
        email: 'jan@example.com',
        aantalKinderen: 0
    },
    {
        voornaam: 'Mieke',
        familienaam: 'Mickelsen',
        geboorteDatum: new Date('1980-01-01'),
        email: 'mieke@example.com',
        aantalKinderen: 1
    },
    {
        voornaam: 'Piet',
        familienaam: 'Pieters',
        geboorteDatum: new Date('1970-12-31'),
        email: 'piet@example.com',
        aantalKinderen: 2
    }
];
let selectedPerson = -1;
const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$(function(){
    personen.forEach((person, index) => {
        createOption(person.voornaam, person.familienaam, index);
    });
    $('#savePerson').on("click", saveOption);
    $("#addNewPerson").on("click", clearForm);
});

const createOption = (firstName, lastName, index)=>{
    $("#lijstPersonen").append(
        $('<option>')
            .text(firstName + " " + lastName)
            .on("click",() => editOption(index))
        );
}

const editOption =(index)=>{
    selectedPerson=index;
    const person = personen[index];
    let date = person.geboorteDatum.toISOString().slice(0,10);
    $("#firstName").val(person.voornaam);
    $("#lastName").val(person.familienaam);
    $("#dateOfBirth").val(date);
    $("#email").val(person.email);
    $("#children").val(person.aantalKinderen);
}

const clearForm = () =>{
    $("#firstName").val("");
    $("#lastName").val("");
    $("#dateOfBirth").val("");
    $("#email").val("");
    $("#children").val("");
    selectedPerson = -1;
    $("#lijstPersonen").prop('selectedIndex', -1);
}

const saveOption = () => {
    if (!$("#firstName").val().trim()) {
        alert("First name must be filled");
        return;
    }
    if (!$("#lastName").val().trim()) {
        alert("Last name must be filled");
        return;
    }
    if (!isValidDate($("#dateOfBirth").val())) {
        alert("Birthdate is not correct");
        return;
    }
    if (!regexpEmail.test($("#email").val())) {
        alert("Email is not correct");
        return;
    }
    if (isNaN($("#children").val())) {
        alert("Amount must be a number");
        return;
    }
    const person = selectedPerson > -1 ? personen[selectedPerson] : {};
    person.voornaam = $("#firstName").val();
    person.familienaam = $("#lastName").val();
    person.aantalKinderen = $("#children").val();
    person.geboorteDatum = new Date($("#dateOfBirth").val());
    person.email = $("#email").val();

    if (selectedPerson > -1) {
        $('#lijstPersonen option:selected').text(person.voornaam + " " + person.familienaam);
        personen[selectedPerson].familienaam = $("#lastName").val();
        personen[selectedPerson].email = $("#email").val();
        personen[selectedPerson].geboorteDatum = new Date($("#dateOfBirth").val());
        personen[selectedPerson].aantalKinderen = $("#children").val();
        personen[selectedPerson].voornaam = $("#firstName").val();
        clearForm();
        return;
    }
    personen.push(person);
    createOption(person.voornaam, person.familienaam, personen.length - 1);
    clearForm();
}

function isValidDate(dateString) {
    let regExpBirthday = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    if (!regExpBirthday.test(dateString)) {
        return false;
    }
    let parts = dateString.split("-");
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }
    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    return day > 0 && day <= monthLength[month - 1];
};
