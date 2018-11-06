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

	db.transaction(
		function(query){
			var sql = "INSERT INTO users (email,password,name,Dob,Location) VALUES(?,?,?,?,?)";
			query.executeSql( sql,['alaydesai094@gmail.com','1234','Alay','09-05-1994','Toronto'],
			onSuccessExecuteSql,
			onError )
		},
		onError,
		onReadyTransaction
	)
	
	
document.getElementById("signup-btn").addEventListener("click", signup);

function signup() {
  // debug:
  console.log("signup button pressed!");
  alert("signup button pressed!");
	window.location.href = "signup.html";
	
}

