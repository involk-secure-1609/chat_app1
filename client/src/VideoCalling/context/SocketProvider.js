import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket1 = useMemo(() => io("localhost:5000"), []);

  return (
    <SocketContext.Provider value={socket1}>
      {props.children}
    </SocketContext.Provider>
  );
};