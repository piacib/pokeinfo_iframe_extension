import { TEXT, query } from './consts';

const config = { attributes: true, childList: true, subtree: true };
const isMutationNewTurn = (mutation: MutationRecord) =>
  mutation.type === 'childList' && mutation.addedNodes[0]?.nodeName === 'H2';
export const addNewTurnMutationObserver = (
  battleRoom: HTMLElement,
  callback: () => void,
) => {
  const newTurnCallback = (mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      if (isMutationNewTurn(mutation)) {
        callback();
      }
    }
  };
  const messageLogObserver = new MutationObserver(newTurnCallback);

  const messageLog = battleRoom.getElementsByClassName(query.messageLog);
  if (messageLog && messageLog[0]) {
    messageLogObserver.observe(messageLog[0], config);
  } else {
    console.error(TEXT.noMessageLogFound);
  }
};
