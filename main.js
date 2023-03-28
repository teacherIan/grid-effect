import './style.css';
import anime from 'animejs';

const colors = ['#c11c22', '#e46725', '#000000', '#1271b5'];
let count = 0;
let tiles;
let toggled = false;
let tileSize = 50;
let rows = Math.floor(document.body.clientWidth / tileSize);
let columns = Math.floor(document.body.clientHeight / tileSize);
const textTop = document.getElementById('text-top');
const textBottom = document.getElementById('text-bottom');
let sapphire = 0;
let ruby = 0;
let amber = 0;
let pearl = 0;
let previousColor = 0;

const handleScreen = () => {
  toggled = !toggled;
  let index = Math.floor(Math.random() * (rows * columns));
  count++;

  if (count == 5) {
    count = 0;
  }
  let currentHouse = count;

  console.log(count + 'count');

  if (toggled) {
    setTimeout(() => {
      textTop.style.color = colors[count];
      textBottom.style.color = colors[count];

      if (currentHouse == 0) {
        textTop.innerHTML = 'RUBY';
        textBottom.innerHTML = ruby;
      }
      if (currentHouse == 1) {
        textTop.innerHTML = 'AMBER';
        textBottom.innerHTML = amber;
      }
      if (currentHouse == 2) {
        textTop.innerHTML = 'PEARL';
        textBottom.innerHTML = pearl;
      }
      if (currentHouse == 3) {
        textTop.innerHTML = 'SAPPHIRE';
        textBottom.innerHTML = sapphire;
      }
    }, 150);
  }

  let nextColor = count + 1;
  if (nextColor == 5) {
    nextColor = 0;
  }

  console.log(nextColor + 'nextColor');
  anime({
    targets: ['.tile'],
    backgroundColor: colors[nextColor],
    opacity: toggled ? 0 : 1,

    delay: anime.stagger(30, {
      grid: [columns, rows],
      from: index,
    }),
  });

  previousColor = nextColor;
};

handleScreen();

setInterval(() => {
  handleScreen();
}, 6000);

const clickHandler = (index) => {
  count++;
  console.log(index);
  anime({
    targets: '.tile',
    backgroundColor: colors[count % (colors.length - 1)],
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

const wrapper = document.getElementById('tiles');

const createTile = (index) => {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.onclick = (e) => clickHandler(index);

  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((title, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = '';

  wrapper.style.setProperty('--columns', columns);
  wrapper.style.setProperty('--rows', rows);

  rows = Math.floor(document.body.clientWidth / tileSize);
  columns = Math.floor(document.body.clientHeight / tileSize);

  createTiles(rows * columns);

  tiles = document.querySelectorAll('.tile');
};

createGrid();

window.onresize = () => createGrid();

//get db data every 5 minutes

import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.js';

const getData = async () => {
  let started = false;

  const querySnapshot = await getDocs(collection(db, 'points'));
  querySnapshot.forEach((doc) => {
    if (!started) {
      started = true;
      sapphire = 0;
      ruby = 0;
      amber = 0;
      pearl = 0;
    }

    if (doc.data().house == 'Sapphire') {
      sapphire += parseInt(doc.data().points);
    }
    if (doc.data().house == 'Ruby') {
      ruby += parseInt(doc.data().points);
    }
    if (doc.data().house == 'Amber') {
      amber += parseInt(doc.data().points);
    }
    if (doc.data().house == 'Pearl') {
      pearl += parseInt(doc.data().points);
    }
  });
};

getData();

setInterval(() => {
  getData();
}, 100000);
