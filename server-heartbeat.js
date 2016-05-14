'use strict';
const Globals = require('./server-variables');

module.exports = function init(io) {
  let endAt;
  const interval = 10000;
  const MIN = 1;
  const MAX = 6;

  const heatbeat = () => setTimeout(() => {
    endAt = new Date().getTime() + interval;
    const winners = [];
    const correctDices = [];
    const correctDice = Math.floor(Math.random() * (MAX - MIN) + MIN);

    for(let i=0; i < 3; i++) {
      correctDices.push(correctDice);
      correctDices.push(Math.floor(Math.random() * (MAX - MIN) + MIN));
    }

    const counts = {}

    for(let i=0; i<correctDices.length; i++) {
      const k = correctDices[i];
      counts[k] = counts[k] ? counts[k]+1 : 1;
    }
    
    for(let k in Globals.bets) {
      if(Globals.bets[k] === correctDice) {
        winners.push(k);
      }
    }

    io.emit('RESULTS', {
      correctDices,
      winners,
      endAt
    });

    Globals.bets = {};

    heatbeat();

  }, interval);

  heatbeat();
};
