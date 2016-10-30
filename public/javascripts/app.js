
var baseTxt = "mostapharammo.com $ ";
var hist = "";
var command = "";
var commandHist = ["<br/>"];
var lightColours = ["white", "lightgrey", "grey", "gray"];
var changeColour = true;

var help = "<br/> Hey there! Need some help? Here is a list of commands currently available, try them out! <br/>"
			+" > help: list available commands<br/>"
			+" > hist: list all previously used commands<br/>"
			+" > clear: clear screen <br/>"
			+" > colour --<colour>: change background colour"
			+"<br/>"

$(function(){



	$('.typed').typed({
        strings: [baseTxt],
        typeSpeed: 0,
        cursorChar: "_"
    });

    $("body").keypress(function(evt){

    	if (evt.which == 13){
    		commandHist.push(command);
    		commandHist.push("<br/>");

    		hist += baseTxt+command+"<br/>";

    		/*
    		 *	AVAILABLE COMMANDS AND ACTIONS
    		 *
    		 *
    		*/

    		//HELP

    		if (command == "help"){				//help command
    			hist += help;
    		}

    		//HISTORY

    		else if(command == "hist"){								//history command, list prev. commands
    			for (var i = 0; i < commandHist.length; i++){
    				hist += commandHist[i];
    			}
    			hist += "<br/>";
    		}

    		//CLEAR

    		else if(command == "clear"){			//clear command, clear screen
    			hist = "";
    		}

    		//COLOUR

    		else if(command.substring(0,6) == "colour"){

    			var bgClr = command.substring(9).toLowerCase();


    			if (command.substring(7,9) == "--"){

    				switch(bgClr){
    					case "": hist += "-moose: no colour given<br/>";changeColour=false;break;
    					case "grey": hist += "-moose: grey sucks, choose another colour<br/>";changeColour=false;break;
    					case "gray": hist += "-moose: gray sucks, choose another colour<br/>";changeColour=false;break;
    					default: hist += "-moose: colour set to "+bgClr+"<br/>";break;
    				}
    				
    				var cursorClr = isin(bgClr, lightColours) ? 'black' : 'white' ;

    				!changeColour ? changeColour=true : document.body.style.backgroundColor = bgClr;

    				document.getElementsByClassName('typed-cursor')[0].style.color = cursorClr;

    			}else{
    				hist += "-moose: no colour given<br/>";
    			}

    		}

    		//DEFAULT

    		else{								//command not found
    			hist += "-moose: " + command+ ": command not found ~ ask for 'help' if you are confused!<br/>";
    		}

    		//=========~========//
    		
    		command = "";
    		write(command);
    		
    	}else{
    		command += evt.key;
    		write(command);
    		//console.log(evt.which);
    	}
   		window.scroll(0,10000)
    });

    $("body").keydown(function(evt){
    	if(evt.which == 8){
    		command = command.substring(0, command.length-1);
    		write(command);
    	}
    });

    var write = function(string){
    	$('.typed').html(hist+baseTxt+string);
    }

    var isin = function(string, arr){
    	for (var i = 0; i < arr.length; i++){
    		if (string == arr[i]){
    			return true;
    		}
    	}
    	return false;
    }


});