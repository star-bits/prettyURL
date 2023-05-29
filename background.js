// Initialize a counter for clicks
let clickCount = 0;

// This event is fired when the extension icon is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    // Increment the click counter
    clickCount++;

    // If this is the first click, start a timer
    // If there's no second click within 300ms, execute the single click function
    if (clickCount === 1) {
        singleClickTimer = setTimeout(function() {
            // Reset click counter
            clickCount = 0;

            // Perform the single click action
            singleClickAction(tab);
        }, 300); 
    } else if (clickCount === 2) { // If there was a second click
        // Cancel the timer for single click action
        clearTimeout(singleClickTimer);

        // Reset click counter
        clickCount = 0;

        // Perform the double click action
        doubleClickAction(tab);
    }
});

// This function is executed when the extension icon is clicked once
function singleClickAction(tab) {
    // Decode the current tab's URL
    let url = decodeURIComponent(tab.url);
    
    // Create a temporary textarea element, which is used for copying text to clipboard
    let dummy = document.createElement('textarea');
    
    // Add the textarea to the page
    document.body.appendChild(dummy);
    
    // Set the textarea's value to the decoded URL
    dummy.value = url;
    
    // Select the textarea's text
    dummy.select();
    
    // Execute the browser's copy command
    document.execCommand('copy');
    
    // Remove the textarea from the page
    document.body.removeChild(dummy);
    
    // Change the extension icon to indicate success
    chrome.browserAction.setIcon({ path: "icons/icon_48_green.png", tabId: tab.id });
    
    // After 1 second, change the icon back to the original
    setTimeout(() => {
        chrome.browserAction.setIcon({ path: "icons/icon_48.png", tabId: tab.id });
    }, 1000);
}

// This function is executed when the extension icon is double-clicked
function doubleClickAction(tab) {
    // Get all tabs in the current window
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        // Create a newline-separated string of all decoded URLs
        let urls = tabs.map(tab => decodeURIComponent(tab.url)).join('\n');
        
        // Create a temporary textarea element, which is used for copying text to clipboard
        let dummy = document.createElement('textarea');
        
        // Add the textarea to the page
        document.body.appendChild(dummy);
        
        // Set the textarea's value to the decoded URLs
        dummy.value = urls;
        
        // Select the textarea's text
        dummy.select();
        
        // Execute the browser's copy command
        document.execCommand('copy');
        
        // Remove the textarea from the page
        document.body.removeChild(dummy);
    });
    
    // Change the extension icon to indicate success
    chrome.browserAction.setIcon({ path: "icons/icon_48_green_all.png", tabId: tab.id });
    
    // After 1 second, change the icon back to the original
    setTimeout(() => {
        chrome.browserAction.setIcon({ path: "icons/icon_48.png", tabId: tab.id });
    }, 1000);
}
