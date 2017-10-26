$(document).ready(update)

//Clock function

function update() {
  $("#clock").html(moment().format("D MMMM YYYY H:mm:ss"));
}

setInterval(update, 1000);
	
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDlqisPI4-ljI1QhHgrgL276mjjIyedzvY",
    authDomain: "train-scheduler-457ed.firebaseapp.com",
    databaseURL: "https://train-scheduler-457ed.firebaseio.com",
    projectId: "train-scheduler-457ed",
    storageBucket: "",
    messagingSenderId: "816587210810"
  };
  firebase.initializeApp(config);

  // Variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var trnName="";
    var trnDest="";
    var trnFstTme=0;
    var trnFreqy="";

  //Submit button 
  $(".btn").on("click", function(event) {
  	event.preventDefault();
  	trnName= $("#trnName").val().trim();
  	trnDest= $("#trnDest").val().trim();
  	trnFstTme= $("#trnFstTme").val().trim();
	trnFreq= $("#trnFreq").val().trim();
  	
  	console.log(trnName);
  	console.log(trnDest);
  	console.log(trnFstTme);
  	console.log(trnFreq);
  	// Database push
  	database.ref().set({
  		trnName: trnName,
		trnDest: trnDest,
		trnFstTme: trnFstTme,
		trnFreq: trnFreq,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  	
  	//HTML Form Fill-IN
  	$(".table").append([
  		"<tr>",
  			"<td class='trnName'>" + trnName + "</td>",
  			"<td class='trnDstn'>" + trnDest + "</td>",
  			//"<td class='trnNxtArvl'>" + trn + "</td>",
  			//"<td class='trnMinAwy'>" + trnName + "</td>",
  			"<td class='trnFrqy'>" + trnFreq + "</td>",
		"</tr>"
		]);

  	return false;
  });

