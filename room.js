var roomID = "YOUR.NAME.HERE@example.com"; //ユニークな文字列に変更して下さい

window.onload = function () {
  document.getElementById("WSRoomID").innerHTML = roomID;
  var msg = {"roomID":roomID, "data":"NOT REQUIRED"};
  socket.emit('joinRoom', JSON.stringify(msg));
};