export const observerConfig = {
  childList: true,
  subtree: true,
};
export const createIframeNode = (roomId: string) => {
  const siteUrl = new URL('https://piacib.github.io/pokeinfo/');
  console.log('siteUrl', siteUrl);
  const iframeId = `iframe-${roomId}`;
  const iFrameNode = document.createElement('iframe');
  iFrameNode.id = iframeId;
  iFrameNode.className = 'pokeinfo-iframe';
  const battleId = window.location.pathname.slice(1);
  // create url
  siteUrl.searchParams.append('battleId', battleId);
  siteUrl.searchParams.append('isExtension', 'true');
  if (battleId.split('-').length > 3) {
    siteUrl.searchParams.append('noSpectators', 'true');
  }
  console.log('siteUrl.searchParams', siteUrl.searchParams);
  // assign url with params
  iFrameNode.src = siteUrl.href;
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
  const div = document.createElement('div');
  const innerDiv = document.createElement('div');
  div.className = 'pokeball__button';
  innerDiv.className = 'pokeball_center';
  div.appendChild(innerDiv);
  button.appendChild(div);
  button.className = 'iframe-toggle pokeball';
  button.onclick = () => {
    const height = document.getElementById(iframeId).style.height;
    if (height !== '0px') {
      document.getElementById(iframeId).style.height = '0px';
    } else {
      document.getElementById(iframeId).style.height = '100%';
    }
  };
  const battleLog = battleRoom.getElementsByClassName('battle-log');
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(button);
  }
};
