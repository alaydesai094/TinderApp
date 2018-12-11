

//  															----------------------: Connection to DB :---------------------------- 


document.addEventListener("deviceready", connectToDatabase);

var db = null; 
db = window.openDatabase("tinder", "1.0", "Tinder App", 2 * 1024 * 1024);

	
function connectToDatabase() {
  console.log("device is ready - connecting to database");
  // 2. open the database. The code is depends on your platform!
  if (window.cordova.platformId === 'browser') {
    console.log("browser detected...");


	   
	  
    // For browsers, use this syntax:
      //(nameOfDb, version number, description, db size)
    // By default, set version to 1.0, and size to 2MB
  // db = window.openDatabase("Tinder", "1.0", "Tinder App",2 * 1024 * 1024);
  }
  else {
    alert("mobile device detected");
    console.log("mobile device detected!");
    var databaseDetails = {"name":"Tinder.db", "location":"default"}
    db = window.sqlitePlugin.openDatabase(databaseDetails);
    console.log("done opening db");
	alert("done opening db");

	db.transaction(
		function(query){
		query.executeSql(
				"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, age TEXT, location TEXT, contact TEXT )",
				[],
				onSuccessExecuteSql,
				onError
			)
		},
		onError,
		onReadyTransaction
	)	
	
	
	
  }

  if (!db) {
    alert("databse not opened!");
    return false;
  }

}


// ERROR MESSAGES
function onReadyTransaction( ){
		console.log( 'Transaction completed' );
		alert("Transaction completed");
	
	if(document.getElementById("updateProfile")){
							userData()
		console.log( "Update Profile" );
					}	
	
	
	}
	function onSuccessExecuteSql( tx, results ){
		console.log( 'Execute SQL completed' );
	alert( "Execute SQL completed" );
	// display all profile	
	var email = localStorage.getItem("email");
		
	if(document.getElementById("home")){
							showAllPressed()
							currentLocation();
		console.log( "showAllPressed" );
		console.log( "Showing Current Location" );
					}

//------------------------------------------------------------------------------		
		
	}
	function onError( err ){
		console.log( err )
	}
	
//															----------------------: CREATE Users Table :---------------------- 
	
	
db.transaction(
		function(query){
		query.executeSql(
				"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, age TEXT, location TEXT, contact TEXT )",
				[],
				onSuccessExecuteSql,
				onError
			)
		},
		onError,
		onReadyTransaction
	)	
	
//   														---------------------: sigin up button to redirect to signup page :----------------------  
	
if(document.getElementById("signup-btn")){
	document.getElementById("signup-btn").addEventListener("click", signup);

function signup() {
  // debug:
  console.log("signup button pressed!");
  alert("signup button pressed!");
	window.location.href = "signup.html";
	
}
}

//  		  														---------------------:  signup  button to insert data :---------------------- 


 if(document.getElementById("signup-in")){
//Sign Up Data insert
document.getElementById("signup-in").addEventListener("click", a);

function a() {
	
	//Getting input from the sign up page
	var email = document.getElementById("email").value;
	var psw = document.getElementById("psw").value;
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var location = document.getElementById("location").value;
	var contact = document.getElementById("contact").value;
	
  // debug:
  console.log("signup button pressed!");
  alert("signup button pressed!");
	
	//Sql
	db.transaction(
		function(query){
			var sql = "INSERT INTO users (email,password,name,age,location,contact) VALUES ('"+email+"','"+psw+"','"+name+"','"+age+"','"+location+"','"+contact+"')";
			query.executeSql( sql,[],
			onSuccessExecuteSql,
			onError )
		},
		onError,
		onReadyTransaction
	)
	//redirect back
	window.location.href = "index.html";
	
}
}

 //  		  																		---------------------:  Login :----------------------   
 
 
 
if(document.getElementById("login-btn")){
	document.getElementById("login-btn").addEventListener("click", login);

function login() {
  // debug:
  console.log("login button pressed!");
  alert("login button pressed!");
	
	//Getting input from the sign up page
	var email = document.getElementById("email").value;
	var psw = document.getElementById("psw").value;
	
		localStorage.setItem("email",email);
		console.log(localStorage.getItem("email"));
  		alert(localStorage.getItem("email"));
	
	
	//Sql
	db.transaction(
		function(query){
			var sql = "SELECT email,password FROM users where email = '"+email+"' and password ='"+psw+"' ";
			query.executeSql( sql,[],
			displayResults,
			onSuccessExecuteSql,
			onError )
		},
		onError,
		onReadyTransaction
	)
	
	
	
	
	// if count 1 then redirect home.html else login failed
	function displayResults( query, results ){
		
		if(results.rows.length == 0) {
			console.log("failed");
			alert("Failed");
			window.location.href = "index.html";
			return false;
		}
		else{
			console.log("Login Successful");
			alert("Login Successful");
			window.location.href = "setprofile.html";
			
		}
}
}
}

 //  		  																		---------------------:  Complete profile code  :----------------------


if(document.getElementById("finish")){
document.getElementById("finish").addEventListener("click",finish);
	
var email = localStorage.getItem("email");
//var location = document.getElementById("location").value;
	
function finish() {
  console.log("finish");
	console.log("email :"+email);
  alert("finish : " +email);
	
	//Next Page
window.location.href = "Home.html";	
}
}



// --------------------------------------------------------------------------------------




document.addEventListener("devcieready", doNothing);

function doNothing() {

}


//  		  																		---------------------:  Camera   :----------------------
 

if(document.getElementById("takePhotoButton")){
document.getElementById("takePhotoButton").addEventListener("click",takePhoto);

function takePhoto() {
  console.log("take photo pressed");
  alert("take photo pressed");

  // 1. choose options for the camera
  var cameraOptions = {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE
  };

 navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
}	
}

function onSuccess(filename) {
  // DEBUG: Show the original file name

  console.log("Image path: "  + filename);
  alert("Image path: "  + filename);

  // ---------
  if (window.cordova.platformId == "android") {
    // if you are using android, you need to do some extra steps
    // to ensure you have the "real" image file path
    // Note: you need to install this plugin: cordova-plugin-filepath
    // for it to work properly
    window.FilePath.resolveNativePath(filename, function(result) {
      imageURI = result;
      alert("Successfully converted image path: " + result);
      console.log("Successfully converted image path: " + result);

      localStorage.setItem("photo", result);

      var image = document.getElementById("photoContainer");
      image.src = result;

    }, function (error) {
      alert("error when converting file path!");
    });
  }
  else {
    // show image in UI
    // show the image in the user interface
    var imageBox = document.getElementById("photoContainer");
    imageBox.src=filename;

    // adding it to local storage
    localStorage.setItem("photo", filename);

    // DEBUG STATEMENT
    alert(localStorage);
 }
 // ---------------------------------------------------------------------------



  console.log("done!");
  alert("done");

}

function onFail(errorMessage) {
  console.log("Error: " + errorMessage);
  alert("Error: " + errorMessage);
}

if(document.getElementById("pickPhotoButton")){
	document.getElementById("pickPhotoButton").addEventListener("click",pickPhotoFromGallery);
	
	function pickPhotoFromGallery() {
  console.log("photo gallery pressed!");
  alert("photo gallery pressed!");

  // 1. choose options for the camera
  var cameraOptions = {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    sourceType : Camera.PictureSourceType.PHOTOLIBRARY
  };

  navigator.camera.getPicture(onSuccess, onFail, cameraOptions);



}

$('.button').click(function(){
  $('.photo-wrap').addClass('love');
  $('.photo').addClass('match');


setTimeout(function () {
  $('.photo').removeClass('match');
  $('.photo-wrap').removeClass('love');
}, 2000);
});
}

// 		  																		---------------------:  LOGOUT USER FUNCTION    :----------------------

if(document.getElementById("logout")){
document.getElementById("logout").addEventListener("click",logout);

function logout() {
	console.log("Logging out");
    localStorage.removeItem("email");
    alert("Logged Out");
}}

//	  																			---------------------:  Geo Location  :---------------------- 

function currentLocation() {
	
    console.log("getting location!");
    var xhr = new XMLHttpRequest
    xhr.open('GET', 'https://geoip-db.com/jsonp/');
    xhr.send(null);
    xhr.onreadystatechange = function() {
        console.log("coming back!");
        console.log("coming back!");
       
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            console.log("Done getting xhr request");
            if (xhr.status === OK) {
                console.log("xhr request == OK");
                console.log(xhr.responseText); // 'This is the returned text.'
                //getting string from net
                var response = xhr.responseText;

                var r = JSON.stringify(response);

                console.log("JSON RESPONSE: " + x);

                var x = response.substring(9, response.lastIndexOf(')'));

                var z = JSON.parse(x);
                console.log(z["city"]);
                city = z["city"];
				document.getElementById("loc").innerHTML +=  city;
            } else {
                console.log('Error: ' + xhr.status);
                city = "Toronto";
				 document.getElementById("loc").innerHTML +=  city;
            }
        }
        else {
            console.log("error when fetching xhr request");
            console.log("error when fetching xhr request");
        }
    }
}




	//	  																		---------------------:  Display userprofile :---------------------- 

	
if(document.getElementById("profile-btn")){
	document.getElementById("profile-btn").addEventListener("click", profile);

function profile() {
  // debug:
  console.log("profile button pressed!");
  alert("profile button pressed!");
	window.location.href = "userprofile.html";
	
}
}


	
var userMail = localStorage.getItem("email");
	
function userData() {   
			console.log("Into userData");
	
    db.transaction(function (transaction) {
        transaction.executeSql("SELECT * FROM users where email = ? ", [userMail],
                
		function (tx, results) {
                    // to get individual items:
                        var item = results.rows.item(i);
                        console.log(item);
                        console.log(item.name);
						
								//show it in the user interface
									 document.getElementById("img").innerHTML += "<p><IMG class='resize' SRC = 'img/5.jpg'></p>"; 
								    document.getElementById("showProfile").innerHTML +=
								 "<p>Name: " + item.name + "</p>"
                                + "<p>Age : " + item.age + "</p>"
			 					+ "<p>Email : " + item.email + "</p>" 
								+ "<p>Location : " + item.Location + "</p>"
								+ "<p>Contact : " + item.Contact + "</p>";
                            
						
                    });

                }, function (error) {
        });
}


	//	  																	---------------------:  Show other Profiles :---------------------- 
  

var i = 0;
var a = 0;
var img = ["img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg"]; 
var peopleIHate = []
var  dislikepeople = ""
var x =0;

function showAllPressed() {
	console.log("Display data found");
    db.transaction(function (transaction) {
        var userMail = localStorage.getItem("email");
        transaction.executeSql("SELECT * FROM users where email not in (?)", [userMail],
                function (tx, results) {
					var numRows = results.rows.length;
					 console.log(numRows);
					 console.log(i);
					 var item = results.rows.item(i);
					
                       
					if ( i < numRows) {	   
						   // to get individual items:
                       
                        console.log(item);
                        console.log(item.name);
						var dislikepeps = parseInt(peopleIHate[x]);
						
						if (dislikepeps == item.id) {
							 console.log("skipping");
       					
							//continue // skkip
      }
					else{	
						
						if (a < img.length) {
    										
							}
						else{
							a = 0
						}
						
								var image = img[a];
								//show it in the user interface
								    document.getElementById("dbItems").innerHTML +=
								"<img class = 'square' src=' " + image + "  '/>"+
								 "<h3><b> Name: " + item.name + "</b></h3>"
                                + "<h3><b>Age : " + item.age + "</b></h3>";
							
						if(document.getElementById("dislike-btn")){
									localStorage.setItem("people",item.id);
									console.log(localStorage.getItem("people"));
							}
						
					}
						
						
						//	  							---------------------:  Like button pressed :---------------------- 

							if(document.getElementById("like-btn")){
										document.getElementById("like-btn").addEventListener("click",contactFunction);
	
									function contactFunction() {
     										console.log("pushed the contact button");
      										alert("contact will be saved with name: "  + item.name );
  											try {
   												 		var x = navigator.contacts.create({"displayName": item.name});
    																x.save();
																alert("user saved!");
  													}
  											catch (err) {
    																alert("error ");
   																 console.log("ERROR " + err);
  																}

								}}
						
						
						
					   }
					  else if (i >= numRows) {
					  	  document.getElementById("dbItems").innerHTML += " There are no more Peolple Connected to the app Invite your friends...!! "
					  }

                }, function (error) {
        });
    });
}
	

								//	  							---------------------:  Dislike button pressed :---------------------- 

							if(document.getElementById("dislike-btn")){
									document.getElementById("dislike-btn").addEventListener("click",dislike);
														function dislike() {
															console.log("dislike button pressed");
																i = i + 1 ;
																a = a + 1 ;
															 dislikepeople = localStorage.getItem("people");
																 peopleIHate.push(dislikepeople)
																console.log("Dislike People :" + peopleIHate.toString());
																
																showAllPressed()
		
 
							}}
							
														
							

	










           
	








