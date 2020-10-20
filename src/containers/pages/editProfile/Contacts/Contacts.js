import React from "react";
import Input from "../../../../components/UI/Input/Input";
import classes from "./Contacts.module.scss";
import axios from "../../../../axios/axios";
import { Card } from "../../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  loadUserNameFromServer,
  updateUserName,
  changeValue,
} from "../../../../store/actions/editProfile";
import { UserItem } from "../../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../../components/UI/UserPhoto/UserPhoto";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.surname = this.props.surname;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }

  onChangeHandler(e) {
    if (e.target.name === "Vkontakte") {
      this.props.changeValue(e.target.name, e.target.value);
      this.vkontakte = e.target.value;
    } else if (e.target.name === "Phone") {
      this.props.changeValue(e.target.name, e.target.value);
      this.phone = e.target.value;
    } else if (e.target.name === "Facebook") {
      this.props.changeValue(e.target.name, e.target.value);
      this.facebook = e.target.value;
    } else if (e.target.name === "Linkedin") {
      this.props.changeValue(e.target.name, e.target.value);
      this.linkedin = e.target.value;
    } else if (e.target.name === "Instagram") {
      this.props.changeValue(e.target.name, e.target.value);
      this.instagram = e.target.value;
    }
  }


  async onSendHandler() {
    const name = this.name;
    const surname = this.surname;

    const phone = this.phone;
    const vkontakte = this.vkontakte;
    const facebook = this.facebook;
    const linkedin = this.linkedin;
    const instagram = this.instagram;

    const userId = localStorage.getItem("userId");
    const requestData = {
      Phone: phone,
      Vkontakte: vkontakte,
      Facebook: facebook,
      Linkedin: linkedin,
      Instagram: instagram
    };
    try {
      this.props.updateUserName(this.name, this.surname);
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.EditProfile}>
        <Card title="Контакты">
          <div className={classes.Info}>
            <UserPhoto size="lg" />
            <div className={classes.column}>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 123}} htmlFor="Phone">Телефон:</label>
                  <input

                    name="Phone"
                    value={this.props.phoneValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите ваш телефон"
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 109}} htmlFor="Vkontakte">Вконтакте:</label>
                  <input

                    name="Vkontakte"
                    value={this.props.vkontakteValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите ваш вк"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 116}} htmlFor="Facebook">Facebook:</label>
                  <input
                    name="Facebook"
                    value={this.props.facebookValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите ваш fb"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 124}} htmlFor="Linkedin">Linkedin:</label>
                  <input
                    style={{width: "356px"}}
                    name="Linkedin"
                    onChange={this.onChangeHandler}
                    placeholder="Введите ваш Linkedin"
                    value={this.props.linkedinValue}
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 110}} htmlFor="Instagram">Instagram:</label>
                  <input
                    style={{width: "356px"}}
                    name="Instagram"
                    onChange={this.onChangeHandler}
                    placeholder="Введите ваш Instagram"
                    value={this.props.instagramValue}
                  ></input>
                </div>
              </div>


              <button style={{width: '235px', marginLeft: '200px'}} onClick={this.onSendHandler}>Сохранить</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.name,
    surname: state.editProfile.surname,
    accountType: state.editProfile.accountType,
    isAuthenticated: !!state.auth.token,
    userData: state.editProfile.userData,

    phoneValue: state.editProfile.phoneValue,
    vkontakteValue: state.editProfile.vkontakteValue,
    facebookValue: state.editProfile.facebookValue,
    linkedinValue: state.editProfile.linkedinValue,
    instagramValue: state.editProfile.instagramValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    changeValue: (value) => dispatch(changeValue(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);