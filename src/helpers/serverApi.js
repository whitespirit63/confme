import io from "socket.io-client";

class serverApi {
  constructor() {
    this.socket = null;
    this.token = null;
  }

  connect = (url) => {
    this.socket = io(url);
  };

  // Params:
  //  data = {name, surname, email, password}
  // return:
  //  {status: 'success', message: 'User registred'}
  //  {status: 'error', message: 'Cannot register user'}
  signUp = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "registration",
        {
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
        },
        (res) => {
          console.log("signUp: ", res);
          return resolve(JSON.parse(res));
        }
      );
    });
  };

  // Params:
  //  data = { email, password }
  // return:
  //  {status: 'success', message: {
  //      id: user_id,
  //      name: user_name,
  //      surname: user_surname,
  //      accessToken: user_token
  //  }}
  //  {status: 'error', message: "User doesn`t exist"}
  //  {status: 'error', message: "Password isn`t valid"}
  signIn = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "authentication",
        { email: data.email, password: data.password },
        (res) => {
          console.log("signIn: ", res);
          const response = JSON.parse(res);
          if (response && response.status === "success") {
            this.token = response.message.accessToken;
            this.socket.emit("join", { user_id: response.message.id }, (res) => {
              console.log("SignIn subscribe on messages: ", res);
            });
            this.socket.on("message", (data) => {
               console.log('Took message', data)
            });
          }
          resolve(response);
        }
      );
    });
  };

  // Params:
  //  data = { sender_id, reciever_id, text }
  // return:
  //  {status: 'success', message: 'Message sent'}
  sendMessage = (data) => {
    this.socket.emit(
      "message",
      {
        sender_id: data.sender_id,
        reciever_id: data.reciever_id,
        text: data.text,
      },
      (res) => {
        console.log(res);
      }
    );
  };

  fetchDialogs = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchDialogs", {user_id: data.user_id}, res => {
        console.log("Fetch dialogs: ", res);
        const response = JSON.parse(res);
        resolve(response);
      })
    })
  }

  
}

const api = new serverApi();
export default api;