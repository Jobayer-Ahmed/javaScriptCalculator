$(document).ready(function() {
	var userInput = [""];
	var subTotal;
	var variable1 = ["+","-","*","/"];
	var variable2 = ["."];
	var numb = [0,1,2,3,4,5,6,7,8,9];

	function getValue(input) {
		if(variable2.includes(userInput[userInput.length-1])===true && input==="."){
    		console.log("Duplicate '.'");
  		}
  		else if(userInput.length===1 && variable1.includes(input)===false){
    		userInput.push(input);
  		}
  		else if(variable1.includes(userInput[userInput.length-1])===false){
    		userInput.push(input);
  		}
  		else if(numb.includes(Number(input))){
	    	userInput.push(input);
		}
		updated();
	}

	function updated() {
		subTotal= userInput.join("");
    	$("#steps").html(subTotal);
	}

	function getTotal(){
		subTotal = userInput.join("");
		console.log(subTotal + ": " + eval(subTotal));
		$("#steps").html(eval(subTotal));
	}

	$("button").on("click",function(){
		if(this.id==="deleteAll"){
			userInput = [""];
			updated();
		}
		else if(this.id==="backOne"){
			userInput.pop();
			updated();
		}
		else if(this.id==="total"){
			getTotal();
		}
		else{
			if(userInput[userInput.length-1].indexOf("+","-","/","*",".")===-1){
				getValue(this.id);
			}
			else {
				getValue(this.id);
			}
		}
	});
	function windowClose() {
		window.open('','_parent','');
		window.close();
	}
});