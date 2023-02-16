export const observerConfig = {
  childList: true,
  subtree: true,
};
export const createIframeNode = (roomId: string) => {
  const iframeId = `iframe-${roomId}`;
  const iFrameNode = document.createElement('iframe');
  iFrameNode.id = iframeId;
  iFrameNode.className = 'pokeinfo-iframe';
  const paramsObj = {
    battleId: window.location.pathname.slice(1),
    isExtension: 'true',
  };
  const searchParams = new URLSearchParams(paramsObj);

  iFrameNode.src = `https://piacib.github.io/pokeinfo/?${searchParams.toString()}`;
  return iFrameNode;
};
export const createIframeContainer = (
  roomId: string,
  battleRoom: HTMLElement,
) => {
  const iframeId = `iframe-${roomId}`;
  const rootEl = document.getElementById(iframeId);
  if (rootEl) {
    // element is already added, return early
    return;
  }

  const iFrameNode = createIframeNode(roomId);
  const battleLog = battleRoom.getElementsByClassName('battle-log');
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(iFrameNode);
  }
  return;
};
export const getBattleRoomID = (pathname: string) => {
  // takes in string returns what follows the last "/"
  const regexMatch = pathname.match(/(?<=-)(?:.(?!-))+$/);
  if (regexMatch && regexMatch[0]) {
    return regexMatch[0];
  }
  return '';
};
export const createButton = (roomId: string, battleRoom: HTMLElement) => {
  const iframeId = `iframe-${roomId}`;

  const button = document.createElement('button');
  button.innerHTML = 'Pokeinfo';
  button.className = 'iframe-toggle';
  button.onclick = () => {
    const height = document.getElementById(iframeId).style.height;
    if (height !== '0px') {
      document.getElementById(iframeId).style.height = '0px';
    } else {
      document.getElementById(iframeId).style.height = '700px';
    }
  };
  const battleLog = battleRoom.getElementsByClassName('battle-log');
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(button);
  }
};
