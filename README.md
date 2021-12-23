# first.FM

Simple React frontend that consumes [last.fm](https://www.last.fm/api) apis

## About the project

Simple wiki-like website created using React. This project serves as a frontend to view last.fm API data.

Live demo [here](https://maines-pet.github.io/firstfm)

### Features
- Artists, Tracks, and Album Search
- Show recommended Artists
- List the top Artists and Tracks
- Like an Artist or Track

## Getting Started

### Prerequisites

The following should be installed in order to run the application locally.
- node.js

### Executing the program

1. Clone the project

```
git clone https://github.com/maines-pet/firstfm.git

cd firstfm

npm install

```

2. Run the application after installation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ```npm start```

### Frameworks and Libraries
- [React](https://reactjs.org/)
- [React Router v6](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://github.com/axios/axios)

### Public APIs used
- [last.fm](https://www.last.fm/api)
- [randomuser.me](https://randomuser.me) - for random profile photos
- [Lorem Picsum](https://picsum.photos/) - for random image placeholder

## Known Bugs
1. Search String not persisting in the Search page when refreshing. Can be resolved by creating a separate page for the search and search results instead of bundling the components together.
2. Images for the artists and tracks are not fix. Since last.fm api doesn't provide images anymore due to ToS changes, I have used Lorem Picsum and randomuser.me as placeholders for those images. As such, the images will be random between pages 

## Future Plans
1. Add like buttons throughout the application. Currently, you can only like an item if you are on the Top Artists and Top Tracks page.
2. Add error handling
3. Refactor to reduce code duplications
4. Add better styling
5. Add unit test