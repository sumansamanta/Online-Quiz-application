let index = 0;
let attempt = 0;
let score =0;
let wrong =0;
let questions = quiz.sort(function(){
	return 0.5 - Math.random();
});
let totalQuestion = questions.length;

$(function(){
	
	let totalTime = 200;
	let min = 00;
	let sec = 00;
	let counter = 00;
	let timer = setInterval(function(){
		counter++;
		min = Math.floor((totalTime-counter)/60);
		sec = totalTime-(min*60)-counter;
		
		
		$(".timerBox span").text(min+":"+sec);
		if(counter==totalTime){
			
			aleart("Time's up. Press ok to show the result.");
			result();
			clearInterval(timer);
		}
		
		
	}, 1000);
	
	
	printQuestion(index);
	
})

function printQuestion(i){
	
	$(".questionBox").text(questions[i].question);
	$(".optionBox span").eq(0).text(questions[i].option[0]);
	$(".optionBox span").eq(1).text(questions[i].option[1]);
	$(".optionBox span").eq(2).text(questions[i].option[2]);
	$(".optionBox span").eq(3).text(questions[i].option[3]);
}


function checkAnswer(option){
	attempt++;
	let optionClicked = $(option).data("opt");
	
	
	if(optionClicked == questions[index].answer ){
		$(option).addClass("right");
		score++;
	}else{
		$(option).addClass("wrong");
		wrong++;
	}
	$(".scoreBox span").text(score);
	
	$(".optionBox span").attr("onClick","");
}



function showNext(){
	
	if(index>=(questions.length -1)){
		showResult();
		return;
	}
	index++;
	$(".optionBox span").removeClass();
	$(".optionBox span").attr("onClick","checkAnswer(this)");
	printQuestion(index);
}



function showResult(j){
	
	if(
		j == 1 &&
		index < questions.length - 1 &&
		!confirm(
			"Quiz has not finished yet.Press ok to skip quiz & get you final result."
		)
	){
		return;
	}
	result();
}

function result(){
	$("#questionScreen").hide();
	$("#resultScreen").show();
	
	
	$("#totalQuestion").text(totalQuestion);
	$("#attemptQuestion").text(attempt);
	$("#correctAnswer").text(score);
	$("#wrongAnswer").text(wrong);
}

