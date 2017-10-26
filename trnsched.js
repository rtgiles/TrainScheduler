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
    var trnNxtArvl2 ="";
   
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
	  	var trnFstTme= $("#trnFstTme").val().trim();
		var trnFreq= $("#trnFreq").val().trim();
	  	

	  	console.log(trnName);
	  	console.log(trnDest);
	  	console.log(trnFstTme);
	  	console.log(trnFreq);
	  	
	  	var trnTmeCnvrt= moment(trnFstTme, "HH:mm");
		  	console.log("trnTmeCnvrt " + trnTmeCnvrt);

		  	var diffTme= moment().diff(moment(trnFstTme, "HH:mm"));
		  	console.log("diffTme " + diffTme);

		  	var tmeRemndr= moment().diff(moment(trnFstTme, "HH:mm"),"minutes") % trnFreq;
		  	console.log("tmeRemndr " + tmeRemndr);
		  	var tmeRemndr2= moment(tmeRemndr).format("HH:mm");
		  	console.log("tmeRemndr2 " + tmeRemndr2);

		  	var trnMinutes= trnFreq - tmeRemndr;
		  	var trnMinutes2= moment(trnMinutes).format("hh:mm");
		  	console.log("trnMinutes2 " + trnMinutes2);
		  	
		  	
		  	var trnFreq2= moment(trnFreq).format("hh:mm");
		//};
		database.ref().push({
		  		trnName: trnName,
				trnDest: trnDest,
				trnFstTme: trnFstTme,
				trnFreq2: trnFreq2,
				tmeRemndr2: tmeRemndr2,
				trnMinutes2: trnMinutes2,
		  		dateAdded: firebase.database.ServerValue.TIMESTAMP
		  	});
	  	//};

	  	//time_calc();
	  	//databasePush();
	  	return false;
  	});
  	
  	
  	// Database push
	  	function dataPush(){
		  	database.ref().push({
		  		trnName: trnName,
				trnDest: trnDest,
				trnFstTme: trnFstTme,
				trnFreq2: trnFreq2,
				tmeRemndr2: tmeRemndr2,
				trnMinutes2: trnMinutes2,
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
		      console.log(sv.trnMinutes2);

		      tableLoad(sv);
		  	});
	  	}

     //HTML Form Fill-IN
	    function tableLoad(sv){
	     // for (var i = sv.length - 1; i >= 0; i--) {
	      		//sv[i];
	           $(".table").append([
		  		"<tr>",
		  			"<td class='trnName'>" + sv.trnName + "</td>",
		  			"<td class='trnDstn'>" + sv.trnDest + "</td>",
		  			"<td class='trnFrqy'>" + sv.trnFreq2 + "</td>",
		  			"<td class='trnNxtArvl'>" + sv.trnMinutes2 + "</td>",
		  			"<td class='trnMinAwy'>" + sv.tmeRemndr2 + "</td>",
		  		"</tr>"
				]);
	  		//}
	  	}

	    /*    // Handle the errors
	    }, 
	    function(errorObject) {
	      console.log("Errors handled: " + errorObject.code);
	    */
	
   

 	
