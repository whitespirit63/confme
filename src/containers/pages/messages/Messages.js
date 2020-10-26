import React from "react";
import classes from "./Messages.module.scss";
import MyMessage from "../../../components/UI/Messages/MyMessage/MyMessage";
import FriendMessage from "../../../components/UI/Messages/FriendMessage/FriendMessage";


export default function Messages(props){

  function renderMessages() { //ренедрим список сообщений
    return props.messages.map((chat) => {
      return chat.uid === localStorage.getItem("userId") ? (
        <li key={chat.timestamp}>
          <div className={classes.right}>
            <MyMessage
              
              time={formatTime(chat.timestamp)}
              text={chat.content}
            />
          </div>
        </li>
      ) : (
        <li key={chat.timestamp}>
          <div className={classes.left}>
            <FriendMessage
              time={formatTime(chat.timestamp)}
              text={chat.content}
              name={chat.name}
              surname={chat.surname}
            />
          </div>
        </li>
      );
    });
  }

  
  function formatTime(timestamp) {  //приводим время в нормальный вид
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  return(
    <div className={classes.Messages}>
      <ul>{renderMessages()}</ul>
    </div>
  )
}