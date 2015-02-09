var folder_list = [];
var folder_ids = [];

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == "list") {
			console.log("list");
			console.log(folder_list.length);
			sendResponse({msg: "list", flist: folder_list});
		}
		
		if (request.msg == "addf") {
			var folder_name = request.name;
			console.log("addf");
			console.log(folder_name);
			folder_list[folder_list.length] = folder_name;
			folder_ids[folder_ids.length] = request.newTab.id;
			sendResponse({msg: "done"});
		}
		
		if (request.msg == "active") {
			chrome.tabs.query(
				{active: true},
				function(result) {
					if (result.length != 0) {
						chrome.runtime.sendMessage(
							{msg: request.folder_name, 
							 tab: result[0]}
						);
					}
					sendResponse("done");
				}
			);
		}
    }
);

chrome.tabs.onRemoved.addListener(
	function(tabId, rmInfo){
		var len = folder_list.length;
		for (var i = 0; i < len; i++) {
			if (tabId == folder_ids[i]) {
				folder_list.splice(i,1);
				folder_ids.splice(i,1);
			}
		}
	}
);
				
				
		