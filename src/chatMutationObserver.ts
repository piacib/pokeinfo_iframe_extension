const config = { attributes: true, childList: true, subtree: true };
export const addNewTurnMutationObserver = (
  battleRoom: HTMLElement,
  callback: () => void,
) => {
  console.log('adding mutation obs');
  const newTurnCallback = (mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      if (
        mutation.type === 'childList' &&
        mutation.addedNodes[0]?.nodeName === 'H2'
      ) {
        console.log('new turn');
        callback();
      }
    }
  };
  const messageLogObserver = new MutationObserver(newTurnCallback);

  const messageLog = battleRoom.getElementsByClassName('inner message-log');
  if (messageLog && messageLog[0]) {
    messageLogObserver.observe(messageLog[0], config);
  } else {
    console.error('no message log found');
  }
};
