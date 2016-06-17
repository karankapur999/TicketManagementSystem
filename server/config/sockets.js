'use strict';

module.exports = function (io) {

  io.on('connection', function (socket) {

    socket.connectDate = new Date();
    socket.ip = (socket.handshake.address) ? socket.handshake.address : null;

    // sockets inserts
    require('../api/activity/activity.socket.js').register(socket);
    require('../api/company-docs/company-docs.socket.js').register(socket);
    require('../api/auctions/auctions.socket.js').register(socket);
    require('../api/muffins-for-users/muffins-for-users.socket.js').register(socket);
    require('../api/muffin/muffin.socket.js').register(socket);

    socket.on('disconnect', function () {
      console.log('[%s] %s disconnected.', new Date().toUTCString(), socket.ip);
    });

    console.log('[%s] %s logged.', socket.connectDate.toUTCString(), socket.ip);

  });

};
