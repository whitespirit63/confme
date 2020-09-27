import React from "react";
import classes from "./Sidebar.module.scss";
import { NavLink, Redirect } from "react-router-dom";
import { Logo } from "../../UI/Logo/Logo";
import { connect } from "react-redux";
import { changeHover } from "../../../store/actions/sidebar";

class Sidebar extends React.Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.icon}&nbsp;
            <p> {link.label}</p>
          </NavLink>
        </li>
      );
    });
  }

  render() {
    let labels = ["", "", "", ""];

    if (this.props.hover) {
      labels = ["Сообщения", "Материалы", "Расписание", "Войти", "Участники"];
    }
    const links = [
      {
        to: "/timetable",
        label: labels[2],
        icon: <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>,
        exact: false,
      },
      {
        to: "/users",
        label: labels[4],
        icon: <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>,
        exact: false,
      },
    ];
    if (!this.props.isAuthenticated) {
      links.push({
        to: "/",
        label: labels[3],
        icon: <i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>,
        exact: true,
      });
    }
    else {
      links.push(
        {
          to: "/dialogs",
          label: labels[0],
          icon: <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>,
          exact: false,
        },
        {
          to: "/materials",
          label: labels[1],
          icon: <i className="fa fa-paperclip fa-lg" aria-hidden="true"></i>,
          exact: false,
        },
      )
    }

    return (

        <div
          className={classes.Sidebar}
          onMouseEnter={this.props.changeHover}
          onMouseLeave={this.props.changeHover}
        >{!this.props.isAuthenticated ? <Redirect to="/" /> : null}
        <nav className={classes.wrapper}>
          <Logo isOpen={this.props.hover} />
          <ul>{this.renderLinks(links)}</ul>
          </nav>
         
        </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    hover: state.sidebar.hover,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeHover: () => dispatch(changeHover()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
