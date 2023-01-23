import './locationChange';
import {
  observerConfig,
  createIframeContainer,
  getBattleRoomID,
} from './functions';

const addDisplay = (battleRoom: HTMLElement) => {
  console.log('adding display', battleRoom);
  if (!battleRoom) {
    // not in battle/ not random battle, return early
    return;
  }
  console.log('battle room', battleRoom);
  /** room-battle-${string}-${number} */
  const roomId: string = battleRoom.id;
  if (!roomId.startsWith('room-battle')) {
    return;
  }
  createIframeContainer(roomId, battleRoom);
};
let activeBattleRooms: string[] = [];
const resetBattleRooms = () => {
  console.log('resetting');
  const innerUlQuery = document.querySelector(
    '#header > div.tabbar.maintabbar > div',
  );
  if (innerUlQuery?.childElementCount === 2) {
    // no active battles exist and array should be cleared
    activeBattleRooms = [];
  }
  const battlesUl = innerUlQuery?.children[1];
  if (!battlesUl) {
    return;
  }
  const battleLi = Array.from(battlesUl.children);
  const activeBattles: string[] = [];
  battleLi.forEach((li) => {
    const anchorEl = li.children[0];
    if (
      anchorEl instanceof HTMLAnchorElement &&
      anchorEl.href.includes('battle')
    ) {
      activeBattles.push(getBattleRoomID(anchorEl.href));
    }
  });
  activeBattleRooms = activeBattles;
};
const checkBattleRooms = (roomId: string) => {
  if (activeBattleRooms.includes(roomId)) {
    return false;
  }
  activeBattleRooms.push(roomId);
  const battleRoom = document.getElementById(
    'room-' + document.location.pathname.slice(1),
  );
  if (battleRoom) {
    addDisplay(battleRoom);
  }
  return true;
};
// // checks for tab changes
// let activeBattleRooms: string[] = [];
window.addEventListener('load', () => {
  console.log('adding load observer');
  let currentPathname = document.location.pathname;
  const body = document.querySelector('body');
  // checks mutations for a different pathname
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log('mutation', mutation);
      if (currentPathname !== document.location.pathname) {
        console.log('pathchanged', getBattleRoomID(document.location.pathname));
        currentPathname = document.location.pathname;
        const roomId = getBattleRoomID(document.location.pathname);
        if (roomId) {
          checkBattleRooms(roomId);
        } else {
          resetBattleRooms();
        }
      }
    });
  });
  if (body) {
    console.log('load observer added', currentPathname);
    const roomId = getBattleRoomID(document.location.pathname);
    if (roomId) {
      console.log('refreshed into battle', roomId);
      checkBattleRooms(roomId);
    }
    observer.observe(body, observerConfig);
  }
});
