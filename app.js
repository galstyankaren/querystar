var caller =null;

function login() {
var video_out = document.getElementById("vid-box");
var url = new URL(window.location.href);
var user = url.searchParams.get("user");
caller = url.searchParams.get("caller");
var phone = window.phone = PHONE({
	    number        : user || "Anonymous", // listen on username line else Anonymous
	    publish_key   : 'pub-c-913f12ba-ad24-4253-be33-ae162fdb0e5d',
	    subscribe_key : 'sub-c-56bec794-c43a-11e8-8383-966eb74ead6b',
	});	
	 phone.ready(function(){});
	phone.receive(function(session){
	    session.connected(function(session) { video_out.appendChild(session.video); });
	    session.ended(function(session) { video_out.innerHTML=''; });
  });
}

function makeCall(){
  if(caller !== null){
  var video_out = document.getElementById("vid-box");
	if (!window.phone) alert("Login First!");
	else phone.dial(caller);
  return false;
  }
}


function init() {
  //// Initialize Firebase.
  //// TODO: replace with your Firebase project configuration.
  var config = {
    apiKey: "AIzaSyC_JdByNm-E1CAJUkePsr-YJZl7W77oL3g",
    authDomain: "firepad-tests.firebaseapp.com",
    databaseURL: "https://firepad-tests.firebaseio.com"
  };
  firebase.initializeApp(config);
  //// Get Firebase Database reference.
  var firepadRef = getExampleRef();
  //// Create CodeMirror (with line numbers and the JavaScript mode).
  var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material'
  });
  //// Create Firepad.
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
    defaultText: '\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
  });
  login();
}
// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  return ref;
}