var letter = document.getElementById("letter");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
if(letter != null) letter.innerHTML = 'a';
if(prev != null) prev.innerHTML = 'z';
if(next != null) next.innerHTML = 'b';
var isUpper = false;

var sentence = document.getElementById("sentence");
sentence.innerHTML = "";

function reload(){
    letter = document.getElementById("letter");
    prev = document.getElementById("prev");
    next = document.getElementById("next");
}

function left_button(){
    reload();
    var c = letter.innerHTML;
    if(c == 'a' || c == 'A'){
        letter.innerHTML = (c == 'a') ? 'z' : 'Z';
        prev.innerHTML = String.fromCharCode(letter.innerHTML.charCodeAt(0) - 1);
        next.innerHTML = c;
    }
    else{
        letter.innerHTML = String.fromCharCode(c.charCodeAt(0) - 1);
        next.innerHTML = c;
        c = letter.innerHTML;
        if(c == 'a' || c == 'A'){
            prev.innerHTML = (c == 'a') ? 'z' : 'Z';
        }else{
            prev.innerHTML = String.fromCharCode(c.charCodeAt(0) - 1);
        } 
    }
}

function right_button(){
    reload();
    var c = letter.innerHTML;
    if(c == 'z' || c == 'Z'){
        letter.innerHTML = (c == 'z') ? 'a' : 'A';
        prev.innerHTML = c;
        next.innerHTML = String.fromCharCode(letter.innerHTML.charCodeAt(0) + 1);
    }
    else{
        letter.innerHTML = String.fromCharCode(c.charCodeAt(0) + 1);
        prev.innerHTML = c;
        c = letter.innerHTML;
        if(c == 'z' || c == 'Z'){
            next.innerHTML = (c == 'z') ? 'a' : 'A';
        }else{
            next.innerHTML = String.fromCharCode(c.charCodeAt(0) + 1);
        } 
    }
}

function uppercase_button(){
    reload();
    if(isUpper){
        letter.innerHTML = letter.innerHTML.charAt(0).toLowerCase();
        next.innerHTML = next.innerHTML.charAt(0).toLowerCase();
        prev.innerHTML = prev.innerHTML.charAt(0).toLowerCase();
    }
    else{
        letter.innerHTML = letter.innerHTML.charAt(0).toUpperCase();
        next.innerHTML = next.innerHTML.charAt(0).toUpperCase();
        prev.innerHTML = prev.innerHTML.charAt(0).toUpperCase();
    }
    isUpper = !isUpper;
}

function select_letter(){
    reload();
    sentence.innerHTML += letter.innerHTML;
}

function add_space(){
    sentence.innerHTML += " ";
}

function delete_char(){
    if(sentence.innerHTML.length > 0){
        sentence.innerHTML = sentence.innerHTML.slice(0, -1);
    }
}

// https://daily-dev-tips.com/posts/javascript-mouse-drawing-on-the-canvas/#canvas-mouse-draw-with-javascript