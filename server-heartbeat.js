'use strict';

module.exports = function init(io) {
  let endAt;

  const heatbeat = () => setTimeout(() => {
    io.emit('RESULTS', {
      correctDices: [1, 2, 3, 6, 6, 6],
      endAt
    });

    endAt = new Date().getTime() + 5000;
    
    heatbeat();

  }, 5000);

  heatbeat();
};
