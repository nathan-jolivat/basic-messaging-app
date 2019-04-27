let randomPic = "https://api.adorable.io/avatars/32/" + Math.random().toString(36).substring(7) + ".png";

let selectedUsername = "";
let selectedUsernamePic = randomPic;

$(document).ready(function() {
    $('#sendMessageButton').hide();
});

$(function () {
    let socket = io();

    $('#submitName').click(function() {
        selectedUsername = $('#usernameInput').val();
        $('#sendMessageButton').show();
    });

    $('form').submit(function(){

        if (selectedUsername === "") {
            $('#u').val("Invité");
        } else {
            $('#u').val(selectedUsername);
        }

        $('#pic').val(selectedUsernamePic);

        socket.emit('chat message',  $('#u').val(), $('#m').val(), $('#pic').val());

        $('#u').val('');
        $('#m').val('');
        $('#pic').val('');
        $('#m').focus();
        return false;
    });
    socket.on('chat message', function(username, msg, pic){

        $('<div class="message"> \
                <div class="icon"><img src='+ pic +'></div> \
                <div class="body"><div class="username">' + username + '</div> \
                <div class="content">' + msg + '</div></div> \
                </div>').appendTo('#messages');

        window.scrollTo(0, document.body.scrollHeight);
    });
});