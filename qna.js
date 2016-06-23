function displayQuestion(question, qnaNumber) {
    var qnadiv = $('<div id=qna' + qnaNumber + '></div>');
    var questiondiv = $('<div id=question><b>Question ' + qnaNumber + '</b></div>');
    question.forEach(function(value, i) {
        var linediv = $('<pre>' + value + '</pre>');
        questiondiv.append(linediv);
    });
    qnadiv.append(questiondiv);
    $('#qna').append(qnadiv);
}

function displayOptions(optionsArray, qnaNumber) {
    var optiondiv = $('<div id=option ></div>');
    optionsArray.forEach(function(options, i) {
        options.forEach(function(value, j) {
            if (j == 0) {
                var linediv = $('<pre>' + i + ". " + value + '</pre>');
            } else {
                var linediv = $('<pre>   ' + value + '</pre>');
            }
            optiondiv.append(linediv);
        });
    });
    $('#qna' + qnaNumber).append(optiondiv);
}

function toggleAnswer(qnaNumber) {
    $('#answer' + qnaNumber).toggle();
}

function displayAnswers(answers, qnaNumber) {
    var button = $('<input />', {
        type: 'button',
        value: 'Answer',
        id: 'button' + qnaNumber,
        on: {
            click: function() {
                toggleAnswer(qnaNumber);
            }
        }
    });
    var answerdiv = $('<div id=answer' + qnaNumber + ' ></div>');
    answerdiv.hide();
    answers.forEach(function(value, i) {
        var linediv = $('<pre>' + value + '</pre>');
        answerdiv.append(linediv);
    });

    $('#qna' + qnaNumber).append(button);
    $('#qna' + qnaNumber).append(answerdiv);
}

function parseQna(qna, qnaNumber) {
    if (qna.hasOwnProperty("question") && qna.hasOwnProperty("options") && qna.hasOwnProperty("answer")) {
        displayQuestion(qna['question'], qnaNumber);
        displayOptions(qna['options'], qnaNumber);
        displayAnswers(qna['answer'], qnaNumber);
    }
}

function start() {
    $.getJSON('qna.json', function(data) {
        var qnas = data['qna'];

        qnas.forEach(function(value, i) {
            parseQna(value, i);
        });

    });

}
