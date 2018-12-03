import io from 'socket.io-client';

function comms(username, url, onMsgReceived) {
    const socket = io(url, {
        query: {
            username: username
        }
    });

    // events listening on here
    socket.on('users.count', count => console.log(`current users online: ${count}\n`));

    // object of all users containing each socket.id & username - received on initial server connection
    socket.on('users.all-online', users => {
        onMsgReceived('all online users', users); // sends users to userProfile to update onlineUsers state
    });

    socket.on('users.add-online-user', user => {
        onMsgReceived('add online user', user);
    });

    socket.on('users.remove-online-user', userId => {
        onMsgReceived('remove online user', userId);
    });

    // user received a message from a group they're subscribed to
    socket.on('user.receive-group-msg', msg => {
        onMsgReceived('new group message', msg);  // adds message to group's channel
    });

    // user received a private message from an online user
    socket.on('user.receive-private-msg', msg => {
        onMsgReceived('new private message', msg); // adds message to PMs
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
            socket.emit('user.send-private-msg', {sendTo: data.sendTo, msg: JSON.stringify(data.msg)} );
        },  

        // manually disconnect socket - user signs out / navigates away from page
        close: function() {
            socket.close();
        }
    }
}

export default comms;