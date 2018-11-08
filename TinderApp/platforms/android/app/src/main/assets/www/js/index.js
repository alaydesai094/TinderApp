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
	}
	function onSuccessExecuteSql( tx, results ){
		console.log( 'Execute SQL completed' );
	alert( "Execute SQL completed" );
	}
	function onError( err ){
		console.log( err )
	}

// CREATE DB
db.transaction(
		function(query){
		query.executeSql(
				"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, Dob DATE, Location TEXT )",
				[],
				onSuccessExecuteSql,
				onError
			)
		},
		onError,
		onReadyTransaction
	)	
	


// sigin up button to redirect to signup page
if(document.getElementById("signup-btn")){
	document.getElementById("signup-btn").addEventListener("click", signup);

function signup() {
  // debug:
  console.log("signup button pressed!");
  alert("signup button pressed!");
	window.location.href = "signup.html";
	
}
}

//signup  button to insert data
if(document.getElementById("signup-in")){
//Sign Up Data insert
document.getElementById("signup-in").addEventListener("click", a);

function a() {
	
	//Getting input from the sign up page
	var email = document.getElementById("email").value;
	var psw = document.getElementById("psw").value;
	var name = document.getElementById("name").value;
	var dob = document.getElementById("dob").value;
	var location = document.getElementById("location").value;
	
  // debug:
  console.log("signup button pressed!");
  alert("signup button pressed!");
	
	//Sql
	db.transaction(
		function(query){
			var sql = "INSERT INTO users (email,password,name,Dob,Location) VALUES ('"+email+"','"+psw+"','"+name+"','"+dob+"','"+location+"')";
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

if(document.getElementById("login-btn")){
	document.getElementById("login-btn").addEventListener("click", login);

function login() {
  // debug:
  console.log("login button pressed!");
  alert("login button pressed!");
	
	//Getting input from the sign up page
	var email = document.getElementById("email").value;
	var psw = document.getElementById("psw").value;
	
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
			return false;
		}
		else{
			console.log("Login Successful");
			alert("Login Successful");
			
		}
	
}
}
}