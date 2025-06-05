/* eslint-disable no-undef */

let buttonAdded = false;

const addCustomButton = function() {
  if (buttonAdded) return;
  
  const addTransactionButton = document.querySelector('.accounts-toolbar-left .add-transaction');
  if (!addTransactionButton) return;

  const customButton = document.createElement('button');
  customButton.className = 'ghost-button primary type-body ynab-trigger-button';
  customButton.innerHTML = `
    <img src="${chrome.runtime.getURL('images/exchange.svg')}" 
         alt="Exchange Icon" 
         class="ynab-new-icon"
         style="width: 16px; height: 16px;">
    Run App
  `;

  customButton.addEventListener('click', () => {
    fetch(config.TRIGGER_URL)
      .finally(() => location.reload());
  });

  addTransactionButton.insertAdjacentElement('afterend', customButton);
  buttonAdded = true;
};

const checkAndUpdateButton = () => {
  const existingButton = document.querySelector('.ynab-trigger-button');
  const shouldHaveButton = document.querySelector('.accounts-toolbar-left .add-transaction');
  
  // Update buttonAdded flag based on DOM state
  buttonAdded = !!existingButton;

  if (!shouldHaveButton && existingButton) {
    existingButton.remove();
    buttonAdded = false;
  } else if (shouldHaveButton && !existingButton) {
    addCustomButton();
  }
};

// Create a MutationObserver instance to watch for DOM changes
const observer = new MutationObserver((mutations) => {
  // Look for significant changes that might indicate a page change
  const significantChange = mutations.some(mutation => {
    return mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0;
  });

  if (significantChange) {
    setTimeout(checkAndUpdateButton, 100); // Add small delay to ensure DOM is settled
  }
});

// Start observing with configuration
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

// Initial check
checkAndUpdateButton();

