import React from "react";
import List from "@material-ui/core/List";
import Contact from "./Contact";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import style from "../styles/ContactList.module.css";
import "../styles/transitions.css";

const ContactsList = ({ contacts, removeContact }) => {
  return (
    <List className={style.list}>
      <TransitionGroup>
        {contacts.map(({ name, number, id }) => (
          <CSSTransition key={id} timeout={500} classNames="item">
            <div>
              <Contact
                name={name}
                number={number}
                id={id}
                key={id}
                removeContact={removeContact}
              />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  );
};

export default ContactsList;
