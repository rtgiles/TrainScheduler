$(document).ready(function() {

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
    var tmeRemndr="";
    var trnNxtArvl2 ="";

//Clock function

	function update() {
	  $("#clock").html(moment().format("D MMMM YYYY H:mm:ss"));
	}

	setInterval(update, 1000);
	
	dataRetrieve();
    time_calc();
    tableLoad();

  //Submit button 
  $(".btn").on("click", function(event) {
  	event.preventDefault();
  	var trnName= $("#trnName").val().trim();
  	var trnDest= $("#trnDest").val().trim();
  	var trnFstTme= $("#trnFstTme").val().trim();
	var trnFreq= $("#trnFreq").val().trim();
  	
  	console.log(trnName);
  	console.log(trnDest);
  	console.log(trnFstTme);
  	console.log(trnFreq);
  	
  	time_calc();
  	databasePush();

  	//Time Calc
		function time_calc(){
		  	var trnTmeCnvrt= moment(trnFstTme, "hh:mm").subtract(1, "years");
		  	console.log("trnTmeCnvrt " + trnTmeCnvrt);

		  	var diffTme= moment.duration(moment().diff(moment(trnFstTme, "hh:mm")),"milliseconds").asMinutes();
		  	console.log("diffTme " + diffTme);

		  	var tmeRemndr= trnFreq - (Math.floor(diffTme)%trnFreq);
		  	console.log("tmeRemndr " + tmeRemndr);
		  	var tmeRemndr2= moment(tmeRemndr).format("hh:mm");
		  	console.log("tmeRemndr2 " + tmeRemndr2);

		  	var trnNxtArvl= "";
		  		if (diffTme>0) {
		  			trnNxtArvl= moment().add(tmeRemndr, "minutes");
		  			} else {
		  			trnNxtArvl= moment(trnFstTme, "hh:mm");
		  			}

		  	console.log("trnNxtArvl " + trnNxtArvl);
		  	var trnNxtArvl2 = moment(trnNxtArvl).format("hh:mm");
		  	console.log("trnNxtArvl2 " + trnNxtArvl2);
		}
  	
  	// Database push
	  	function dataPush(){
		  	database.ref().push({
		  		trnName: trnName,
				trnDest: trnDest,
				trnFstTme: trnFstTme,
				trnFreq: trnFreq,
				tmeRemndr2: tmeRemndr2,
				trnNxtArvl2: trnNxtArvl2,
		  		dateAdded: firebase.database.ServerValue.TIMESTAMP
		  	});
	  	}
  	
  	//Retrieve Data from Firebase 
	  	function dataRetrieve(){
		  	database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
		      // storing the snapshot.val() in a variable for convenience
		      var sv = snapshot.val();

		      // Console.loging the last user's data
		      console.log(sv.trnName);
		      console.log(sv.trnDest);
		      console.log(sv.trnFstTme);
		      console.log(sv.tmeRemndr2);
		      console.log(sv.trnNxtArvl2);
		  	});
	  	}

     //HTML Form Fill-IN
	    function tableLoad(){
	      for (var i = sv.length - 1; i >= 0; i--) {
	      		sv[i];
	           $(".table").append([
		  		"<tr>",
		  			"<td class='trnName'>" + sv.trnName + "</td>",
		  			"<td class='trnDstn'>" + sv.trnDest + "</td>",
		  			"<td class='trnNxtArvl'>" + sv.trnNxtArvl2 + "</td>",
		  			"<td class='trnMinAwy'>" + sv.tmeRemndr2 + "</td>",
		  			"<td class='trnFrqy'>" + sv.trnFreq + "</td>",
				"</tr>"
				]);
	  		}
	  	}
	    /*    // Handle the errors
	    }, 
	    function(errorObject) {
	      console.log("Errors handled: " + errorObject.code);
	    */
	return false;
    });
});
 	
