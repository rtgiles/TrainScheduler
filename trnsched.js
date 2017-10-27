//$(document).ready(function(){}) 

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
    
   
//Clock function

	function update() {
	  $("#clock").html(moment().format("D MMMM YYYY H:mm:ss"));
	}

	setInterval(update, 1000);
	
	dataRetrieve();
    //time_calc();
    //tableLoad(sv);

  //Submit button 
  $(".btn").on("click", function(event) {
	  	event.preventDefault();
	  	var trnName= $("#trnName").val().trim();
	  	var trnDest= $("#trnDest").val().trim();
	  	var trnFrstTme= $("#trnFstTme").val().trim();
		var trnFreq= $("#trnFreq").val().trim();
	  	

	  	console.log(trnName);
	  	console.log(trnDest);
	  	console.log(trnFrstTme);
	  	console.log(trnFreq);
	  	
  		database.ref().push({
	  		trnName: trnName,
			trnDest: trnDest,
			trnFrstTme: trnFrstTme,
			trnFreq: trnFreq,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
	  	});
	  	
	  	return false;
  	});
  	
  	//Retrieve Data from Firebase 
	  	function dataRetrieve(){
		  	database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
		      // storing the snapshot.val() in a variable for convenience
		      var sv = snapshot.val();

		      // Console.loging the last user's data
		      console.log(sv.trnName);
		      console.log(sv.trnDest);
		      console.log(sv.trnFrstTme);
		      console.log(sv.trnFreq);
		      
		      tableLoad(sv);
		  	});
	  	}

     //HTML Form Fill-IN
	    function tableLoad(sv){
	     var frstTmeCnvt= moment(sv.trnFrstTme, "hh:mm").subtract(1, "years");
	     	console.log(frstTmeCnvt);
     	var crrntTme= moment();
     		console.log("Current Time:   " + moment(crrntTme).format("hh:mm"));
 		var diffTme= moment().diff(moment(frstTmeCnvt),"minutes");
 			console.log("Difference in Time:  " + diffTme);
		
		var tmeRemndr= diffTme % sv.trnFreq;

		var trnMinutesTill= sv.trnFreq - tmeRemndr;
			console.log("Minutes till Train:  "+ trnMinutesTill);

		var nxtTrn= moment().add(trnMinutesTill, "minutes").format("hh:mm");
			console.log("Arrival Time:  "+ nxtTrn)/*moment(nxtTrn).format("hh:mm"))*/;

	          $(".table").append([
		  		"<tr>",
		  			"<td class='trnName'>" + sv.trnName + "</td>",
		  			"<td class='trnDstn'>" + sv.trnDest + "</td>",
		  			"<td class='trnFrqy'>" + sv.trnFreq + "</td>",
		  			"<td class='trnNxtArvl'>" + trnMinutesTill + "</td>",
		  			"<td class='trnMinAwy'>" + nxtTrn + "</td>",
		  		"</tr>"
				]);
	  		//}
	  	}

	    /*    // Handle the errors
	    }, 
	    function(errorObject) {
	      console.log("Errors handled: " + errorObject.code);
	    */
	
   

 	
