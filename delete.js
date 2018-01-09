//GLOBAL VARIABLES
var i = 0;
var globdataset;
var globkeys;

// Initialize Firebase (Copied from firebase as a given code for
// initialization)
var config = {
    apiKey: "AIzaSyALCaOvFvn7bdkDfKTov0vyNIsior0zsm0",
    authDomain: "first-development-contacts.firebaseapp.com",
    databaseURL: "https://first-development-contacts.firebaseio.com",
    projectId: "first-development-contacts",
    storageBucket: "first-development-contacts.appspot.com",
    messagingSenderId: "177260707116"
};
firebase.initializeApp(config);

//Collections are tables in firebase. The collection will be created on the fly
//Reference collection
var ContactDetailsRef = firebase.database().ref('ContactDetails');

//Create a reference variable with the path to the database that needs
// to be accessed
var reference = firebase.database().ref('ContactDetails');
reference.on('value', getData, DataErr);//Bind different kinds of events which is called a value. Two functions.

//Retrieve the data from firebase
function getData(data){
    //console.log(data.val());
    var dataset = data.val();
    globdataset = dataset; //For global use
    var keys = Object.keys(dataset);
    globkeys = keys; //For global use
    //console.log(keys);

    for (i = 0; i < keys.length; i++)
    {
        var k = keys[i];
        var Firstname = dataset[k].Name;
        var Surname = dataset[k].Surname;
        var Email = dataset[k].Email;
        var CellNo = dataset[k].CellNo;
        
        //console.log(Firstname,Surname,Email,CellNo);
        var Node = document.createElement('li'); //Create a <li> node
        var textnode = document.createTextNode(Firstname + ' ' + Surname + ' | Email: ' + Email + ' | Cell: ' + CellNo);//Create a text node
        Node.appendChild(textnode);//Append the test to the <li>
        document.getElementById("ContactList").appendChild(Node); //Append the <li> to <ol> with the id = "Contact List"
    }


}
function DataErr(err){
    console.log('Error!');
    console.log(err);
}

// Event listener, so listen to form submissions
document.getElementById("HomeBt").onclick = function(){EditContacts()};

//Function to go to home after clicking the "Go Home" button
function EditContacts(){
    console.log("Click");
    location.href = "index.html";
}

//Function to check which element in the ordered list was clicked and to
//pop-up a prompt box for delete or edit contact
function EditDelete(){

    var g = document.getElementById('ContactList');
    var ClickedItemNumber;
    for (var i = 0, len = g.children.length; i < len; i++)
    {

        (function(index){
            g.children[i].onclick = function(){
                ClickedItemNumber = index + 1; 
                console.log("Clicked on list number " + ClickedItemNumber + " ID: " + globkeys[ClickedItemNumber-1]);
                firebase.database().ref('ContactDetails').child(globkeys[ClickedItemNumber-1]).remove();
                document.getElementById("ContactList").style.display = 'none';
                location.reload();
            }    
        })(i);
        
    }
    
    
}

