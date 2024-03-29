# Pokeinfo Extension

Welcome the Pokeinfo! Pokeinfo is an extension set up to connect to a pokemon showdown battle and display real time information about the pokemon in the battle.

## Install Extension

- [Chrome extension](https://chrome.google.com/webstore/detail/pokeinfo-showdown/bkfbliefifmflhjcggbgfimmodpiclgk?hl=en)
- Firefox extension coming soon!

## To Install locally

- git clone https://github.com/piacib/pokeinfo_iframe_extension.git
- yarn install
- yarn run build

## How to navigate this project

- [Custom javascript Mutation Observer to watch for new turns](https://github.com/piacib/pokeinfo_iframe_extension/blob/main/src/chatMutationObserver.ts)
- [Parsing Data from HTML](https://github.com/piacib/pokeinfo_iframe_extension/blob/main/src/noSpectatorBattle.ts)

## Why I built the project this way

- Leveraged TypeScript to future-proof the application and streamline error handling in the long run.
- Utilized URLSearchParams as an efficient way to communicate with an external website and relay information.
- Stored all text and document queries in a constants file to reduce chance of a breaking typo and create an easy spot to update text displayed to users.

## What I learned from this project

This project has been a valuable learning experience for me, as it has allowed me to explore the world of web extensions and gain proficiency in developing them. Through this project, I have acquired knowledge and skills in using URL search parameters to establish communication and share information with external websites.

One of the key takeaways from this project has been the ability to manipulate web page elements using pure JavaScript. I have learned how to dynamically add, remove, and edit elements on a webpage, which has greatly enhanced my understanding of web development principles and practices.

Additionally, I have gained insight into the procedures involved in submitting, reviewing, and updating applications for third-party platforms. This knowledge has proven invaluable as it has equipped me with the necessary know-how to navigate the app development process effectively.
