import React from "react";
import classes from "./DialogList.module.scss";
import { DialogListItem } from "../../../components/UI/DialogListItem/DialogListItem";
import { connect } from "react-redux";
import {
  fetchDialogs,
  selectDialog,
  sendMessages,
} from "../../../store/actions/dialogList";
import { fetchUserById } from "../../../store/actions/users";
import { NavLink } from "react-router-dom";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import { Loader } from "../../../components/UI/Loader/Loader";
import { UserCard } from "../../../components/UI/UserCard/UserCard";
import Messages from "../messages/Messages";
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";
import { fetchUsers } from "../../../store/actions/users";
import api from "../../../helpers/serverApi";
import SearchInput from "../../../components/UI/Input/SearchInput/SearchInput";

class DialogList extends React.Component {
  state = {
    dialogId: null, //id диалога
    content: "", //введенное сообщение
  };

  friendId = null;
  userId = parseInt(localStorage.getItem("userId"));
  idFromPath = parseInt(document.location.pathname.slice(9));

  componentDidMount() {
    if (this.idFromPath && this.props.location.state) {
      //если ссылка содержит id то
      this.friendId = parseInt(this.props.location.state.friendId);
      this.props.selectDialog(this.idFromPath);
      //вызываем ф-ию selectDialog с айди из ссылки
    } else if(this.idFromPath){
      this.props.selectDialog(this.idFromPath);
    }
    else {
      this.props.selectDialog(null);
    }
    api.joinDialogs(this.userId);
  }

  componentDidUpdate() {
    this.idFromPath = parseInt(document.location.pathname.slice(9)); 
    if(!this.idFromPath && this.props.selectedDialog)
      this.props.selectDialog(null);
  }

  renderDialogs() {
    if (this.props.dialogsLoading) {
      //если диалоги загружаются то функция ничего не возвращает
      return null;
    } else {
      return this.props.dialogs.map((dialog) => {
        if(dialog.id === this.idFromPath) {
          this.friendId = dialog.friendId;
        }
        return (
          <NavLink
            key={dialog.id}
            to={"/dialogs/" + dialog.id}
            onClick={() => {
              this.friendId = dialog.friendId;
              this.props.selectDialog(dialog.id);
            }}
          >
            { console.log("Hey123", dialog.sender_id, this.userId)}
            <li>
              <DialogListItem
                id={dialog.id}
                name={this.props.users[dialog.friendId - 1].name}
                surname={this.props.users[dialog.friendId - 1].surname}
                text={
                  dialog.sender_id === this.userId
                    ? `Вы: ${dialog.lastMessage}`
                    : dialog.lastMessage
                }
                time={dialog.timestamp}
                selected={this.props.selectedDialog}
                unread = {dialog.unread}
              />
            </li>
          </NavLink>
        );
      });
    }
  }

  changeHandler = (event) => {
    this.setState({
      content: event.target.value, //кладем в стейт значения из инпута
    });
  };

  sendHandler = () => {
    //отсыдаем сообщения
    this.props.sendMessages(
      this.userId, //мой id
      this.state.content, //текст сообщения
      this.friendId, //С кем чатимся
    );
    this.setState({
      content: "", //после отправки обнуляем то что в стейте сообщения
    });
  };

  render() {
 
    return (
      <>
      
        <BGMain>
          <div className={classes.ChatBox}>
            <div className={classes.ChatBox__DialogList}>
              <div className={classes.ChatBox__DialogList__SearchBar}>
                <i className="fa fa-search"></i>
                <input placeholder="Поиск..." onChange={this.dataSearch}/>
                
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>
              <div className={classes.ChatBox__DialogList__ScrollList}>
                {this.props.dialogsLoading && <Loader />}

                <ScrollBar><ul>{this.renderDialogs()}</ul></ScrollBar>

              </div>
            </div>

            {this.props.match.params.id === undefined ? (
              <div className={classes.ChatBox__ChooseDialog}>
                <p>Выберете диалог</p>
              </div>
            ) : (
              <div className={classes.ChatBox__MessageBox}>
                <div className={classes.ChatBox__MessageBox__TopBar}>
                  {this.friendId !== null && (
                    <span
                      className={
                        classes.ChatBox__MessageBox__TopBar__DialogName
                      }
                    >
                      {this.props.users[this.friendId - 1].name}{" "}
                      {this.props.users[this.friendId - 1].surname}
                    </span>
                  )}

                  <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div>
                <div className={classes.ChatBox__MessageBox__Messages}>
                  {this.props.messages.length === 0 ? (
                    this.props.messagesLoading ? <Loader/> :
                    <div
                      className={
                        classes.ChatBox__MessageBox__Messages__NoMessages
                      }
                    >
                      <span>У вас пока нет сообщений</span>
                    </div>
                  ) : (
                    <ScrollBar>
                      <Messages messages={this.props.messages} />
                    </ScrollBar>
                  )}
                </div>
                <div className={classes.ChatBox__MessageBox__BottomBar}>
                  <div
                    className={
                      classes.ChatBox__MessageBox__BottomBar__AttachButton
                    }
                  >
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                  </div>
                  <div
                    className={classes.ChatBox__MessageBox__BottomBar__Input}
                  >
                    <input
                      placeholder="Напишите сообщение"
                      name="content"
                      value={this.state.content}
                      onChange={this.changeHandler}
                      type="text"
                      ref={input => input && input.focus()}
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.sendHandler()
                        }
                      }} //после нажатия на enter, отправляется сообщение
                    />
                  </div>
                  <div
                    className={
                      classes.ChatBox__MessageBox__BottomBar__SendButton
                    }
                  >
                    <i
                      className="fa fa-paper-plane-o"
                      aria-hidden="true"
                      onClick={this.sendHandler}
                    ></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </BGMain>
        {document.location.pathname.slice(9).length > 0 && (
          <BGSide>
            {this.friendId && (
              <UserCard
                dialog={true}
                user={this.props.users[this.friendId - 1]}
                loading={this.props.userLoading}
              />
            )}
          </BGSide>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    dialogsLoading: state.dialogList.dialogsLoading,
    dialogs: state.dialogList.dialogs,
    users: state.users.users,
    messages: state.dialogList.messages,
    messagesLoading: state.dialogList.messagesLoading,
    selectedDialog: state.dialogList.selectedDialog,
    myName: state.editProfile.userData.name,
    mySurname: state.editProfile.userData.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchDialogs: (userId) => dispatch(fetchDialogs(userId)),
    fetchUserById: (friendId) => dispatch(fetchUserById(friendId)),
    //setSearchedUsers: (filter) => dispatch(setSearchedUsers(filter)),
    selectDialog: (dialogId) => dispatch(selectDialog(dialogId)),
    sendMessages: (
      userId,
      content,
      friendId,
    ) =>
      dispatch(
        sendMessages(
          userId,
          content,
          friendId,
        )
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
