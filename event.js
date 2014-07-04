// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getBgColors (tab) {
  // When we get a result back from the getBgColors
  // method, alert the data
  injectedMethod(tab, 'getBgColors', function (response) {
    alert('Elements in tab: ' + response.data);
    return true;
  });
}

function createOrAddBookmark (tab) {
	alert("yo");
	chrome.bookmarks.getTree(function(bookmarks) {
		alert(bookmarks[0].children[0].title);
	});
}

function addOrUpdateBookmark(id, node) {
    chrome.bookmarks.get(node.parentId, function (parent) {
        if (parent !== false) {
            if(parent.length === 1 && parent[0].title === "HumbleMarks") {
            	alert(node.url);
            }
        }
    });
}

// When the browser action is clicked, call the
// getBgColors function.
// chrome.browserAction.onClicked.addListener(createOrAddBookmark);

chrome.bookmarks.onCreated.addListener(onCreateBookmark);



