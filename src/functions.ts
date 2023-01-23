export const observerConfig = {
  childList: true,
  subtree: true,
};
export const createIframeNode = (appId: string) => {
    const iFrameNode = document.createElement('iframe');
    iFrameNode.id = appId;
    //   iFrameNode.className = 'pokeInfo_iframe';
    iFrameNode.style.padding = ' 36px 8px 0';
    iFrameNode.style.minHeight = '250px';
    iFrameNode.style.width = '100%';
  
    iFrameNode.src = 'https://play.pokemonshowdown.com/';
    return iFrameNode;
  };
export const createIframeContainer = (roomId: string, battleRoom: HTMLElement) => {
const appId = `iframe-${roomId}`;
const rootEl = document.getElementById(appId);
if (rootEl) {
    // element is already added, return early
    return;
}

//   .pokeInfo_iframe {
// padding: 36px 8px 0;
// min-height: 250px;
// width: 100%;
//   }

const iFrameNode = createIframeNode(appId);
const battleLog = battleRoom.getElementsByClassName('battle-log');
if (battleLog && battleLog[0]) {
    battleLog[0].prepend(iFrameNode);
}
return document.getElementById(appId);
};
export const getBattleRoomID = (pathname: string) => {
    // takes in string returns what follows the last "/"
    const regexMatch = pathname.match(/(?<=-)(?:.(?!-))+$/);
    if (regexMatch && regexMatch[0]) {
      return regexMatch[0];
    }
    return '';
  };
