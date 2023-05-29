// Listen for browser action (extension icon) click event
chrome.browserAction.onClicked.addListener(function(tab) {
    // Decode the URL of the current tab
    let url = decodeURIComponent(tab.url);

    // Create a dummy input field
    let dummy = document.createElement('input');

    // Append the dummy input field onto the page
    document.body.appendChild(dummy);

    // Set the value of the input field to the decoded URL
    dummy.value = url;

    // Select the text in the input field
    dummy.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the dummy input field from the page
    document.body.removeChild(dummy);

    // Change the browser action icon to green to indicate success
    chrome.browserAction.setIcon({ path: "icons/icon_48_green.png", tabId: tab.id });

    // After 1 second, change the icon back to the default
    setTimeout(() => {
        chrome.browserAction.setIcon({ path: "icons/icon_48.png", tabId: tab.id });
    }, 1000);
});
