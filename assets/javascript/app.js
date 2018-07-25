// Initialize Firebase
var config = {
    apiKey: "AIzaSyD-qVN_B8AOR7uEJ07WncAITQrz2LCUhMY",
    authDomain: "train-scheduler-57767.firebaseapp.com",
    databaseURL: "https://train-scheduler-57767.firebaseio.com",
    projectId: "train-scheduler-57767",
    storageBucket: "train-scheduler-57767.appspot.com",
    messagingSenderId: "406548941467"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function clearInput() {
    var trainName = $('#submit-name').val('');
    var trainDest = $('#submit-dest').val('');
    var trainTime = $('#submit-time').val('');
    var trainFreq = $('#submit-freq').val('');
}

$(document).ready(function () {

    $('.add-train').on('click', function (e) {

        e.preventDefault();

        var trainName = $('#submit-name').val().trim();
        var trainDest = $('#submit-dest').val().trim();
        var trainTime = moment($("#submit-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var trainFreq = $('#submit-freq').val().trim();

        

        var train = {
            name: trainName,
            dest: trainDest,
            time: trainTime,
            freq: trainFreq
        };
        

        database.ref().push(train);
        clearInput();
    });

    database.ref().on('child_added', function(child, prevChildKey) {
        console.log(child.val());
        var childSnap = child.val();

        var name = childSnap.name;
        var dest = childSnap.dest;
        var time = childSnap.time;
        var freq = childSnap.freq;

        console.log(moment(time).isValid());
        console.log(time);
        console.log(moment.unix(time));

        var timeDiff = moment().diff(moment.unix(time), "minutes");
        var timeRemainder = moment().diff(moment.unix(time), "minutes") % freq;
        var minutes = freq - timeRemainder;
        var nextTrain = moment().add(minutes, "m").format("hh:mm A");

        console.log(timeDiff);
        console.log(freq);
        console.log(timeRemainder);

        console.log(minutes);
        console.log(nextTrain);
        console.log(moment().format('hh:mm A'));
        console.log(nextTrain);
        console.log(moment().format('X'));


        $('#table > tbody').append(`<tr><td>${name}</td><td>${dest}</td><td>${freq} mins</td><td>${nextTrain}</td><td>${minutes}</td></tr>`);
    });
});