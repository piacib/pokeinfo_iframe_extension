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
const generateButton = (
  iframeId: string,
  buttonClassName = 'iframe-toggle pokeball',
) => {
  const button = document.createElement('button');
  const div = document.createElement('div');
  const innerDiv = document.createElement('div');
  div.className = 'pokeball_button';
  innerDiv.className = 'pokeball_center';
  div.appendChild(innerDiv);
  button.appendChild(div);
  button.className = buttonClassName;
  button.id = iframeId + 'button';
  button.onclick = () => {
    const height = document.getElementById(iframeId).style.height;
    if (height !== '0px') {
      document.getElementById(iframeId).style.height = '0px';
    } else {
      document.getElementById(iframeId).style.height = '100%';
    }
  };
  return button;
};
export const createButton = (roomId: string, battleRoom: HTMLElement) => {
  const iframeId = `iframe-${roomId}`;
  const button = generateButton(iframeId);
  const battleLog = battleRoom.getElementsByClassName('battle-log');
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(button);
  }
};
const appendPopOver = (container: HTMLElement) => {
  const pop_over_text = document.createElement('div');
  pop_over_text.className = 'pop_over_text';

  const pop_over_triangle = document.createElement('div');
  pop_over_triangle.className = 'pop_over_triangle';

  const pop_over_inner_triangle = document.createElement('div');
  pop_over_inner_triangle.className = 'pop_over_inner_triangle';

  const text = document.createElement('p');
  text.innerText = noSpecsText;
  pop_over_text.appendChild(pop_over_triangle);
  pop_over_text.appendChild(pop_over_inner_triangle);
  pop_over_text.appendChild(text);
  container.append(pop_over_text);
};
const noSpecsText =
  'This Battle does not allow spectators. Double click this button to refresh the extension.';
export const createNoSpectatorsButton = (
  roomId: string,
  battleRoom: HTMLElement,
) => {
  const iframeId = `iframe-${roomId}`;
  const buttonClassName = 'pop_over_button pokeball';
  const button = generateButton(iframeId, buttonClassName);
  const container = document.createElement('div');
  container.className = 'pop_over_container iframe-toggle';
  container.appendChild(button);
  appendPopOver(container);
  const battleLog = battleRoom.getElementsByClassName('battle-log');
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(container);
  }
};

// <div class="pop_over_container">
//       <button class="pop_over_button">Click Me!!</button>
//       <div class="pop_over_text">
//         <div class="pop_over_triangle"></div>
//         <div class="pop_over_inner_triangle"></div>
//         <p>Pop Over Text</p>
//       </div>
//     </div>
