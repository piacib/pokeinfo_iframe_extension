import { CLASS, ID, TEXT } from './consts';

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
  const battleRoom = document.getElementById(ID.battleRoom);

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
const updateIframeTeams = (
  iframeId: string,
  userTeam: string[],
  opponentsTeam: string[],
) => {
  const iframe = document.getElementById(iframeId);
  if (!iframe || !(iframe instanceof HTMLIFrameElement)) {
    console.error(TEXT.errorNoIframeFound(iframeId));
    return;
  }
  const src = iframe.src;
  const url = new URL(src);
  url.searchParams.set('userTeam', userTeam.toString());
  url.searchParams.set('opponentsTeam', opponentsTeam.toString());
  if (iframe.src !== url.href) {
    iframe.src = url.href;
  }
};

export const generatePopOver = () => {
  const pop_over_text = document.createElement('div');
  pop_over_text.className = CLASS.pop_over_text;

  const pop_over_triangle = document.createElement('div');
  pop_over_triangle.className = CLASS.pop_over_triangle;

  const pop_over_inner_triangle = document.createElement('div');
  pop_over_inner_triangle.className = CLASS.pop_over_inner_triangle;

  const text = document.createElement('p');
  text.innerText = TEXT.noSpecs;
  pop_over_text.appendChild(pop_over_triangle);
  pop_over_text.appendChild(pop_over_inner_triangle);
  pop_over_text.appendChild(text);
  return pop_over_text;
};
export const getTeamsOnNewTurn = (iframeId: string) => {
  const teams = getTeamFromAria();
  if (teams) {
    updateIframeTeams(iframeId, teams.user, teams.opp);
  }
};
