var firebaseConfig = {
    apiKey: "AIzaSyBczn8qs9HmYIG4defFqXdzaLJ_vmOtfV8",
    authDomain: "gosnap-b045d.firebaseapp.com",
    databaseURL: "https://gosnap-b045d-default-rtdb.firebaseio.com",
    projectId: "gosnap-b045d",
    storageBucket: "gosnap-b045d.appspot.com",
    messagingSenderId: "770597647888",
    appId: "1:770597647888:web:0a1b77e15af3165447bc95"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        like : 0,
        message : msg,
        name:user_name
    });
    document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
name  = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>" + name + "<img src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='warning' id=" + firebase_message_id + "value= " + like + "onclick='update_like(this.id)'>";
span_with_tag =  "<span>Like:" + like  + "</span></button>";

row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
 } });  }); }
getData();

function update_like(message_id)
{
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    firebase.database.ref(room_name).child(message_id).update({
        like : updated_likes
    });
    
}

function logout()
{
    localStorage.removeItem(user_name);
    localStorage.removeItem(room_name);
    window.location.replace("index.html");
}