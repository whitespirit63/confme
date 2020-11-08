import React from "react";
import classes from "./AgendaEvent.module.scss";
import { UserPhoto } from "./../UserPhoto/UserPhoto";
import InputAutocomplete from "./../InputAutocomplete/InputAutocomplete"

const AgendaEvent = (props) => {


  return (
    <div className={classes.AgendaEvent} style={{top: props.top, height: props.height}}>
      <div className={classes.Row}>
        <div className={classes.time}>
          {props.time}
        </div>
        <div className={classes.duration}>
          {props.duration}
        </div>
      </div>
      <div className={classes.Row}>
        <div className={classes.theme}>
          Тема:
          <div className={classes.body}>
            {props.theme}
          </div>
        </div>
        <div className={classes.speakers}>
          Спикеры:
            <div className={classes.Row}>
                  <div className={classes.photo}>
                    <UserPhoto size="vsm"/>
                  </div>
                  <div className={classes.person}>
                    {props.speakers}
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaEvent;
