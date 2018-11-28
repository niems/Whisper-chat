import io from 'socket.io-client';

function comms(url) {
    const socket = io(url);

    // events listening on here
    socket.on('users.count', count => console.log(`current users online: ${count}\n`));

    // returns functions available for client
    return {
        // "data" is an array of channels that the socket will join on the server
        join: function(data) {
            socket.emit('user.join-channels', JSON.stringify(data), function(response) {
                console.log(`user.join-channels response: ${response}\n`);
            });
        },

        leave: function(data) {
            socket.emit('user.leave-channels', JSON.stringify(data), function(response) {
                console.log(`user.leave-channels response: ${response}\n`);
            });
        },

        // manually disconnect socket - user signs out / navigates away from page
        close: function() {
            socket.close();
        }
    }
}

export default comms;