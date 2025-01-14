import React, { useState } from "react";
import "./sidebar.css";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatIndex,
  toggleNewChat,
  updateHistory,
  renameChatTitle,
  deleteHistory,
} from "../features/promptSlice";
import ReactSwitch from "react-switch";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const [menu, setMenu] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showsettup, setShowsettup] = useState(false);
  const [currentDeleteIndex, setCurrentDeleteIndex] = useState(null);
  const allHistory = useSelector((state) => state.prompt.historyArr);
  const chatIndex = useSelector((state) => state.prompt.chatIndex);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const handleChat = () => {
    dispatch(toggleNewChat(true));
  };

  const handleChatIndex = (i) => {
    dispatch(setChatIndex(i));
  };

  const handleEditStart = (index, currentTitle) => {
    setEditingIndex(index);
    setEditTitle(currentTitle);
  };

  const handleEditSave = (index) => {
    dispatch(renameChatTitle({ index, newTitle: editTitle }));
    setEditingIndex(null);
    setEditTitle("");
  };

  const filteredChats = allHistory.filter(
    (conv) =>
      conv.length > 0 &&
      conv[0].parts[0].text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteChat = (index) => {
    dispatch(deleteHistory(index));
    setShowPopup(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlesettupClose = () => {
    setShowsettup(false);
  };

  const handlePopupOpen = (index) => {
    setCurrentDeleteIndex(index);
    setShowPopup(true);
  };

  const handlesettPopupOpen = () => {
    setShowsettup(true);
  };

  return (
    <div className={`sideBar ${theme}`}>
      <div className="upperSide">
        <button className="menu">
          <img
            src={assets.menu_icon}
            onClick={() => setMenu((prev) => !prev)}
            alt=""
          />
        </button>
        <button className="plus plus1" onClick={() => handleChat()}>
          <img src={assets.plus_icon} className="plusImg" alt="" />
          {menu ? "New Chat" : ""}
        </button>
        {menu && (
          <div className="searchContainer">
            <input
              className="high tab"
              type="text"
              placeholder="Search Chats"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {menu && (
          <div className="recent">
            <span className="recentText">Recent Chats</span>

            <div className="scroll">
              {filteredChats.map((conv, index) => {
                if (conv.length > 0) {
                  const text = conv[0].parts[0].text;
                  const truncatedText = text.slice(0, 17);

                  return (
                    <div className="recentTabs" key={index}>
                      {editingIndex === index ? (
                        <div className="editTitle">
                          <input
                            className="high tab"
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={() => handleEditSave(index)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleEditSave(index);
                            }}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div
                          className={
                            chatIndex === index ||
                            (chatIndex === -1 &&
                              index === allHistory.length - 1)
                              ? "high tab"
                              : "tab"
                          }
                          onClick={() => handleChatIndex(index)}>
                          <img src={assets.message_icon} alt="" />
                          {truncatedText}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePopupOpen(index);
                            }}>
                            <img
                              className="toggle"
                              src={assets.three_dots}
                              alt=""
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>

      {menu && (
        <div>
          {showPopup && (
            <div className="popup">
              <div className="popupContent">
                <button
                  className="btns"
                  onClick={() =>
                    handleEditStart(
                      currentDeleteIndex,
                      filteredChats[currentDeleteIndex][0].parts[0].text
                    )
                  }>
                  <img src={assets.edit} alt="" />
                </button>
                <button
                  className="btns"
                  onClick={() => handleDeleteChat(currentDeleteIndex)}>
                  <img src={assets.trash} alt="" />
                </button>
                <button className="btns" onClick={handlePopupClose}>
                  <img src={assets.close} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        {showsettup && (
          <div className="setup">
            <div className="setupContent">
              <button className="setbtns" onClick={handlesettupClose}>
                <img src={assets.close} alt="" />
              </button>
              <div>
                <p>Name: Syed Faheemuddin Faiz </p>
                <p>Email: syed0faheem@gmail.com </p>
                <p>Phone No: 1603230000 </p>

                <div className="premium">
                  <button className="pbtns">
                    <img src={assets.pre} alt="" />
                  </button>
                  <p>Upgrade to Pro Version: $20</p>
                </div>
              </div>

              <ReactSwitch
                checked={theme === "dark"}
                onChange={toggleTheme}
                offColor="#888"
                onColor="#000"
                uncheckedIcon={
                  <div style={{ color: "#000", padding: "0 40px" }}>light</div>
                }
                checkedIcon={
                  <div style={{ color: "#fff", padding: "0 67px" }}>dark</div>
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="lowerSide">
        <button className="btns">
          <img src={assets.question_icon} alt="" />
          {menu ? "Help" : ""}
        </button>
        <button className="btns">
          <img src={assets.history_icon} alt="" />
          {menu ? "Activity" : ""}
        </button>

        <button
          className="btns"
          onClick={() => {
            handlesettPopupOpen();
          }}>
          <img src={assets.setting_icon} alt="" />
          {menu ? "Settings" : ""}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
