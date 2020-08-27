// on input/text enter--------------------------------------------------------------------------------------
$('.usrInput').on('keyup keypress', function (e) {
	var keyCode = e.keyCode || e.which;
	var text = $(".usrInput").val();
	if (keyCode === 13) {
		if (text == "" || $.trim(text) == '') {
			e.preventDefault();
			return false;
		} else {
			$(".usrInput").blur();
			setUserResponse(text);
			send(text);
			e.preventDefault();
			return false;
		}
	}
});






$('.nobg').on('click' , function (e){
	e.preventDefault();
	console.log("click");
	send1();

	return false;
})


//------------------------------------- Set user response------------------------------------
function setUserResponse(val) {

	console.log(val);

	var UserResponse = '<img class="userAvatar" src=' + "./static/img/userAvatar.jpg" + '><p class="userMsg">' + val + ' </p><div class="clearfix"></div>';
	$(UserResponse).appendTo('.chats').show('slow');
	$(".usrInput").val('');
	scrollToBottomOfResults();
	$('.suggestions').remove();
}

//---------------------------------- Scroll to the bottom of the chats-------------------------------
function scrollToBottomOfResults() {
	var terminalResultsDiv = document.getElementById('chats');
	terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

function send(message) {
	console.log("User Message:", )
	$.ajax({
		url: 'my-ajax-test-text/',
		type: 'POST',
		// contentType: 'application/json',
		// data: JSON.stringify({
		// 	"message": message,
		// 	"sender": "username"
		// }),
		data : {text: message},
		success: function (data, textStatus) {
			console.log(data);
			setBotResponse(data);
			console.log("Rasa Response: ", data);
		},
		error: function (errorMessage) {
			setBotResponse("");
			console.log('Error' + errorMessage);

		}
	});
}

function send1(message) {
	// console.log("User Message:", message)
	$.ajax({
		url: 'my-ajax-test/',
		type: 'POST',
		// contentType: 'application/json',
		// data: JSON.stringify({
		// 	"message": message,
		// 	"sender": "username"
		// }),
		data : {text: message},
		success: function (data, textStatus) {
			var data1 = JSON.parse(data);
			console.log(data1['user']);
			setUserResponse(data1['user']);
			setBotResponse(data1['response']);
			console.log("Rasa Response: ", data);
		},
		error: function (errorMessage) {
			setBotResponse("");
			console.log('Error' + errorMessage);

		}
	});
}


//------------------------------------ Set bot response -------------------------------------
function setBotResponse(val) {
	setTimeout(function () {
		if (val.length < 1) {
			//if there is no response from Rasa
			msg = 'I couldn\'t get that. Let\' try something else!';

			var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + msg + '</p><div class="clearfix"></div>';
			$(BotResponse).appendTo('.chats').hide().fadeIn(1000);

		} else {
			//if we get response from Rasa
			var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + val + '</p><div class="clearfix"></div>';
			$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
			// for (i = 0; i < val.length; i++) {
			// 	//check if there is text message
			// 	if (val[i].hasOwnProperty("text")) {
			// 		var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + val[i].text + '</p><div class="clearfix"></div>';
			// 		$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
			// 	}

			// 	//check if there is image
			// 	if (val[i].hasOwnProperty("image")) {
			// 		var BotResponse = '<div class="singleCard">' +
			// 			'<img class="imgcard" src="' + val[i].image + '">' +
			// 			'</div><div class="clearfix">'
			// 		$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
			// 	}

			// 	//check if there is  button message
			// 	if (val[i].hasOwnProperty("buttons")) {
			// 		addSuggestion(val[i].buttons);
			// 	}

			// }
			scrollToBottomOfResults();
		}

	}, 500);
}


// ------------------------------------------ Toggle chatbot -----------------------------------------------
var counter = 0;
var counter1 = 0;
$('#profile_div').click(function () {
	counter = counter +1;
	console.log(counter);

	$('.profile_div').toggle();
	$('.widget').toggle();
	console.log("YO MAMA");


	scrollToBottomOfResults();

	if(counter%2 == 0){
		console.log("FOCUSING");
		$("#keypad").show().focus();

	}
	else{
		console.log("LOLOL")
		$("#keypad").show().focus();


	}
});

// var hasFocus = $('#idOfTheInputElement').is(':focus');



$('#close').click(function () {
	counter = counter +1;
	console.log("YO MAMA");
	console.log(counter);
	$('.profile_div').toggle();
	$('.widget').toggle();
	if(counter%2 == 0){
		console.log("FOCUSING");
	}
	else{
		console.log("LMAOOOO")
		$("#keypad").show().focus();



	}

});
function loader(){
	var hasFocus = $('#search').is(':focus');
	if(hasFocus){
		counter1 = 1;
	}
	else{
		counter1 = 0;
	}

if(counter%2 != 0 && counter1==0){
	console.log("FOCUSING");
	$("#keypad").show().focus();
}
}
window.setInterval(function(){

		loader();

  }, 1000);
window.onload = loader();

// ------------------------------------------ Suggestions -----------------------------------------------

function addSuggestion(textToAdd) {
	setTimeout(function () {
		var suggestions = textToAdd;
		var suggLength = textToAdd.length;
		$(' <div class="singleCard"> <div class="suggestions"><div class="menu"></div></div></diV>').appendTo('.chats').hide().fadeIn(1000);
		// Loop through suggestions
		for (i = 0; i < suggLength; i++) {
			$('<div class="menuChips" data-payload=\''+(suggestions[i].payload)+'\'>' + suggestions[i].title + "</div>").appendTo(".menu");
		}
		scrollToBottomOfResults();
	}, 1000);
}


// on click of suggestions, get the value and send to rasa
$(document).on("click", ".menu .menuChips", function () {
	var text = this.innerText;
	var payload= this.getAttribute('data-payload');
	console.log("button payload: ",this.getAttribute('data-payload'))
	setUserResponse(text);
	send(payload);
	$('.suggestions').remove(); //delete the suggestions
});

var inputElem = document.createElement('input');
var x = document.getElementById("Text");
inputElem.type = 'hidden';
inputElem.name = 'csrfmiddlewaretoken';
inputElem.value = '{{ csrf_token }}';
// Clear Text
document.getElementById('clear').addEventListener('click', function (e) {
    e.preventDefault();
    $("#Text").val('');
    $('#prediction').html('0 %');
    $('#prediction').css('color', '#808080');
}
);
sample = "I bought two pairs of wipers just over a year ago, expecting I'd have the second pair as backup. I haven't needed the second pair - the first pair are still just like new - they don't squeak, chatter, or smear and are great for visibility. "
//Load Sample
document.getElementById('load').addEventListener('click', function (e) {
    e.preventDefault();
    $("#Text").val(sample);
    $('#prediction').html('82 %');
    $('#prediction').css('color', "#00FA9A");
}
);
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }

 var TextId;

$("#Text").keyup(function(e){
            if (e.keyCode) {

        // information to be sent to the server
    var Text = $("#Text").val();
	console.log("YOMMAAAMAAA");
	console.log(TextId);
    $.ajax({
        // headers: { "X-CSRFToken": getCookie("csrftoken") },
        type: "POST",
        url: '/review/prediction/',
        data: {Text: Text,TextId:TextId},
        success: function (data) {
        classe = "btn btn-primary btn-xl";
        color = "#00FA9A"
            var result = $('<div />').append(data).find('#prediction').html();
            $('#prediction').html(parseInt(result)+' %');
            if (parseInt(result) < 50) {
            //classe = "btn btn-danger btn-xl";
            color = "Red"

        }
        if (parseInt(result) >= 50) {
            //classe = "btn btn-primary btn-xl";
            color = "#00FA9A"
        }
      //  $('#prediction').attr('class', classe);
            $('#prediction').css('color', color);
        },
        error: function (xhr, status) {
 //           $('#prediction').html('50 %');

        }
    });


   }


});

      $(document).ready(function(){

      var quantitiy=0;
         $('.quantity-right-plus').click(function(e){

              // Stop acting like a button
              e.preventDefault();
              // Get the field name
              var quantity = parseInt($('#quantity').val());

              // If is not undefined

                  $('#quantity').val(quantity + 1);


                  // Increment

          });

           $('.quantity-left-minus').click(function(e){
              // Stop acting like a button
              e.preventDefault();
              // Get the field name
              var quantity = parseInt($('#quantity').val());

              // If is not undefined

                  // Increment
                  if(quantity>0){
                  $('#quantity').val(quantity - 1);
                  }
          });

      });
