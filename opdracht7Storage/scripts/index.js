let personen=[
    {
        voornaam: 'Jan',
        familienaam: 'Janssens',
        geboorteDatum: new Date('2010-10-10'),
        email: 'jan@example.com',
        aantalKinderen: "0"
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
if(localStorage.getItem("persons")) personen = JSON.parse(localStorage.getItem("persons"));

const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const personsKeys = Object.keys(personen[0]);

$(document).ready(function(){
    for(const person of personen) {
        createOption(person);
    }
    $('#savePerson').on("click", saveOption);
    $("#addNewPerson").on("click", clearForm);
});

const createOption = (person)=>{
    const option = $("<option class = list>" + person.voornaam + " " + person.familienaam + "</option>")
        .on("click", (e) => editOption(e.target));
    for(const key in person){
        $(option).data(key, person[key]);
    }
    $("#lijstPersonen").append(option);
    return option;
}

const editOption =(option)=>{
    personsKeys.forEach(key =>{
        if(key ==="geboorteDatum"){
            $("#"+key).val(new Date($(option).data(key)).toISOString().slice(0,10))
            return;
        }
        if(key === "aantalKinderen"){
            $("#"+key).val($(option).data(key) || "0" )
            return;
        }
        $("#"+key).val($(option).data(key))
    });
}

const clearForm = () =>{
    personsKeys.forEach(key =>{
        $("#"+key).val("")
    });
    $("#lijstPersonen").prop('selectedIndex', -1);
}

const saveOption = () => {
    const person = {};
    let fail = false;
    personsKeys.forEach(key =>{
        const value = $("#"+key).val();
        if(fail){
            return;
        }
        if(key === "geboorteDatum" && !isValidDate(value)){
            alert("Birthdate is not correct");
            fail = true;
            return;
        }
        if(key === "aantalKinderen" && isNaN(value)){
            alert("Amount must be a number");
            fail = true;
            return;
        }
        if(key === "email" && !regexpEmail.test(value)){
            alert("Email is not correct");
            fail = true;
            return;
        }
        if((key === "voornaam" || key === "familienaam") && !value){
            alert("Empty values are not permitted!");
            fail = true;
            return;
        }
        if(!fail){
            person[key] = $('#'+key).val();
        }
    });
    if(fail){
        return;
    }
    const isNew =  $("#lijstPersonen").prop('selectedIndex') == -1;
    if(isNew){
        createOption(person);
    }
    else {
        const option = $('#lijstPersonen option:selected');
        for (const key in person) {
            $(option).data(key, person[key]);
        }
        $(option).text(person.voornaam + " " + person.familienaam);
    }
    saveAllOptions();
}

const saveAllOptions = () => {
    const persons=[];
    $('#lijstPersonen option').each(function () {
        const person = {};
        for(const key of personsKeys){
            const value = $(this).data(key);
            if(!value) continue;
            person[key] = value;
        }
        persons.push(person);
    })
    const json = JSON.stringify(persons);
    localStorage.setItem("persons", json);
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
