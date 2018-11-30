import io from 'socket.io-client';

function comms(url, onMsgReceived) {
    const socket = io(url);

    // events listening on here
    socket.on('users.count', count => console.log(`current users online: ${count}\n`));

    // user received a message from a group they're subscribed to
    socket.on('user.receive-group-msg', msg => {
        onMsgReceived(msg);  // adds message to group's channel
    });


    // returns functions available for client
    return {
        // "data" is an array of channels (rooms) that the socket will join on the server
        join: function(data) {
            socket.emit('user.join-channels', JSON.stringify(data), function(response) {
                console.log(`user.join-channels response: ${response}\n`);
            });
        },

        // "data" is an array of channels (rooms) that the socket will leave on the server
        leave: function(data) {
            socket.emit('user.leave-channels', JSON.stringify(data), function(response) {
                console.log(`user.leave-channels response: ${response}\n`);
            });
        },

        // user sending message to a group - the 'channel' part isn't serialized because it's for the server
        sendGroupMsg: function(data) {
            socket.emit('user.send-group-msg', {channel: data.channel, msg: JSON.stringify(data)} );
        },

        // user sending message to specific user
        sendPrivateMsg: function(data) {

        },  

        // manually disconnect socket - user signs out / navigates away from page
        close: function() {
            socket.close();
        }
    }
}

export default comms;