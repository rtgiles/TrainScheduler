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
    var trnFstTme="";
    var trnFreq="";

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
  	
  	//Time Calc
  	//diffTme= moment().diff(moment(trnFstTme, hh:mm).subtract(1, "years"));
  	var trnTmeCnvrt= moment(trnFstTme, "hh:mm").subtract(1, "years");
  	console.log("trnTmeCnvrt " + trnTmeCnvrt);

  	var diffTme= moment.duration(moment().diff(moment(trnFstTme, "hh:mm")),"milliseconds").asMinutes();
  	console.log("diffTme " + diffTme);

  	var tmeRemndr= trnFreq - (Math.floor(diffTme)%trnFreq);
  	console.log("tmeRemndr " + tmeRemndr);
  	var tmeRemndr2= moment(tmeRemndr).format("hh:mm");
  	console.log("tmeRemndr2 " + tmeRemndr2);

  	var trnNxtArvl= diffTme>0 ? moment().add(tmeRemndr, "minutes") : moment(trnFstTme, "hh:mm");
  	console.log("trnNxtArvl " + trnNxtArvl);
  	var trnNxtArvl2 = moment(trnNxtArvl).format("hh:mm");
  	console.log("trnNxtArvl2 " + trnNxtArvl2);
/*
  	// Database push
  	database.ref().set({
  		trnName: trnName,
		trnDest: trnDest,
		trnFstTme: trnFstTme,
		trnFreq: trnFreq,
		tmeRemndr2: tmeRemndr2,
		trnNxtArvl2: trnNxtArvl2,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  	*/
  	//HTML Form Fill-IN
  	$(".table").append([
  		"<tr>",
  			"<td class='trnName'>" + trnName + "</td>",
  			"<td class='trnDstn'>" + trnDest + "</td>",
  			"<td class='trnNxtArvl'>" + trnNxtArvl2 + "</td>",
  			"<td class='trnMinAwy'>" + tmeRemndr2 + "</td>",
  			"<td class='trnFrqy'>" + trnFreq + "</td>",
		"</tr>"
		]);

  	return false;
  });

