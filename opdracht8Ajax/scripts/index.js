$(document).ready(function() {
    $("#search").on("click", searchUserData);
});

function searchUserData () {
    $(".response").text("");
    const userName = $("#username").val();
    if(!userName){
        alert("Username should not be empty");
        return;
    }
    const link = "https://api.github.com/users/"+ userName;
    $.ajax({
        url: link,
        success: (function (data) {
            $("#result")
                .append($("<img width=120  src='" + data.avatar_url + "'>"))
                .append($("<h3>" + data.name + "</h3>"))
                .append($("<a href='" + data.html_url + "'>" + data.html_url + "</a><br>"))
                .css("margin-top", 30);
            console.log(data.avatar_url + "\n" + data.name + "\n" + data.html_url + "\n");
        }),
        error: (function () {
            alert("Error!");
        })
    })
}
