import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import shortid from "shortid";

import style from "../styles/AddContacts.module.css";

class AddContact extends Component {
  state = {
    name: "",
    number: "",
    error: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (!name || !number) {
      this.setState({
        error: true
      });
      return;
    }
    this.setState({
      name: "",
      number: ""
    });

    this.props.addContact({ name, number, id: shortid.generate() });
  };

  handleChange = e => {
    this.setState({
      error: false
    });
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { error, name, number } = this.state;
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit} className={style.form}>
          <div>
            <TextField
              label="Name"
              className={style.input}
              name="name"
              onChange={this.handleChange}
              value={name}
              required
              helperText={error ? "Incorrect entry" : null}
              error={error}
            />
          </div>
          <div>
            <TextField
              label="Number"
              className={style.input}
              name="number"
              onChange={this.handleChange}
              value={number}
              required
              helperText={error ? "Incorrect entry" : null}
              error={error}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Add contact
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddContact;
