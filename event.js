
var interval;

var timeoutFn = function(details) {
	clearTimeout(interval);
	interval = setTimeout(function() {
		getUsername(details);
	}, 20000);
};

var timeoutClear = function() {
	clearTimeout(interval);
};

function getUsername(details) {

    chrome.tabs.executeScript(null,{file:"twitter.script.js"}, function(arr) {
    	// console.log(chrome.bookmarks.getTree.children[0].title);
    	if(arr) {
    		console.log(arr[0]);
    		// chrome.bookmarks.getTree(function(nodes) {
    		// 	console.log(nodes[0].children[1].children);
    		// });
	    	chrome.bookmarks.search({title:"HumbleMarks", url:null}, function(nodes) {
	    		if(nodes.length > 0) {
	    			chrome.bookmarks.getSubTree(nodes[0].id, function(results) {
	    				if(results.length === 0 && results[0].title === "HumbleMarks" && !results[0].url)
	    				var bookmarks;
	    				for(var i in results[0].children) {
	    					var child = results[0].children[i];
	    					console.log(child);
	    					if(child.url) {
	    						if(!bookmarks) {
	    							bookmarks = [{
		    							title: child.title,
		    							url: child.url
		    						}];
	    						} else {
	    						bookmarks.push({
		    							title: child.title,
		    							url: child.url
		    						});
		    					}
	    					}
	    				}
	    				var index = Math.floor(Math.random() * bookmarks.length);
	    				var bookmark = bookmarks[index];
	    				jQuery.get('http://localhost:3000/tweet/' + arr[0] + '/'+encodeURIComponent(bookmark.url)+'/' + encodeURIComponent(bookmark.title),function(data) {
	    						console.log(data);
	    				});
	    			});
	    		}
	    	});
    	}
    	
    });
}

chrome.webNavigation.onHistoryStateUpdated.addListener(timeoutFn);


