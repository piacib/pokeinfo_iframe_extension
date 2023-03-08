import '../styles/popup.scss';

// document.getElementById('go-to-options').addEventListener('click', () => {
//   chrome.runtime.openOptionsPage();
// });

const query = { active: true, currentWindow: true };
function callback(tabs: chrome.tabs.Tab[]) {
  const currentTab = tabs[0]; // there will be only one in this array
  const url = currentTab.url;
  const pokeinfoUrl = 'https://piacib.github.io/pokeinfo/';
  const pathname = url.match(/com\/(.*)/);
  const anchor = document.getElementById('go-to-pokeinfo');
  if (
    url.includes('play.pokemon') &&
    pathname &&
    pathname[1] &&
    pathname[1].includes('battle')
  ) {
    if (anchor instanceof HTMLAnchorElement) {
      anchor.href = `${pokeinfoUrl}?battle=${pathname[1]}`;
    }
  } else {
    if (anchor instanceof HTMLAnchorElement) {
      anchor.href = pokeinfoUrl;
    }
  }
}

chrome.tabs.query(query, callback);
