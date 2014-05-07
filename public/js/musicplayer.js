var trackList = null;
$(document).ready(function() {
	$.getJSON("/api/tracks", function(data) {
		trackList = data;
	});
});

// current song that we will be using
var curSong = null;

function playSong(e) {
	url = e.parentNode.parentNode.getAttribute("data-url");
	id = parseInt(e.parentNode.parentNode.getAttribute("data-id"));
	console.log("New Song: " + url);

	$("source").attr("src", url);

	console.log(trackList);

	console.log(id);
	curSong = getSongById(id);

	elem = $("video").get(0);
	elem.load();
}

function nextSong() {
	curSong = getNextSong(curSong.id);

	$("source").attr("src", curSong.location);
	$("video").get(0).load();
}

function getNextSong(id) {
	var found = false;
	for (var n = 0; n < trackList.length; n++) {
		track = trackList[n];

		if (track.id == id) {
			return trackList[n + 1];
		}
	}

	console.log("Error: could not find track!");
	return null;
}

function getSongById(id) {
	for (var n = 0; n < trackList.length; n++) {
		track = trackList[n];

		if (track.id == id) {
			return track;
		}
	}

	console.log("Error: could not find track!");
	return null;
}