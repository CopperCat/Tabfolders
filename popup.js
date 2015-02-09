var folder_name;

function addToFolder(fname) {
	chrome.runtime.sendMessage({msg: "active", folder_name: fname});
}	

function addFolder(tab) {
	console.log("ok");
	chrome.runtime.sendMessage(
		{msg: "addf",
		 name: folder_name,
		 newTab: tab}
	);
	//var btn = document.createElement("BUTTON");
	//var t = document.createTextNode(folder_name);
	//btn.appendChild(t);
	//document.body.appendChild(btn);
}

function makeTabFolder() {
	folder_name = document.getElementById("name").value;	
	document.getElementById("valid").innerHTML = folder_name;
	chrome.tabs.create({
		url: chrome.runtime.getURL("folder.html") + '?' + folder_name,
		active: false
		},
		function(tab){addFolder(tab);} 
	);
	window.close();
}


chrome.runtime.sendMessage({msg: "list"}, 
	function(response) {
		console.log("list response");
		var folder_list = response.flist;
		console.log(folder_list.length);
		
		var fname; var btn; var t;
		var btn2; var t2;
		for (var i = 0; i < folder_list.length; i++) {
			fname = folder_list[i];
			btn = document.createElement("BUTTON");
			btn.id = "btn" + fname;
			t = document.createTextNode("Add Tab");

			btn2 =  document.createElement("BUTTON");
			btn2.id = "remove" + fname;
			t2 = document.createTextNode("Go to " + fname);
			
			btn.appendChild(t);
			btn.addEventListener('click', function() {
				addToFolder(fname);
			});

			btn2.appendChild(t2);
			btn2.addEventListener('click', function() {
				chrome.tabs.query({title:fname}, function(ary){
					ary[0].active = true;
					chrome.tabs.update(ary[0].id, {selected: true});
				})
			});
			document.body.appendChild(btn);
			document.body.appendChild(btn2);
			document.getElementById("valid").insertAdjacentHTML('afterbegin','<div id="row"><div id="link"></div><div id="manage"></div></div>');
			document.getElementById("manage").appendChild(btn);
			document.getElementById("link").appendChild(btn2);
		}
	}
);
	
document.getElementById("make").onclick = makeTabFolder;