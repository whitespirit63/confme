import React from "react";
import classes from "./agenda.module.scss";
import axios from "../../../axios/axios";
import { Card } from "../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  changeValue,
  changeEditor
} from "../../../store/actions/editProfile";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import { Scrollbars } from 'react-custom-scrollbars'
import WholeTimetable from "../../../components/ExactTimePanel/WholeTimetable";
import DateChanger from "../../../components/DateChanger/DateChanger";

class Agenda extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
        <div className={classes.Agenda}>
          <BGMain>
            <Scrollbars>
                <DateChanger />
                <WholeTimetable />
            </Scrollbars>
          </BGMain>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);