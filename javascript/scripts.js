//https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
//https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
//https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
//https://s3.amazonaws.com/freecodecamp/simonSound4.mp3


/* my sounds


*/
$('document').ready(function(){

//sounds
var tlSound = $(".tlSound")[0];
var trSound = $(".trSound")[0];
var blSound = $(".blSound")[0];
var brSound = $(".brSound")[0];
var soundArr= [tlSound,trSound,blSound,brSound];

var playingBack=false;
var turnAmount=3;
var sequence=[];
var count=00;
var currentSequence=[];
var input=[];
var i=0;
var j=0;
var strict=false;
var correctAnswer=true;

var animate=[
[function(){$('.topleft').css("background-color","lightgreen");}, function(){$('.topleft').css("background-color","green");}],
[function(){$('.topright').css("background-color","pink");}, function(){$('.topright').css("background-color","red");}],
[function(){$('.botleft').css("background-color","lightyellow");}, function(){$('.botleft').css("background-color","yellow");}],
[function(){$('.botright').css("background-color","lightblue");}, function(){$('.botright').css("background-color","blue");}]
];

$('.start').on('click', startGame);

$('.strict').click(function(){
	if(strict==false){
		strict=true;
		$('.strict').css('background-color','red');
	}
	else if (strict==true){
		strict=false;
		$('.strict').css('background-color','green');
	}
})

function timerDisplay(){
	if(count<10){
		return '0'+count;
	}
}

function startGame() {
	currentSequence=[];
	sequence=[];
	input=[];
	i=0;
	j=0;
	count=00;
	$('.count').html(count);
	genSequence.call();
	cpu.call();
	count=1;
	$('.count').html(timerDisplay.call());		
}

function wrongAnswer(){
	correctAnswer=false;
	
	setTimeout(function(){
    animate[0][0].call();
	},000)
	setTimeout(function(){
    animate[0][1].call();
	},100)

	setTimeout(function(){
    animate[1][0].call();
	},100)

	setTimeout(function(){
    animate[1][1].call();
	},200)

	setTimeout(function(){
    animate[2][0].call();
	},200)

	setTimeout(function(){
    animate[2][1].call();
	},300)

	setTimeout(function(){
    animate[3][0].call();
	},300)

	setTimeout(function(){
    animate[3][1].call();
	},400)

	setTimeout(function(){
    animate[0][0].call();
	},400)
	setTimeout(function(){
    animate[0][1].call();
	},500)

	setTimeout(function(){
    animate[1][0].call();
	},500)

	setTimeout(function(){
    animate[1][1].call();
	},600)

	setTimeout(function(){
    animate[2][0].call();
	},600)

	setTimeout(function(){
    animate[2][1].call();
	},700)

	setTimeout(function(){
    animate[3][0].call();
	},700)

	setTimeout(function(){
    animate[3][1].call();
	},800)

	if(strict==true){
		correctAnswer=true;
		startGame.call();
	}
		
	else if(strict==false){
	cpu.call();
	}
}

function winner(){
	$('.simon').fadeOut(1000);
	
	setTimeout(function(){
		$('.winner').fadeIn(400);
	},1000)
	
	
	setTimeout(function(){
	$('.winner').fadeOut(1000);
	},1800)
	
	setTimeout(function(){
	$('.simon').fadeIn(1000);
	startGame.call();
	},2800)
}

$('.pie').mouseup(function() {

	if(playingBack==false){
		input.push( $(this).val() );
	
		for(var u=0;u<input.length;u++){
			
			if(input[u]==currentSequence[u]){
				correctAnswer=true;
				
				if(u==sequence.length-1){
					winner.call();
				}
				
				else if(u==currentSequence.length-1){
				playingBack=true;
				input=[];
				cpu.call();
				}

			}
		
			else if(input[u]!=currentSequence[u]){
			input=[];
			wrongAnswer.call();
			}

		}

	}

})

function cpu(){
	playingBack=true;
	
	if(correctAnswer==true){
	currentSequence.push(sequence[i]);
	count+=1;
	$('.count').html(timerDisplay.call());
	}

	var playback=setInterval(function(){ 
		
		if(j<currentSequence.length){
					
			animate[currentSequence[parseInt(j)]][0].call();
			soundArr[currentSequence[parseInt(j)]].play();
					
			setTimeout(function(){
			animate[currentSequence[parseInt(j)]][1].call();
			j+=1;		
			}, 500);		
		}

		else{
			i+=1;
			j=0;
			clearInterval(playback);
			playingBack=false;
		} 
	//end playback
	}, 1000);
//end cpu
}

function genSequence() {
	
	for(var i=0;i<turnAmount;i++){
		sequence.push( Math.floor(Math.random()*4 ) );
	}
	//console.log(sequence);
}
	
//buttons
if(playingBack==false){

	$(".topleft").mousedown(function() {
	    tlSound.play();
	    $(this).css("background-color","lightgreen");
		
	})
	$(".topleft").mouseup(function() {
	    tlSound.pause();
	    tlSound.currentTime = 0
	    $(this).css("background-color","green");
	})

	$(".topright").mousedown(function() {
	    trSound.play();
	    $(this).css("background-color","pink");
	})
	$(".topright").mouseup(function() {
	    trSound.pause();
	    trSound.currentTime = 0
	    $(this).css("background-color","red");
	})

	$(".botleft").mousedown(function() {
	    blSound.play();
	    $(this).css("background-color","lightyellow");
	})
	$(".botleft").mouseup(function() {
	    blSound.pause();
	    blSound.currentTime = 0
	    $(this).css("background-color","yellow");
	})

	$(".botright").mousedown(function() {
	    brSound.play();
	    $(this).css("background-color","lightblue");
	})

	$(".botright").mouseup(function() {
	    brSound.pause();
	    brSound.currentTime = 0
	    $(this).css("background-color","blue");
	})
}


});