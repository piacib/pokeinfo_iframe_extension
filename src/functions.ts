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
const prependToBattleLog = (element: HTMLElement, battleRoom: HTMLElement) => {
  const battleLog = battleRoom.getElementsByClassName('battle-log');
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(element);
  }
};
const appendPopOverTo = (container: HTMLElement) => {
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
const parseAriaLabelToArray = (pokemon: string) => {
  const splitArr = pokemon.split('(').map((x) => {
    let y = x.trim();
    if (y[y.length - 1] === ')') {
      y = y.slice(0, -1);
    }
    return y;
  });
  return splitArr.filter((x) => x !== 'Not revealed');
};
const ariaArrayToPokemon = (arr: string[]) => {
  let answer = '';
  arr.forEach((x) => {
    if (x.includes(answer)) {
      answer = x;
    }
  });
  return answer;
};
const getPokemonfromAriaString = (pokemon: string) => {
  const arr = parseAriaLabelToArray(pokemon);
  const parsedPokemon = ariaArrayToPokemon(arr);
  return parsedPokemon;
};
const getAriaLabelsFromElements = (
  collection1: HTMLCollection,
  collection2: HTMLCollection,
) => {
  const labels: string[] = [];
  Array.from(collection1).forEach((x) => labels.push(x.ariaLabel));
  Array.from(collection2).forEach((x) => labels.push(x.ariaLabel));
  return labels;
};
const getTeamFromAria = (): { user: string[]; opp: string[] } | false => {
  const battleRoom = document.getElementById(
    'room-' + window.location.pathname.slice(1),
  );

  if (!battleRoom) {
    return false;
  }
  const teamIcons = battleRoom.getElementsByClassName('teamicons');
  if (!Array.from(teamIcons).filter((x) => x.children.length > 0).length) {
    return false;
  }
  const userTeamAriaLabels: string[] = getAriaLabelsFromElements(
    teamIcons[0].children,
    teamIcons[1].children,
  );
  const opponentTeamAriaLabels: string[] = getAriaLabelsFromElements(
    teamIcons[3].children,
    teamIcons[4].children,
  );
  const userTeam = userTeamAriaLabels
    .map((label) => getPokemonfromAriaString(label))
    .filter((x) => x !== '');
  const opponentTeam = opponentTeamAriaLabels
    .map((label) => getPokemonfromAriaString(label))
    .filter((x) => x !== '');
  return { user: userTeam, opp: opponentTeam };
};
const updateIframeTeamsOnClick = (
  iframeId: string,
  userTeam: string[],
  opponentsTeam: string[],
) => {
  console.log('updateIframeTeamsOnClick');
  const iframe = document.getElementById(iframeId);
  if (!iframe || !(iframe instanceof HTMLIFrameElement)) {
    console.error('no iframe element fround with id', iframeId);
    return;
  }
  const src = iframe.src;
  const url = new URL(src);
  url.searchParams.set('userTeam', userTeam.toString());
  url.searchParams.set('opponentsTeam', opponentsTeam.toString());
  console.log('updateIframeTeamsOnClick', url.href);
  iframe.src = url.href;
};
const generatateContainer = (
  className = 'pop_over_container iframe-toggle',
): HTMLDivElement => {
  const container = document.createElement('div');
  container.className = className;
  return container;
};
const getTeamsOnClick = (iframeId: string) => {
  console.log('clicked', getTeamFromAria());
  const teams = getTeamFromAria();
  if (teams) {
    updateIframeTeamsOnClick(iframeId, teams.user, teams.opp);
  }
};
const noSpecsText =
  'This Battle does not allow spectators. Double click this button to refresh the extension.';
export const createNoSpectatorsButton = (
  roomId: string,
  battleRoom: HTMLElement,
) => {
  console.log('createNoSpecButton');

  const iframeId = `iframe-${roomId}`;
  const buttonClassName = 'pop_over_button pokeball';
  const button = generateButton(iframeId, buttonClassName);
  button.addEventListener('click', () => {
    getTeamsOnClick(iframeId);
  });
  const container = generatateContainer();

  container.appendChild(button);
  appendPopOverTo(container);

  prependToBattleLog(container, battleRoom);
};

export const createButton = (roomId: string, battleRoom: HTMLElement) => {
  console.log('createButton');
  const iframeId = `iframe-${roomId}`;
  const button = generateButton(iframeId);
  prependToBattleLog(button, battleRoom);
};
