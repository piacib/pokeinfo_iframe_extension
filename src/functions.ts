import { addNewTurnMutationObserver } from './chatMutationObserver';
import { generatePopOver, getTeamsOnNewTurn } from './noSpectatorBattle';
import { CLASS, ID, TEXT, generateExtensionHref } from './consts';

export const observerConfig = {
  childList: true,
  subtree: true,
};
const generateUrl = () => {
  const battleId = window.location.pathname.slice(1);
  // create url
  const href = generateExtensionHref(battleId);
  const siteUrl = new URL(href);

  if (battleId.split('-').length > 3) {
    siteUrl.searchParams.append('noSpectators', 'true');
  }
  console.log('generateUrl', siteUrl);
  return siteUrl;
};
export const createIframeNode = (roomId: string) => {
  // const siteUrl = new URL(pokeinfoSiteURL);
  const iframeId = ID.iframe(roomId);
  const iFrameNode = document.createElement('iframe');
  iFrameNode.id = iframeId;
  iFrameNode.className = CLASS.iframe;
  // const battleId = window.location.pathname.slice(1);
  // // create url
  // siteUrl.searchParams.append('battleId', battleId);
  // siteUrl.searchParams.append('isExtension', 'true');
  // if (battleId.split('-').length > 3) {
  //   siteUrl.searchParams.append('noSpectators', 'true');
  // }
  // assign url with params
  iFrameNode.src = generateUrl().href;
  return iFrameNode;
};
export const createIframeContainer = (
  // room-battle-${battleType}-${battleId}
  roomId: string,
  battleRoom: HTMLElement,
) => {
  const iframeId = ID.iframe(roomId);
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

interface toggleButtonTextType {
  buttonId: string;
  iframeId: string;
}
const toggleButtonText = ({ buttonId, iframeId }: toggleButtonTextType) => {
  const button = document.getElementById(buttonId);
  const height = document.getElementById(iframeId).style.height;
  if (height === '0px') {
    button.innerText = TEXT.openExtension;
    return;
  }
  button.innerText = TEXT.closeExtension;
};
const generateButton = (
  iframeId: string,
  buttonClassName = CLASS.iframeToggle,
) => {
  const button = document.createElement('button');
  button.innerText = TEXT.closeExtension;
  button.className = `${buttonClassName} ${CLASS.showdownButtonClass}`;
  const buttonId = ID.buttonIdGenerator(iframeId);
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
  const iframeId = ID.iframe(roomId);
  const button = generateButton(iframeId);
  if (!(roomId.split('-').length <= 4)) {
    addNewTurnMutationObserver(battleRoom, () => getTeamsOnNewTurn(iframeId));
    const popOver = generatePopOver();
    prependToBattleLog(popOver, battleRoom);
  }
  prependToBattleLog(button, battleRoom);
};
