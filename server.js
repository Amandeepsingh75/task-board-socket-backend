const { Server } = require("socket.io");

const io = new Server(3002, {
  cors: { origin: "*" }
});

let board = {
  todo: [],
  inprogress: [],
  done: [],
};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.emit("board_state", board);

  socket.on("update_board", (newBoard) => {
    board = newBoard;
    socket.broadcast.emit("board_state", board);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

console.log("Socket.IO server running on port 3002")
