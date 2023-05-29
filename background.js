let clickCount = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
    // Increase click count
    clickCount++;

    if (clickCount === 1) {
        // Set a timer: if there's no second click within 250ms, treat this as a single click
        singleClickTimer = setTimeout(function() {
            clickCount = 0;
            singleClickAction(tab);
        }, 250);
    } else if (clickCount === 2) {
        // If there's a second click within 250ms, cancel the single click timer and treat this as a double click
        clearTimeout(singleClickTimer);
        clickCount = 0;
        doubleClickAction(tab);
    }
});

function singleClickAction(tab) {
    let url = decodeURIComponent(tab.url);
    let dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    chrome.browserAction.setIcon({ path: "icons/icon_48_green.png", tabId: tab.id });
    setTimeout(() => {
        chrome.browserAction.setIcon({ path: "icons/icon_48.png", tabId: tab.id });
    }, 1000);
}

function doubleClickAction(tab) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        let urls = tabs.map(tab => decodeURIComponent(tab.url)).join('\n');
        let dummy = document.createElement('textarea');
        document.body.appendChild(dummy);

        dummy.value = urls;

        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    });
    chrome.browserAction.setIcon({ path: "icons/icon_48_green_all.png", tabId: tab.id });
    setTimeout(() => {
        chrome.browserAction.setIcon({ path: "icons/icon_48.png", tabId: tab.id });
    }, 1000);
}
