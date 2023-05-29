chrome.browserAction.onClicked.addListener(function(tab) {
    let url = decodeURIComponent(tab.url);
    let dummy = document.createElement('input');

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    // Change icon to green
    chrome.browserAction.setIcon({ path: "icons/icon_48_green.png", tabId: tab.id });

    // Change icon back to default after 1 second
    setTimeout(() => {
        chrome.browserAction.setIcon({ path: "icons/icon_48.png", tabId: tab.id });
    }, 1000);
});
