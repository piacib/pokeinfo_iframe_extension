import { addNewTurnMutationObserver } from './chatMutationObserver';
import { generatePopOver, getTeamsOnNewTurn } from './noSpectatorBattle';

export const observerConfig = {
  childList: true,
  subtree: true,
};
export const createIframeNode = (roomId: string) => {
  const siteUrl = new URL('https://piacib.github.io/pokeinfo/');
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
  // assign url with params
  iFrameNode.src = siteUrl.href;
  return iFrameNode;
};
export const createIframeContainer = (
  // room-battle-${battleType}-${battleId}
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
const toggleIframeHeight = (iframeId: string) => {
  const height = document.getElementById(iframeId).style.height;
  if (height !== '0px') {
    document.getElementById(iframeId).style.height = '0px';
  } else {
    document.getElementById(iframeId).style.height = '100%';
  }
};
const openExtensionText = 'Open Pokeinfo';
const closeExtensionText = 'Close Pokeinfo';
interface toggleButtonTextType {
  buttonId: string;
  iframeId: string;
}
const toggleButtonText = ({ buttonId, iframeId }: toggleButtonTextType) => {
  const button = document.getElementById(buttonId);
  const height = document.getElementById(iframeId).style.height;
  if (height === '0px') {
    button.innerText = openExtensionText;
    return;
  }
  button.innerText = closeExtensionText;
};
const generateButton = (
  iframeId: string,
  buttonClassName = 'iframe-toggle',
) => {
  const button = document.createElement('button');
  button.innerText = closeExtensionText;
  button.className = `${buttonClassName} button`;
  const buttonId = iframeId + 'button';
  button.id = buttonId;
  button.onclick = () => {
    toggleIframeHeight(iframeId);
    toggleButtonText({ buttonId, iframeId });
  };
  return button;
};
const prependToBattleLog = (element: HTMLElement, battleRoom: HTMLElement) => {
  const battleLog = battleRoom.getElementsByClassName('battle-log');
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(element);
  }
};

export const createButton = (roomId: string, battleRoom: HTMLElement) => {
  const iframeId = `iframe-${roomId}`;
  const button = generateButton(iframeId);
  if (!(roomId.split('-').length <= 4)) {
    addNewTurnMutationObserver(battleRoom, () => getTeamsOnNewTurn(iframeId));
    const popOver = generatePopOver();
    prependToBattleLog(popOver, battleRoom);
  }
  prependToBattleLog(button, battleRoom);
};
