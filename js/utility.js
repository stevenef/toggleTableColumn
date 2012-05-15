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

function DynTable(TableDivID, ListBoxID, JSONobj,_checked){
// auslesen der Spalten und definieren der Checkboxen
    var alltr=jQuery('#'+TableDivID+' table tr');
    jQuery(alltr).each( function(index,value){
      var allth=jQuery(this).find('th');
      var container2 = "";
      $(allth).each(function(cindex,value){
         container2 += '<li><input id="checkbox_'+index+'_'+cindex+'" type="checkbox" checked="checked" /><label for="checkbox_'+index+'_'+cindex+'" >'+$(this).text()+'</label></li>';
         $('#'+TableDivID+' #'+ListBoxID+' ul').html(container2);
		 $('#'+TableDivID+' #'+ListBoxID+' ul li:last-child').css('display','none')
      });
    });
    // ein und ausblenden der Spalten
    var allCBox = $('#'+TableDivID+' #'+ListBoxID+' ul li input');
    $(allCBox).each(function(cindex,value) {
        var pos = cindex+1;
        //console.log(cindex+1);
        $(this).click(function (){
            $('th:nth-child('+pos+')').toggle();
            $('td:nth-child('+pos+')').toggle();
        });
    });
	
	$('#'+TableDivID+' table th:last-child').bind('click',function(e){
		var _left = $(this).position().left;
		$('#'+TableDivID+' #'+ListBoxID+'').animate({
			left:_left,
			top:$('#'+TableDivID+' table tr:eq(1) td:last-child').position().top,
		},0);
		$('#'+TableDivID+' #'+ListBoxID+'').toggle();
		return false;
	});

	var timer;
	$('#'+TableDivID+' #'+ListBoxID+' ul').bind('mouseout', function(){
		if(timer)
			clearTimeout(timer);
		timer = setTimeout("$('#"+TableDivID+" #"+ListBoxID+"').toggle()",100);
	});
	$('#'+TableDivID+' #'+ListBoxID+' ul').bind('mouseover', function(){
		clearTimeout(timer);
	});

	var _obj = new Object();
	if(localStorage){
		if(localStorage.getItem('vqc')){
			var myJson = localStorage.getItem('vqc');
			 _obj = jQuery.parseJSON(myJson);
		}
	}
	
	if(_obj[JSONobj]){
		_checked = new Array();
		for(var index in _obj[JSONobj]){
			_checked.push(_obj[JSONobj][index]);
		}
	}
	for(var i = 0 ; i< ($('#'+TableDivID+' #'+ListBoxID+' ul li input').length-1);i++){
		var _temp = true;
		for(var j = 0 ;j<_checked.length;j++)
			if(i==_checked[j]) _temp = false;
		if(_temp)
			$('#checkbox_0_'+i).trigger('click');
	}
	
	$('#'+TableDivID+' #'+ListBoxID+' ul li input').bind('click',function(){
		for(var i = 0; i < ($('#'+TableDivID+' #'+ListBoxID+' ul li input').length-1);i++){
			var _id = $('#'+TableDivID+' #'+ListBoxID+' ul li input:eq('+i+')').attr('id');
			if(!_obj[JSONobj])
				_obj[JSONobj] = new Object();
			if($('#'+TableDivID+' #'+ListBoxID+' ul li input:eq('+i+')').attr('checked')){
				_obj[JSONobj][_id]=i;
			}else{
				delete _obj[JSONobj][_id];
			}
		}
		var _JSON = JSON.stringify(_obj);
		if(localStorage){
			localStorage.setItem('vqc',_JSON);
		}
	});
}
