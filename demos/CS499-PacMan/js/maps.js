function getMaps() {
    $.get(
        "http://104.131.22.227/maps",
        function (maps) {
            updateMapList(maps)
        }
    );
}

function updateMapList(maps) {
console.log(maps);
    var html = "<tr>l<th>#</th><th>Name</th><th>Play Count</th><th>Play</th></tr>";

    for (var i = 0; i < maps.length; i++) {
        html += "<tr>" +
            "<td>" + (i+1) + "</td>" +
            "<td>" + maps[i].name + "</td>" +
            "<td>" + maps[i].upvotes + "</td>" +
            "<td><a class='btn btn-primary' href='edit.html?id="+maps[i]._id+"'>Play</a></td>" +
            "</tr>";
    }
    $( "#mapContainer" ).html(html);
}

getMaps();