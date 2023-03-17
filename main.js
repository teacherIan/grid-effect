import './style.css';
import anime from 'animejs';

const colors = ['#c11c22', '#e46725', '#000000', '#1271b5'];
let count = 0;
let tiles;
let toggled = false;
let tileSize = 30;
let rows = Math.floor(document.body.clientWidth / tileSize);
let columns = Math.floor(document.body.clientHeight / tileSize);
const text = document.getElementById('text');

const handleScreen = () => {
  toggled = !toggled;
  let index = Math.floor(Math.random() * (rows * columns));
  count++;
  // document.body.style.backgroundColor = colors[count % (colors.length - 1)];

  let currentHouse = [count % (colors.length - 1)];

  if (toggled) {
    setTimeout(() => {
      console.log('From timeout');
      text.style.color = colors[count % (colors.length - 1)];

      if (currentHouse == 0) {
        text.innerHTML = 'RUBY \n 0';
      }
      if (currentHouse == 1) {
        text.innerHTML = 'AMBER \n 0';
      }
      if (currentHouse == 2) {
        text.innerHTML = 'PEARL \n 0';
      }
      if (currentHouse == 3) {
        text.innerHTML = 'SAPPHIRE \n 0';
      }
    }, 200);
  }

  anime({
    targets: ['.tile'],
    backgroundColor: colors[(count + 1) % (colors.length - 1)],
    opacity: toggled ? 0 : 1,
    // color: colors[(count + 1) % (colors.length - 1)],

    delay: anime.stagger(25, {
      grid: [columns, rows],
      from: index,
    }),
  });
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

  console.log(tiles[30]);
};

createGrid();

window.onresize = () => createGrid();
