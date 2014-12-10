function getScores() {
    $.get(
        "http://104.236.6.144/highscores/" + 100,
        function (highScores) {
            updateHighScores(highScores.scores)
        }
    );
}

function updateHighScores(highScores) {

    var html = "<tr>l<th>#</th><th>Name</th><th>Score</th></tr>";

    for (var i = 0; i < highScores.length; i++) {
        html += "<tr>" +
            "<td>" + (i+1) + "</td>" +
            "<td>" + highScores[i].name + "</td>" +
            "<td>" + highScores[i].score + "</td>" +
            "</tr>";
    }
    $( "#scoreContainer" ).html(html);
    console.log(highScores);
}

getScores();