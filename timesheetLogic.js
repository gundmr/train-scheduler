// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDiun4ZFnxA4Ttyw2y_YAarfCvFPEnAJ_A",
    authDomain: "project-tester-104bc.firebaseapp.com",
    databaseURL: "https://project-tester-104bc.firebaseio.com",
    projectId: "project-tester-104bc",
    storageBucket: "",
    messagingSenderId: "787911704510",
    appId: "1:787911704510:web:668265c06c97a3b8"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  // Prettify the train start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMonths = moment().diff(moment(trainStart, "X"), "months");
  console.log(trainMonths);

  // Calculate the total billed frequency
  var trainBilled = trainMonths * trainFrequency;
  console.log(trainBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    
    $("<td>").text(trainStartPretty), //change to next arrival
    $("<td>").text(trainMonths), //change to minutes away

    // $("<td>").text(trainBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
