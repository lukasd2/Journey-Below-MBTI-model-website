function Quiz() {
	this.selectAnswer =
		function() {
			var s = "";
			var i;
			var node2 = document.getElementById("answer"+state);
			var node3 = document.getElementById("answerB"+state);
			var nodeTitle = document.getElementById("title");
			node2.style.display = "block";
			node3.style.display = "block";
			node2.onclick = this.displayProprieties;
			node3.onclick = this.displayProprietiesAlt;

			if(state === 0) {
				s +=  "<h3>"+"Prima domanda <br> Introversione ed Estroversione"+"</h3>"+
					"<p>"+"Dove pi&ugrave; spesso concentro la mia attenzione?"+"</p>";
					nodeTitle.innerHTML = s;
			} else if (state === 1) {
				s +=  "<h3>"+"Seconda domanda <br> Sensitivit&agrave; e Intuizione"+"</h3>"+
					"<p>"+"In che modo raccolgo e interpreto le informazioni?"+"</p>";
					nodeTitle.innerHTML = s;
			} else if (state === 2) {
				s +=  "<h3>"+"Terza domanda <br> Ragionamento e Sentimento"+"</h3>"+
					"<p>"+"Come prendo le decisioni, quali criteri prendo maggiormente in considerazione?"+"</p>";
					nodeTitle.innerHTML = s;
			} else if (state === 3) {
				s +=  "<h3>"+"Quarta domanda <br> Giudizio e Percezione"+"</h3>"+
					"<p>"+"Come interagisco con il mondo esterno?"+"</p>";
					nodeTitle.innerHTML = s;
			} else return alert("runtime error");
	}
	this.displayProprieties =
		function() {
				document.getElementById("answerBtn").style.display = "block";
				document.getElementById("subtitle").classList.add("show");
				var nodeP1 = document.getElementById("prop"+state);
				var nodeP2 = document.getElementById("propAlt"+state);
				nodeP1.style.display = "block";
				nodeP2.style.display = "none";
				document.getElementById("answerB"+state).classList.remove("active");
				document.getElementById("answer"+state).classList.add("active");
				return;
	}
	this.displayProprietiesAlt =
		function() {
				document.getElementById("answerBtn").style.display = "block";
				document.getElementById("subtitle").classList.add("show");
				var nodeP1 = document.getElementById("prop"+state);
				var nodeP2 = document.getElementById("propAlt"+state);
				nodeP1.style.display = "none";
				nodeP2.style.display = "block";
				document.getElementById("answer"+state).classList.remove("active");
				document.getElementById("answerB"+state).classList.add("active");
				return;
	}
	this.displayResult = 
		function(x) {
				var s = "";
				var nodeR = document.getElementById("result");
				for(var i = 0; i < x.length; i++) {
        			s += "" + x[i]; //costruisco una stringa dall'array x[4]
    			}
				var par = document.createElement("p");
				par.id="ptype";
				var node = document.createTextNode(s);
				par.appendChild(node);
				nodeR.appendChild(par);
				q.mapResult();
		}
	this.mapResult = //costruisco la tabella delle 16 personalità
		function() {
			var i;
			var personlist = "";
			for(i=0; i<16; i++)
				{
					var element = "person" + i;
					personlist = personlist + '<div class="personality" onclick="info('+i+')" id="'+element+'">'+ personalityTypes[i] +'</div>';
					if ((i+1)%4===0) personlist = personlist +'<div style="clear: both;"></div>'
				}
				document.getElementById("result2").innerHTML = personlist;
				q.check();
	}
	this.check = //seleziono la personalità dell'utente
		function() {
			try {
			var i=0;
			var check = false;
			while(i<16 && check===false) {
				if((document.getElementById("person"+i).innerHTML) === (document.getElementById("ptype").innerHTML)) {
					document.getElementById("person"+i).style.background = "#F26C4F";
					info(i);
					check = true;
				} else {
					i++;
				}
			}
			return;
			} catch (e) {
				alert("check: " + e);
			}
	}
} //fine costruttore Quiz

//gestore evento onclick sulla tabella delle personalità
function info(cod) {
	var i;
	for(i=0; i<16; i++) {
		if(document.getElementById("desc"+i).classList.contains("reveal")) {
			document.getElementById("desc"+i).classList.remove("reveal");
		}
	}
	document.getElementById("desc"+cod).classList.add("reveal");
	return;
}


function answerButton() {
	try {
		var checkSelection1 = document.getElementById("answer"+state).classList.contains("active");
		var checkSelection2 = document.getElementById("answerB"+state).classList.contains("active");

		if(checkSelection1 || checkSelection2) { 
			document.getElementById("subtitle").classList.remove("show");
			document.getElementById("answerBtn").style.display = "none";
			var prev = state;
			var nodeD1 = document.getElementById("answer"+prev);
			var nodeD2 = document.getElementById("answerB"+prev);
			nodeD1.style.display = "none";
			nodeD2.style.display = "none";
			var nodeR1 = document.getElementById("prop"+prev);
			var nodeR2 = document.getElementById("propAlt"+prev);
			nodeR1.style.display = "none";
			nodeR2.style.display = "none";
			if(state===0) {
				if(checkSelection1) r.push("I");
				else r.push("E");
			}
			if(state===1) {
				if(checkSelection1) r.push("S");
				else r.push("N");
			}
			if(state===2) {
				if(checkSelection1) r.push("T");
				else r.push("F");
			}
			if(state===3) {
				if(checkSelection1) r.push("J");
				else r.push("P");
				q.displayResult(r);
			} 
			if(state<3) { 
				state++;
				q.selectAnswer();
			} else {
			var parent = document.getElementById("container");
			var child = document.getElementById("title");
			var child2 = document.getElementById("subtitle");
			var btn1 = document.getElementById("answerBtn");
			parent.removeChild(child);
			parent.removeChild(child2);
			parent.removeChild(answerBtn);
			}
		} else return;//far vedere che si deve seleziona
	} catch (e) {
		alert("answerButton: " + e);
	}
}

//var globali
var r = []; //array di stringhe, 4 lettere displayResult
var q; // l'oggetto quiz
var state = 0;

var personalityTypes = [16];

personalityTypes[0] = "ENFJ";
personalityTypes[1] = "INFJ";
personalityTypes[2] = "ENFP";
personalityTypes[3] = "INFP";
personalityTypes[4] = "ESFP";
personalityTypes[5] = "ISFP";
personalityTypes[6] = "ESFJ";
personalityTypes[7] = "ISFJ";
personalityTypes[8] = "INTJ";
personalityTypes[9] = "ENTJ";
personalityTypes[10] = "INTP";
personalityTypes[11] = "ENTP";
personalityTypes[12] = "ISTP";
personalityTypes[13] = "ESTP";
personalityTypes[14] = "ISTJ";
personalityTypes[15] = "ESTJ";

function inizializza() {
	try { 
		var node1 = document.getElementById("answerBtn");
		node1.style.display = "none";
		node1.onclick = answerButton;
		q = new Quiz();
		q.selectAnswer();
	} catch (e) {
		alert("inizializza: " + e);
	}

}

window.onload = inizializza;