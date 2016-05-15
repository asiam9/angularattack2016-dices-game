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
    const correctDice = 1; //Math.floor(Math.random() * (MAX - MIN) + MIN);

    for(let i=3; i !== 0; i--) { // well... its CASINO^^
      correctDices.push(correctDice);
      correctDices.push(Math.floor(Math.random() * (MAX - MIN) + MIN));
    }

    for(let k in Globals.bets) {
      if(Globals.bets[k] === correctDice) {
        winners.push(k);
      }
    }

    let prize = 0;

    if(winners.length) {
      const excess = Globals.bank % winners.length;
      prize = (Globals.bank - excess) / winners.length + 200;

      Globals.bank = excess;

      for (let n = winners.length - 1; n !== -1; n--) {
        const socket = winners[n];
        Globals.players[socket].pot = Globals.players[socket].pot + prize;
      }
    }

    io.emit('RESULTS', {
      winners,
      correctDices,
      endAt,
      prize
    });

    const _players = Object.keys(Globals.players).map(key => Globals.players[key]);
    io.emit('PLAYERS_LIST', _players);

    const bets = Object.keys(Globals.bets).map(key => Globals.bets[key]);

    if(bets.length < 2) { Globals.bank = 0; }
    Globals.bets = {};

    io.emit('BANK_UPDATE', {
      bank: Globals.bank
    });

    heatbeat();

  }, interval);

  heatbeat();
};
