import React, { useState } from "react";
import "./App.css";
import { IoCodeSlash } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("Please enter a message");
    }
  };

  const generateResponse = async (msg) => {
    let allMessages = [...messages];
    const genAI = new GoogleGenerativeAI(
      "enter the  yours gemini api key"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    allMessages.push(
      {
        type: "userMsg",
        text: msg,
      },
      {
        type: "responseMsg",
        text: await result.response.text(),
      }
    );
    setMessages(allMessages);
    setIsResponseScreen(true);
    setMessage("")
    console.log(await result.response.text());
  };

  return (
    <div className="container w-full min-h-screen overflow-x-auto bg-[#0E0E0E] text-white">
      {isResponseScreen ? (
        <div className="h-[80vh]">
          <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
            <h2 className="text-2xl">Assist Me</h2>
            <button
              id="newChatBtn"
              className="bg-gray-800 p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
              onClick={() => setIsResponseScreen(false)}
            >
              New Chat
            </button>
          </div>
          <div className="messages pt-[30px] p-[300px] flex-col flex">
            {messages?.map((msg, index) => {
              return (
                <div key={index} className={`msg ${msg.type}`}>
                  {msg.text}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="middle h-[80vh] flex items-center flex-col justify-center">
          <h1 className="text-4xl">ChatWithMe</h1>
          <div className="boxes mt-[30px] flex items-center gap-2">
            <div className="card rounded-lg cursor-pointer hover:bg-slate-800 px-[20px] relative min-h-[20vh] bg-[#181818]">
              <p className="text-[20px]">
                What is coding? <br />
                How can we learn?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <IoCodeSlash />
              </i>
            </div>
            <div className="card rounded-lg cursor-pointer hover:bg-slate-800 px-[20px] relative min-h-[20vh] bg-[#181818]">
              <p className="text-[20px]">
                What is coding? <br />
                How can we learn?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <IoCodeSlash />
              </i>
            </div>
            <div className="card rounded-lg cursor-pointer hover:bg-slate-800 px-[20px] relative min-h-[20vh] bg-[#181818]">
              <p className="text-[20px]">
                What is coding? <br />
                How can we learn?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <IoCodeSlash />
              </i>
            </div>
            <div className="card rounded-lg cursor-pointer hover:bg-slate-800 px-[20px] relative min-h-[20vh] bg-[#181818]">
              <p className="text-[20px]">
                What is coding? <br />
                How can we learn?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <IoCodeSlash />
              </i>
            </div>
          </div>
        </div>
      )}

      <div className="bottom w-[100%] flex flex-col items-center">
        <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-slate-950 rounded-[30px]">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            type="text"
            className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
            placeholder="Write your message here"
          />
          {message === "" ? (
            ""
          ) : (
            <i
              className="text-green-95 text-[20px] mr-5 cursor-pointer"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          )}
        </div>
        <p className="text-[gray] text-[14px] my-4">
          Assist Me is developed by Me
        </p>
      </div>
    </div>
  );
};

export default App;
