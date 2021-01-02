$(document).ready(function(){
    $("button").click(function(){
        let radioChecked = $("input[name=settingsDiv]:checked", '#settingsForm').val();
        let input =  $("#input").val();
        if(radioChecked === 'voorgrond'){
            $("p")
                .css('color', input);
        }
        if(radioChecked === 'achtergrond'){
            $("div")
                .css('background-color', input);
        }
        if(radioChecked === "text"){
            $("p").text(input);
        }
        if(radioChecked === 'hoogte'){
            $("div")
                .css('height', input);
        }
        if(radioChecked === 'breedte'){
            $("div")
                .css('width',input);
        }
        $("#input").val("");
    });
});
