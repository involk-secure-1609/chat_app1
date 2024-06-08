import React from "react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import UserProfile from "./ChatNames/userprofile";
import ConversationItem from "./ChatNames/chatprofile";
import MessageHeader from "./MessageComps/MessageHeader";
import SearchProfile from "./SearchProfile/searchProfile";
import MessageForm from "./MessageComps/SendMessage";
import LogoutButton from "./LogOut/LogoutButton";
import UseSendMessage from "./Functions/sendMessage";
import openvideocall from "./Functions/openvideocall";
const Dashboard = () => {
  // gets information of user from local storage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  // Used to get conversations
  const [conversations, setConversations] = useState([]);
  // Used to get messages of the user
  const [messages, setMessages] = useState({});
  // Used to set the current message when the user is typing
  const [message, setMessage] = useState("");
  // obtains users
  const [users, setUsers] = useState([]);
  // Initalizes socket.io
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);
  // for Navigation
  const navigate = useNavigate();
  // checks to see if user is already logged in
  const [token, setToken] = useState(localStorage.getItem("user:token"));
  // Used to set search term when we are checking for user
  const [searchTerm, setSearchTerm] = useState("");
  // filters the user we are searching for accotrding to the words we have entered
  const filteredUsers = users.filter(({ user }) =>
    user?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const linkToOpen = "/lobby"+"/"+user?.fullName;
  //   const { messages, fetchMessages } = useFetchMessages(user);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
	
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log("activeUsers :>> ", users);
    });

    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });

    socket?.on("getConversations", (data) => {
      const isIt = data.isIt;
      const receiver = data.receiver1;
      const sender = data.sender1;
      const convoId = data.convoId;
      if (user && user.id === receiver._id && isIt === true) {
        setConversations((prev) => [
          ...prev,
          {
            user: sender,
            conversationId: convoId,
          },
        ]);
        console.log("receiver added to conversation");
      } else if (user && user.id === sender._id && isIt === true) {
        setConversations((prev) => [
          ...prev,
          {
            user: receiver,
            conversationId: convoId,
          },
        ]);
        console.log("sender added to conversation");
      }
    });

  }, [socket,user]);

  // If the state of messages changes then we scroll into view to see the latest message
  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.messages]);

  useEffect(() => {
    // checks to see if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));

    // send a request to the api which gets conversations
    const fetchConversations = async () => {
      const res = await fetch(
        `http://localhost:8000/api/conversations/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };
    fetchConversations();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    // send a request to the api which gets messages
    const res = await fetch(
      `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    setMessages({ messages: resData, receiver, conversationId });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, [user?.id]);

  // logs out user by clearing the token stored in the local storage
  const LogoutUser = () => {
    console.log("Logged out user");
    // socket?.emit('disconnecting', user?.id);
    setToken("");
    navigate("/users/sign_in");
    return localStorage.removeItem("user:token");
  };

  const sendMessage = () => {
    UseSendMessage({
      socket: socket,
      user: user,
      messages: messages,
      message: message,
    });
    setMessage(""); // Clear the message after sending
  };

  const handleSvgClick = openvideocall(linkToOpen);

  return (
    <div className="w-screen flex">
      <div className="w-1/4  h-screen bg-secondary overflow-scroll">
        <UserProfile user={user} />
        <hr />
        <div className="mx-14 mt-10">
          <div className="text-primary text-lg">Chats</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => {
                return (
                  <ConversationItem
                    user={user}
                    conversationId={conversationId}
                    fetchMessages={fetchMessages}
                  />
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col items-center h-screen">
        {messages?.receiver?.fullName && (
          <MessageHeader messages={messages} handleSvgClick={handleSvgClick} />
        )}
        <div className="h-[75%] w-full overflow-scroll shadow-sm">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <>
                    <div
                      className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                        id === user?.id
                          ? "bg-primary text-white rounded-tl-xl ml-auto"
                          : "bg-secondary rounded-tr-xl"
                      } `}
                    >
                      {message}
                    </div>
                    <div ref={messageRef}></div>
                  </>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Messages or No Conversation Selected
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.fullName && (
          <MessageForm
            sendMessage={sendMessage}
            message={message}
            setMessage={setMessage}
          />
        )}
      </div>
      <div className="w-1/4 h-screen px-8 py-8 bg-light overflow-scroll">
        <LogoutButton onClick={LogoutUser} />
        <div className="text-black text-lg">Search Users</div>
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
        />
        <div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(({ userId, user }) => (
              <SearchProfile
                user={user}
                userId={userId}
                fetchMessages={fetchMessages}
              />
            ))
          ) : (
            <div className="text-center text-lg font-semibold mt-24">
              No Other Users
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
