import React from "react";

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Icon
} from "@material-ui/core";

import style from "../styles/Contact.module.css";

const getImage = name => {
  return `https://eu.ui-avatars.com/api/?name=${name}&rounded=true`;
};

const Contact = ({ name, number, id, removeContact }) => {
  const handleRemoveItem = id => {
    removeContact(id);
  };

  return (
    <ListItem className={style.listItem}>
      <ListItemAvatar>
        <Avatar src={getImage(name)} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={number} />
      <button
        onClick={() => handleRemoveItem(id)}
        className={style.deleteButton}
      >
        <Icon>delete_outline</Icon>
      </button>
    </ListItem>
  );
};

export default Contact;
