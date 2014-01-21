$(function () {
	
	var Cipher = {


		init : function (plainTextInput,shiftEncrypt,encryptButton,encryptedText,encryptedInput,shiftDecrypt,decryptButton,decryptedText) {
						//needed variables

						//Variables for Encryption
            var plainTextInput = $(plainTextInput);
            var shiftEncrypt = $(shiftEncrypt);
            var encryptButton = $(encryptButton);
            var encryptedText = $(encryptedText);
        		
        		//Variables for Decryption
        		var encryptedInput = $(encryptedInput);
        		var shiftDecrypt = $(shiftDecrypt);
        		var decryptButton = $(decryptButton);
        		var decryptedText = $(decryptedText);


        		encryptButton.on('touchstart, click', function(e) {
        			e.stopPropagation();
        			e.preventDefault();
        			Cipher.cipherText(plainTextInput,shiftEncrypt,encryptedText,"encrypt");
        		});  
						
        		decryptButton.on('touchstart, click', function(e) {
        			e.stopPropagation();
        			e.preventDefault();
        			Cipher.cipherText(encryptedInput,shiftDecrypt,decryptedText,"decrypt");
        		})
	},

	cipherText: function(input,shift,outputText,method){
		var text = input.val();
		var newText = "";
		//booleans
		var lowerCase;
		var upperCase;
		var isLetter;
		var skip = false;

		var key = parseInt(shift.val())% 26;
		
		for(var i=0; i < text.length; i++){
			//Assume for every new entry everything is false
			lowerCase = false;
			upperCase = false;
			isLetter = false;

			var selectedChar = text.charCodeAt(i);
			
			if ( method == "encrypt"){
				var newChar = text.charCodeAt(i) - key;
			}else{
				var newChar = text.charCodeAt(i) + key;
			}
			
			
			//Test to see if selectChar is a letter
			//If true it is a letter
			if( (selectedChar >= 65) && (selectedChar <=90) ){
				upperCase = true;
				isLetter = true;
			}
			else if ((selectedChar >= 97) && (selectedChar <= 122)) {
				lowerCase = true;
				isLetter = true;
			}

			//If it is not a letter then we just add it to the new string
			else{
				
				if(selectedChar == 46 || selectedChar == 32 ||
					 selectedChar == 44 || selectedChar == 33 || 
					 selectedChar == 40 || selectedChar == 41 ||
					 selectedChar == 58 || selectedChar == 40 ||
					 selectedChar == 63){
					skip = true;		
				}
				newText = newText.concat(String.fromCharCode(selectedChar));
				
			}
			
			//If we do have a letter check for overflow and add to the newText

			if(skip){
				skip = false;
				continue;
			}

			if (isLetter){
				
				if( method == "encrypt"){
					if((lowerCase && newChar < 97)  || (upperCase && newChar < 65)){
						newChar += 26;
					}
				}else{
					if((lowerCase && newChar > 122)  || (upperCase && newChar > 90)){
						newChar -= 26;
					}
				}
			}
				
				
				
				newText = newText.concat(String.fromCharCode(newChar));
				
		}

		
		
		
		outputText.text(newText);
	}
		
}
	Cipher.init("#plainTextInput","#shiftEncrypt","#encryptButton","#encryptedText","#encryptedInput","#shiftDecrypt","#decryptButton","#decryptedText");
	
});
