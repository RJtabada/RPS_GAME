const MOVES = ['rock', 'paper', 'scissors'];
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const ICON = { rock: '✊', paper: '✋', scissors: '✌️' };
const TEXT = { win: 'You win! 🎉', lose: 'You lose 😢', draw: "It's a draw 🤝" };

const youEl = document.getElementById('you');
const cpuEl = document.getElementById('cpu');
const resultEl = document.getElementById('result');

// Score is saved in the browser so it survives a page refresh.
let score = { win: 0, draw: 0, lose: 0 };
try {
  const saved = JSON.parse(localStorage.getItem('rps-score'));
  if (saved) score = saved;
} catch (e) {}

function showScore() {
  document.getElementById('win').textContent = score.win;
  document.getElementById('draw').textContent = score.draw;
  document.getElementById('lose').textContent = score.lose;
  try { localStorage.setItem('rps-score', JSON.stringify(score)); } catch (e) {}
}

function play(player) {
  const cpu = MOVES[Math.floor(Math.random() * 3)];
  let result;
  if (player === cpu) result = 'draw';
  else if (BEATS[player] === cpu) result = 'win';
  else result = 'lose';

  score[result]++;
  youEl.textContent = ICON[player];
  cpuEl.textContent = ICON[cpu];
  resultEl.textContent = TEXT[result];
  resultEl.className = 'result ' + result;
  showScore();
}

document.querySelectorAll('.choice').forEach(btn => {
  btn.addEventListener('click', () => play(btn.dataset.move));
});

document.getElementById('reset').addEventListener('click', () => {
  score = { win: 0, draw: 0, lose: 0 };
  youEl.textContent = cpuEl.textContent = '❔';
  resultEl.textContent = 'Choose your move!';
  resultEl.className = 'result';
  showScore();
});

showScore();
