var userAnswer = '';
var numCorrect = 0;
var numWrong = 0;
var numBlank = 0;
var i = 0;

var intervalId;
var timeLeft = 20;
var resultTimeLeft = 5;

var questionContainer;
var triviaObj = [
    {
        question: '1. Who is the Hufflepuff house ghost?',
        options: ['Moaning Myrtle','Fat Friar','Grey Lady','Bloody Baron','Nearly Headless Nick'],
        answer: '1',
        answerStr: 'Fat Friar',
        src: 'fat-friar.gif'
    },
    {
        question: '2. Which creatures pull the carriages that take students from the Hogwarts Express to the Castle?',
        options: ['hippogriffs','thestrals','centaurs','manticores'],
        answer: '1',
        answerStr: 'thestrals',
        src: 'thestral.gif'
    },
    {
        question: '3. Dumbledore has a scar above his left knee that is a perfect map of what?',
        options: ['Hogwarts','The Ministry of Magic','Diagon Alley','The London Underground'],
        answer: '3',
        answerStr: 'The London Underground',
        src: 'london-underground.jpg'
    },
    {
        question: "4. What potion did Hermione brew in Moaning Myrtle's bathroom in her second year?", //
        options: ['Veritaserum','Wolfsbane Potion','Polyjuice Potion','Felix Felicis','Amortentia'],
        answer: '2',
        answerStr: 'Polyjuice Potion',
        src: 'polyjuice-potion.gif'
    },
    {
        question: '5. What does S.P.E.W. stand for?',
        options: ['Society for the Prosecution of Evil Wizards','Society for the Promotion of Elfish Welfare','Society for the Protection of Elderly Witches','Saving Persecuted Elves Willfully'],
        answer: '1',
        answerStr: 'Society for the Promotion of Elfish Welfare',
        src: 'spew.gif'
    },
    {
        question: '6. Which spell is used to levitate objects?', //
        options: ['Wingardium Leviosa','Alohomora','Petrificus Totalus','Locomotor Mortis','Expelliarmus'],
        answer: '0',
        answerStr: 'Wingardium Leviosa',
        src: 'wingardium-leviosa.gif'
    },
    {
        question: "7. Which of these is NOT one of Hagrid's many pets?",
        options: ['Norbert(a)','Fluffy','Grawp','Aragog','Fang'],
        answer: '2',
        answerStr: 'Grawp',
        src: 'grawp.gif'
    },
    {
        question: '8. Who was the headmaster of Hogwarts when the Chamber of Secrets was opened for the first time?',
        options: ['Albus Dumbledore','Phineas Nigellus Black','Rufus Scrimgeour','Armando Dippet'],
        answer: '3',
        answerStr: 'Armando Dippet',
        src: 'armando-dippet.jpg'
    },
    {
        question: '9. Which of these is NOT a candy that can be purchased at Honeydukes in Hogsmeade village?',
        options: ['Blood-Flavored Lollipops','Toothflossing Stringmints','Taffy Toads','Ice Mice'],
        answer: '2',
        answerStr: 'Taffy Toads',
        src: 'taffy-toads.jpg'
    },
    {
        question: "10. Who was the Potters' Secret Keeper?",
        options: ['Peter Pettigrew','Albus Dumbledore','Sirius Black','Remus Lupin'],
        answer: '0',
        answerStr: 'Peter Pettigrew',
        src: 'peter-pettigrew.gif'
    }
];

$("#start").on("click", function() {
    $("#main-content").html("Time Remaining: <span id='time-left'>" + timeLeft + "</span> Seconds<br><br>");

    questionContainer = $("<div>");
    questionContainer.addClass("container");
    loadQuestion();
});

$("#main-content").on("click", "div .answer", function() {
    clearInterval(intervalId);
    userAnswer = $(this).attr("value");
    if (userAnswer === triviaObj[i].answer) {
            numCorrect++;
            $(questionContainer).html("Correct!<br><img src='./assets/images/" + triviaObj[i].src + "'>");
    } else {
            numWrong++;
            $(questionContainer).html("Nope!<br><br>The correct answer was: " + triviaObj[i].answerStr+ "<br><img src='./assets/images/" + triviaObj[i].src + "'>");
    }
    i++;
    intervalId = setInterval(decrementResult, 1000);
});

$("#main-content").on("click", "#done", function() {
    $("#done").remove();
    reset();
});

function decrement() {
    timeLeft--;
    $("#time-left").html(timeLeft);
    if (timeLeft === 0) {
        clearInterval(intervalId);
        numBlank++;
        $(questionContainer).html("Out of time!<br><br>The correct answer was: " + triviaObj[i].answerStr+ "<br><img src='./assets/images/" + triviaObj[i].src + "'>");
        i++;
        intervalId = setInterval(decrementResult, 1000);
    }
}

function decrementResult() {
    resultTimeLeft--;
    if (resultTimeLeft === 0) {
        clearInterval(intervalId);
        loadQuestion();
    }


}

function loadQuestion() {
    if (i < triviaObj.length) {
        timeLeft = 20;
        intervalId = setInterval(decrement, 1000);
        $(questionContainer).empty();

        var quizQuestion = $("<span>");
        $(quizQuestion).text(triviaObj[i].question);
        $(questionContainer).append(quizQuestion);

        for (var j = 0; j < triviaObj[i].options.length; j++) {
            var answerOptions = $("<span>");
            answerOptions.addClass("answer");
            answerOptions.attr("id", "q" + i + "a" + j);
            answerOptions.attr("value", j);
            $(answerOptions).text(triviaObj[i].options[j]);
            $(questionContainer).append(answerOptions);
        }
        
        $(questionContainer).append("<br>");
        $("#main-content").append(questionContainer);

    } else if (i >= triviaObj.length) {
        clearInterval(intervalId);
        $(questionContainer).html("All Done!<br><br>Correct Answers: " + numCorrect + "<br>Incorrect Answers: " + numWrong + "<br>Unanswered: " + numBlank);
        $("#main-content").append("<button id='done'>Start Over?</button>");
    }
    
    resultTimeLeft = 5;
}

function reset() {
    userAnswer = '';
    numCorrect = 0;
    numWrong = 0;
    numBlank = 0;
    i = 0;
    $(questionContainer).empty();
    timeLeft = 20;

    loadQuestion();            
}