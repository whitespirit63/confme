import React from 'react'
import { NavLink } from 'react-router-dom'
import { closeUserCard } from '../../../store/actions/openUserCard'
import { DownBox } from '../DownBox/DownBox'
import { UserPhoto } from '../UserPhoto/UserPhoto'
import classes from './UserCard.module.scss'

export function UserCard(props) {
  return(
        <div className={classes.UserCard}>
            <UserPhoto size={'lg'} rounded={'true'}/>
            <div className={classes.UserCard__Name}>
                <span>{props.name}{" "}{props.surname}</span>
            </div>
            <div className={classes.UserCard__Role}>
                <span>{props.role}</span>
            </div>
            {props.city!=="" || props.country!==""
            (<div className={classes.UserCard__Location}>
                <span>{props.city}{", "}{props.country}</span>
            </div>)}
            
            <div className={classes.UserCard__Buttons}>
                {!!props.dialog ? <div className={classes.UserCard__Buttons__ForDialog}> <button onClick={props.onClickContacts}>В контакты</button> </div> :  
            <><NavLink onClick={closeUserCard} to={"/dialogs/" + props.id}>
                <button>Написать</button>
            </NavLink>
            <button onClick={props.onClickContacts}>В контакты</button></>}
            </div>
            <DownBox
            title = "Заголовок"
            text = "Текст"/>
        </div>
    )
}