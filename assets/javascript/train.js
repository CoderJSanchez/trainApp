//initialize database

var config = {
    apiKey: "AIzaSyCJqT8QIht6rDScP-h9vNw8_Bfn4ZsAW0w",
    authDomain: "train-app-35d49.firebaseapp.com",
    databaseURL: "https://train-app-35d49.firebaseio.com",
    projectId: "train-app-35d49",
    storageBucket: "train-app-35d49.appspot.com",
    messagingSenderId: "608451005202"
  };
  firebase.initializeApp(config);

const database = firebase.database();


$('#submitButton').on('click', function(e){
    e.preventDefault();
    const name = $('#trainName').val().trim();
    const dest = $('#destination').val().trim();
    const firstTrain = $('#firstTrain').val().trim();
    const freq = $('#frequency').val().trim();

    

    const newTrain = {
        name: name,
        destination: dest,
        firstTrain: firstTrain,
        frequency: freq 
    }

    database.ref().push(newTrain)

    

    $('#trainName').val('');
    $('#destination').val('');
    $('#firstTrain').val('');
    $('#frequency').val('');

});

database.ref().on('child_added', function(childSnapshot){
    //console.log(childSnapshot.val());
    const tname = childSnapshot.val().name;
    const tdestination = childSnapshot.val().destination;
    const tfirstTrain = childSnapshot.val().firstTrain;
    const tfrequency = childSnapshot.val().frequency;

    //var tFrequency = freq;

    const firstTimeConvert = moment(tfirstTrain, "HH:mm").subtract(1, "years");
    console.log(`this is firstTimeConvert: ${firstTimeConvert}`);

    // Current Time
    const currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tfrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // console.log(tname);
    // console.log(tdestination);
    // console.log(tfirstTrain);
    // console.log(tfrequency);

    const newRow = $('<tr>').append(
        $('<td>').text(tname.toUpperCase()),
        $('<td>').text(tdestination.toUpperCase()),
        $('<td>').text(tfirstTrain),
        $('<td>').text(tfrequency + ' min'),
        $('<td>').text(tMinutesTillTrain)
    );
    $('#tableBody').append(newRow);

});







