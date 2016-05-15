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
      const excess = (Globals.bank / winners.length) % 100;
      prize = ((Globals.bank - excess) / winners.length) + 200;

      Globals.bank = excess;

      for (let n = winners.length - 1; n !== -1; n--) {
        const socket = winners[n];

        if(Globals.players[socket]) {
          Globals.players[socket].pot = Globals.players[socket].pot + prize;
        }
      }
    }

    io.emit('RESULTS', {
      winners,
      correctDices,
      endAt,
      prize
    });

    let _players = Object.keys(Globals.players).map(key => Globals.players[key]);
    io.emit('PLAYERS_LIST', _players);

    const bets = Object.keys(Globals.bets).map(key => Globals.bets[key]);

    if(bets.length && bets.length < 2) { Globals.bank = 0; }

    io.emit('BANK_UPDATE', {
      bank: Globals.bank
    });

    Globals.bets = {};

    if(_players.length) {
      _players.sort((a, b) => b.rounds - a.rounds);
      const top5 = _players.slice(0, _players.length || 5);

      for (var m = Globals.hallOfFame.length - 1; m !== -1; m--) {
        for (var n = top5.length - 1; n !== -1; n--) {
          if (top5[n].rounds >= Globals.hallOfFame[m].rounds) {
            let found = false;

            for (let o = Globals.hallOfFame.length - 1; o !== -1; o--) {
              if(top5[n].socket == Globals.hallOfFame[o].socket) {
                found = true;
                Globals.hallOfFame[o].rounds = top5[n].rounds;
                top5.splice(n, 1);
                break;
              }
            }

            if(!found) {
              Globals.hallOfFame.unshift(top5[n]);
              top5.splice(n, 1);
            }

            break;
          }
        }
      }

      Globals.hallOfFame = Globals.hallOfFame.sort((a, b) => b.rounds - a.rounds);
      Globals.hallOfFame = Globals.hallOfFame.slice(0, 5);
      Globals.hallOfFame = Globals.hallOfFame.sort((a, b) => b.rounds - a.rounds);

      io.emit('HALLOFFAME_UPDATE', Globals.hallOfFame);

      const winners_names = [];

      for(let n = winners.length - 1; n !== -1; n--) {
        if(Globals.players[winners[n]]) {
          winners_names.push(Globals.players[winners[n]].username);
        }
      }

      if(winners_names.length) {
        io.emit('CHAT_MESSAGE_IN', {
          username: 'Croupier',
          sys: true,
          body: `The winners of last round are: ${winners_names.join(', ')}`
        });
      } else {
        io.emit('CHAT_MESSAGE_IN', {
          username: 'Croupier',
          sys: true,
          body: `Last round without winners!`
        });
      }
    }

    heatbeat();

  }, interval);

  heatbeat();
};
