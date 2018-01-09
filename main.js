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
    var keys = Object.keys(dataset);
    //console.log(keys);

    for (var i = 0; i < keys.length; i++)
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
        document.getElementById("ContactList").appendChild(Node); //Appent the <li> to <ol> with the id = "Contact List"
        
    }


}
function DataErr(err){
    console.log('Error!');
    console.log(err);
}

// Event listener, so listen to form submissions
document.getElementById('ContactForm').addEventListener('submit', SubmitForm);
document.getElementById("DeleteContactBt").onclick = function(){DeleteContacts()};

function DeleteContacts(){
    console.log("Click");
    location.href = "deletecontacts.html";
}

document.getElementById("EditContactBt").onclick = function(){EditContacts()};

function EditContacts(){
    console.log("Click");
    location.href = "editcontacts.html";
}


//Form submission function
function SubmitForm(e){
    e.preventDefault();

    document.getElementById("ContactList").style.display = 'none';
    console.log("Submission Success, Details:"); //Test that the submit button works

    //Getting the value
    var Name = GetInputValues('Name');
    var Surname = GetInputValues('Surname');
    var Email = GetInputValues('Email');
    var CellNo = GetInputValues('CellNo');

    /*console.log(Name);//Message sent to the console (F12)
    console.log(Surname);
    console.log(Email);
    console.log(CellNo);*/

    //Save contact using the function created
    SaveContacts(Name,Surname,Email,CellNo);

    //Show save message to user for successfull submission
    document.querySelector('.SuccessAlert').style.display = 'block';

    //Timeout for alert after 2s
    setTimeout(function(){
        document.querySelector('.SuccessAlert').style.display = 'none';
        location.reload();
    }, 1000);

    //Clearing the form after submission
    document.getElementById('ContactForm').reset();

}

//To get all of the input values. Use document.getElementByID, but will
//rather use a self made function to not have to type getElementByID all
//the time

function GetInputValues(id){
    return document.getElementById(id).value;
}

//Contact details save function
function SaveContacts (Name, Surname, Email, CellNo){
    var NewContactDetailsRef = ContactDetailsRef.push();
    NewContactDetailsRef.set({
        Name: Name,
        Surname: Surname,
        Email: Email,
        CellNo: CellNo
    });//Sending an object of data to the Contact details collection
}

