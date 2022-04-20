chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message !== 'gitlab_load') {
    return sendResponse({ status: true });
  }

  const branchName = 'testing';

  const observer = new MutationObserver(() => {
    const elButton = document.querySelector('.js-submit-button');

    if (elButton) {
      observer.disconnect();

      const elBranch = document.querySelectorAll('.js-toggle-container .ref-name');

      if (elBranch && elBranch[1] && elBranch[1].innerHTML === branchName) {
        const elParent = elButton.parentNode;
        const newButton = document.createElement('button');

        newButton.classList.add('btn');
        newButton.disabled = true;
        newButton.innerHTML = `disabled in ${branchName} branch`;

        elButton.remove();
        elParent.appendChild(newButton);
      }
    }
  })
  
  observer.observe(document.querySelector('#conflicts'), { 
    childList: true,
    subtree: true
  });

  return sendResponse({ status: true });
});
