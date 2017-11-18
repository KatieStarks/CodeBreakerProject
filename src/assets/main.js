let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    if(answer.value == '' || attempt.value == '') {
        setHiddenFields();
        }

    if(!validateInput(input.value)) {
        return false;
    }
    attempt.value++;

    if (getResults(input.value)) {
        setMessage('You win! :)');
        showAnswer(true);
        showReplay();
    } else if(attempt.value >= 10) {
        setMessage('You lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Nope, try again.');
    }
}

//gets results and fills in the ok, transfer, or remove icons
function getResults(input) {
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    let correct = 0;
    for(let i = 0; i < input.length; i++) {
        if(input.charAt(i) == answer.value.charAt(i)) {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if(answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }

    html += '</div></div>';

    document.getElementById('results').innerHTML += html;

    if(correct == 4) {
        return true;
    } else {
        return false;
    }
}

function showAnswer(success){
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    if(success) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}

//sets the answer
function setHiddenFields() {
    answer.value = Math.floor(Math.random() * 10000).toString();
    while (answer.value.length < 4){
        answer.value = "0" + answer.value;
    }
    attempt = 0;
}

//sets the message label to whatever provided
function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

//validate user input
function validateInput(input) {
    if(input.length == 4) {
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

//
