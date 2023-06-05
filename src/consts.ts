export const TEXT = {
  noSpecs:
    'This Battle does not allow spectators. Some features, like auto refresh, are not avaialable.',
  openExtension: 'Open Pokeinfo',
  closeExtension: 'Close Pokeinfo',
};
export const pokeinfoSiteURL = 'https://piacib.github.io/pokeinfo/';

interface ConstantValues<T> {
  readonly [k: string]: T;
}
export const CLASS: ConstantValues<string> = {
  iframe: 'pokeinfo-iframe',
  iframeToggle: 'iframe-toggle',
  pop_over_text: 'pop_over_text',
  pop_over_triangle: 'pop_over_triangle',
  pop_over_inner_triangle: 'pop_over_inner_triangle',
  showdownButtonClass: 'button',
  messageLog: 'inner message-log',
};
export const query: ConstantValues<string> = {
  innerUl: '#header > div.tabbar.maintabbar > div',
};
export const ID = {
  buttonIdGenerator: (iframeId: string) => iframeId + 'button',
  iframe: (roomId: string) => `iframe-${roomId}`,
  battleRoom: 'room-' + document.location.pathname.slice(1),
};
