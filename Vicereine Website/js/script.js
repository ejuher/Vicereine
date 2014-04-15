$("div div").hover(function() {
	if ($(this).html() != '') {
		//index function returns zero-based position
		MoveText($(this).parent().index(), $(this).index());
	}
})

//note: .index returns values starting at 0, BUT nth-child and nth-of type accept
//values starting at 1. That means for a row = box.parent().index(), to access the
//the row above use .container:nth-of-type(row)

function GetRandom(min,max) {
	var r = Math.floor(Math.random() * (max - min +1)) + min;
	return r;
}

function MoveText(row,col) {
	var moves = [true, true, true, true]; //directions available for letter to move to (up, right, down, left)
	var thisbox = '.container:nth-of-type('+(row+1)+') :nth-child('+(col+1)+')';
	var abovebox = '.container:nth-of-type('+(row)+') :nth-child('+(col+1)+')';
	var rightbox = '.container:nth-of-type('+(row+1)+') :nth-child('+(col+2)+')';
	var belowbox = '.container:nth-of-type('+(row+2)+') :nth-child('+(col+1)+')';
	var leftbox = '.container:nth-of-type('+(row+1)+') :nth-child('+(col)+')';

	//if you are an edge box then invalidate moving/checking outside the box
	if (row === 0) { //if in top row
		moves[0] = false;
	}
	if (row == 2) { //if in bottom row
		moves[2] = false;
	}
	if (col == 0) { //if on left edge
		moves[3] = false;
	}	
	if (col == 10) { //if on right edge
		moves[1] = false;
	}

	//check if adjacent boxes are occupied
	if (moves[0] === true) { //if box is not in row 1, then if box above is empty
		if ($(abovebox).html() != '') {
			moves[0] = false;
		}
	}
	if (moves[1] === true) { //if box is not on right edge, then if box to the right is empty
		if ($(rightbox).html() != '') {
			moves[1] = false;
		}
	}
	if (moves[2] === true) { //if box is not in row 3, then if box below is empty
		if ($(belowbox).html() != '') {
			moves[2] = false;
		}
	}
	if (moves[3] === true) { //if box is not on left edge, then if box to the left is empty
		if ($(leftbox).html() != '') {
			moves[3] = false;
		}
	}

	//check if number has any possible moves or if it is trapped
	if (!(moves[0]===false && moves[1]===false && moves[2]===false && moves[3]===false)) { 

		//generate random number 0-3
		var max = 3;
		var min = 0;

		var rand = GetRandom(min,max);

		//if a given move is unavailable, then try again
		while (moves[rand]===false) {
			rand = GetRandom(min,max);
		}

		//move the letter to the random box
		if (rand===0) { //move the letter up
			$(abovebox).html($(thisbox).html());
			$(thisbox).html('');
		} 
		else if (rand===1) {
			$(rightbox).html($(thisbox).html());
			$(thisbox).html('');
		}
		else if (rand===2) {
			$(belowbox).html($(thisbox).html());
			$(thisbox).html('');
		}
		else if (rand===3) {
			$(leftbox).html($(thisbox).html());
			$(thisbox).html('');
		}

	}
}

//toggle appearance of faq questions
$("h2").on("click", function (event) {
	event.preventDefault();
	$("h4").toggle(400);
})

//toggle appearance of faq answers
$("h4").on("click", function (event) {
	event.preventDefault();
	$(this).parent().next().toggle(400, function () {});
})