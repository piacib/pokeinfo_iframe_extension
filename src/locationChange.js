(() => {
  const oldPushState = history.pushState;
  history.pushState = function pushState() {
    // const ret = oldPushState.apply(this, arguments);
    const ret = oldPushState.apply(this);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  const oldReplaceState = history.replaceState;
  history.replaceState = function replaceState() {
    // const ret = oldReplaceState.apply(this, arguments);
    const ret = oldReplaceState.apply(this);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });
})();
