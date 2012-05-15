/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function filter (phrase, _id){
	var words = phrase.value.toLowerCase().split(" ");
	var table = document.getElementById(_id);
	var ele;
	for (var r = 1; r < table.rows.length; r++){
		ele = table.rows[r].innerHTML.replace(/<[^>]+>/g,"");
	        var displayStyle = 'none';
	        for (var i = 0; i < words.length; i++) {
			    if (ele.toLowerCase().indexOf(words[i])>=0){
					displayStyle = '';
				} else {
					displayStyle = 'none';
				break;
			    }
	        }
		table.rows[r].style.display = displayStyle;
	}
}

function KalenderWoche(j,m,t) {
    var Datum = new Date();
    if (!t) {
        j = Datum.getYear(); if (1900 > j) j +=1900;
        m = Datum.getMonth(); t = Datum.getDate();
    }
    else m--;
    Datum = new Date(j,m,t,0,0,1);
    var tag = Datum.getDay(); if (tag == 0) tag = 7;
    var d = new Date(2004,0,1).getTimezoneOffset();
    var Sommerzeit = (Date.UTC(j,m,t,0,d,1) - Number(Datum)) /3600000;
    Datum.setTime(Number(Datum) + Sommerzeit*3600000 - (tag-1)*86400000);
    var Jahr = Datum.getYear(); if (1900 > Jahr) Jahr +=1900;
    var kw = 1;
    if (new Date(Jahr,11,29) > Datum) {
        var Start = new Date(Jahr,0,1);
        Start = new Date(Number(Start) + 86400000*(8-Start.getDay()));
        if(Start.getDate() > 4) Start.setTime(Number(Start) - 604800000);
        kw = Math.ceil((Datum.getTime() - Start) /604800000);
    }
    return kw;
}
