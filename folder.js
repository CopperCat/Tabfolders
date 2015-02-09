var link_list = []
var folder_name;

function add_tab(tab)
{
	var link = document.createElement('a');
	var linkText = document.createTextNode(tab.url);
	link.appendChild(linkText);
	link.title = tab.url;
	link.href = tab.url;
	link_list[link_list.length] = link;
	if (document.getElementById("urlarea").innerHTML == "<h5>Urls Stored</h5>Nothing Here...") {
		document.getElementById("urlarea").innerHTML = '<h5>Urls Stored</h5>' + '<a href="'+link+'">'+link.title + '</a><br>';
		var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
	var hr = today.getHours();
	var min = today.getMinutes();
	var mil = today.getMilliseconds();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = mm+'/'+dd+'/'+yyyy + " " + hr + ":" + min + ":" + mil;
		document.getElementById("timearea").innerHTML = '<h5>Last Time Accessed</h5>' + today + '<br>';
	}
	else {		document.getElementById("urlarea").insertAdjacentHTML('beforeend','<a href="'+link+'">'+link.title + '</a><br>');var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
	var hr = today.getHours();
	var min = today.getMinutes();
	var mil = today.getMilliseconds();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = mm+'/'+dd+'/'+yyyy + " " + hr + ":" + min + ":" + mil;
		document.getElementById("timearea").insertAdjacentHTML('beforeend', today + '<br>'); }
}

function remove_tab(tab_index)
{
	var li_ary = document.getElementById("tab_list").getElementsByTagName("li");
	li_ary[tab_index].parentNode.removeChild(li_ary[tab_index]);
}

window.onload = function() {folder_name = location.search.slice(1);
console.log(folder_name);
document.getElementById("title").innerHTML = folder_name + " Folder";
document.title = folder_name;
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == folder_name) {
			add_tab(request.tab)
		}
	}
);