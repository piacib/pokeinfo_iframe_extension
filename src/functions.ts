export const observerConfig = {
  childList: true,
  subtree: true,
};
export const createIframeNode = (roomId: string) => {
  const appId = `iframe-${roomId}`;
  const iFrameNode = document.createElement('iframe');
  iFrameNode.id = appId;
  iFrameNode.className = 'pokeinfo-iframe';
  iFrameNode.src = `https://piacib.github.io/pokeinfo/?battleId=${window.location.pathname.slice(
    1,
  )}`;
  return iFrameNode;
};
export const createIframeContainer = (
  roomId: string,
  battleRoom: HTMLElement,
) => {
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

  const iFrameNode = createIframeNode(roomId);
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