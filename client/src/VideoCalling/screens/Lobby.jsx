import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { useParams } from "react-router-dom";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  let { fullname} = useParams();

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

 const handleGenerateRoom = () => {
    const roomToJoin=generateRandomString(10);
    setRoom(roomToJoin);
  };

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );
  useEffect(() => {
    setEmail(fullname)
  }, []);
  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#1976D2" }}>
  <div style={{ textAlign: "center" }}>
    <form onSubmit={handleSubmitForm} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <label style={{ backgroundColor: "#e1bee7", padding: "5px", borderRadius: "5px" }}>Full name </label>
      <input
        type="text"
        readOnly
        id="email"
        value={fullname}
        style={{ margin: "10px", padding: "10px", borderRadius: "5px" }}
      />
      <label style={{ backgroundColor: "#e1bee7", padding: "5px", borderRadius: "5px" }}>Room Number</label>
      <input
        type="text"
        id="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        style={{ margin: "10px", padding: "10px", borderRadius: "5px" }}
      />
      <button style={{ margin: "10px", padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>Join</button>
    </form>
    <button onClick={handleGenerateRoom} style={{ margin: "10px", padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>Generate Room</button>
  </div>
</div>

  );
};

export default LobbyScreen;
