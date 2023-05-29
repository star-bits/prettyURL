document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url;
        var decodedUrl = decodeURIComponent(url);
        
        navigator.clipboard.writeText(decodedUrl)
        .then(() => {
            // Change icon to green
            chrome.browserAction.setIcon({path: 'icons/icon_48_green.png', tabId: tabs[0].id});

            // Change icon back to default after 1 second
            setTimeout(() => {
                chrome.browserAction.setIcon({path: 'icons/icon_48.png', tabId: tabs[0].id});
            }, 1000);
        })
        .catch(err => {
            console.log('Failed to decode and copy URL: ', err);
        });
    });
});
