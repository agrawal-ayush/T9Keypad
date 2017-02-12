 (function(){
		var endTime = 0;
		var difTolerance = 700;
		var lastKeyPressed;
		var activeKey;
		var counter = 0;

		var mouseTimeStart;
		
		$(document).ready(function(){
		$("#phone")
			.find("button")
			.mouseup(function(event){
				console.log("up",new Date().getTime());
				var button_pressed = $(event.currentTarget).data("value")
				if(new Date().getTime() - mouseTimeStart > 800){
					$("#result").val(longPress($("#result").val(),button_pressed))
				}
				else{
					$("#result").val(t9($("#result").val(),button_pressed))
				}

			})
			.mousedown(function(){
				mouseTimeStart = new Date().getTime();
				console.log("d",mouseTimeStart);

			})
		})
		
		function longPress(text,button_pressed){
			return text+=button_pressed;
		}
		
		
		function checkPause(endTime){
			var currTime = new Date().getTime();
			console.log("Current Time,",currTime);
			console.log("End Time ",endTime);
			console.log("Time Diff = " , currTime - endTime);
			if (currTime - endTime >= difTolerance) {
				
				console.log("In Pause");
					
				return true;
			}
			else 
				return false;
		}
		
			function t9(text,button_pressed){
			
			var index = [".,!","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz","*","0","#"];
			if(["*","0","#"].includes(String(button_pressed))){
				console.log("text  ",text);
				text = text + button_pressed;
				return text;
			}
			else{
			
				activeKey = index[button_pressed-1];
				
				if(counter == activeKey.length){
					counter = 0;
				}
				
				if(button_pressed != lastKeyPressed ){
					counter = 0;
					text = text + activeKey[counter];
					console.log("if ",counter);
				}
				else if(button_pressed === lastKeyPressed && counter < activeKey.length ){
					console.log("else",counter);
					var flag = checkPause(endTime);
					
					if(flag){
						counter = 0;
						text = text + activeKey[counter];
					}
					else{
						//text.replaceAt(text.length-1,activeKey[counter]);
						text = text.substring(0,text.length-1) + activeKey[counter];
					}
					
				}
				
				lastKeyPressed = button_pressed;
				endTime = new Date().getTime();
				counter++;
				}
				
				return text;
		}

	
	})();    