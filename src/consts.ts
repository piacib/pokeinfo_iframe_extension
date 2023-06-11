interface ConstantValues<T> {
  readonly [k: string]: T;
}
export const TEXT = {
  noSpecs:
    'This Battle does not allow spectators. Some features, like auto refresh, are not avaialable.',
  openExtension: 'Open Pokeinfo',
  closeExtension: 'Close Pokeinfo',
  noMessageLogFound: 'no message log found',
  errorNoIframeFound: (iframeId: string) =>
    `no iframe element found with id ${iframeId}`,
};
export const pokeinfoSiteURL = 'https://piacib.github.io/pokeinfo/';
export const generateExtensionHref = (id: string) =>
  `${pokeinfoSiteURL}#/extension/inBattle/${id}`;

export const CLASS: ConstantValues<string> = {
  iframe: 'pokeinfo-iframe',
  iframeToggle: 'iframe-toggle',
  pop_over_text: 'pop_over_text',
  pop_over_triangle: 'pop_over_triangle',
  pop_over_inner_triangle: 'pop_over_inner_triangle',
  showdownButtonClass: 'button',
};
export const query: ConstantValues<string> = {
  innerUl: '#header > div.tabbar.maintabbar > div',
  messageLog: 'inner message-log',
  teamIcons: 'teamicons',
};
export const ID = {
  buttonIdGenerator: (iframeId: string) => iframeId + 'button',
  iframe: (roomId: string) => `iframe-${roomId}`,
  battleRoom: () => 'room-' + document.location.pathname.slice(1),
};
