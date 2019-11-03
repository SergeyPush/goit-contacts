import React, { Component } from "react";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactsList";
import Alert from "./components/Alert";
import { Fade } from "react-reveal";

import { Container, Typography, TextField } from "@material-ui/core";
import style from "./styles/App.module.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    alertIsopened: false
  };

  componentDidMount() {
    const storage = localStorage.getItem("contacts");
    this.setState({
      contacts: storage ? JSON.parse(storage) : []
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      try {
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
      } catch (error) {
        console.log(error);
      }
    }
  }

  onAddContact = contact => {
    const sameName = this.state.contacts.find(
      item => item.name === contact.name
    );
    if (sameName) {
      this.setState({
        alertIsopened: true
      });
      return;
    }

    this.setState(state => ({
      contacts: [...state.contacts, contact]
    }));
  };

  handleFilter = e => {
    const search = e.target.value;

    this.setState({
      filter: search
    });
  };

  onRemoveItem = id => {
    const removed = this.state.contacts.filter(item => item.id !== id);
    this.setState({
      contacts: removed
    });
  };

  handleCloseAlert = () => {
    this.setState({
      alertIsopened: false
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <Container>
        <Alert
          open={this.state.alertIsopened}
          handleClose={this.handleCloseAlert}
        />
        <div className={style.App}>
          <section className={style.add}>
            <Typography variant="h4" gutterBottom>
              Phonebook
            </Typography>

            <AddContact addContact={this.onAddContact} />
          </section>
          {this.state.contacts.length > 0 && (
            <Fade right timeout={500}>
              <section className={style.contacts}>
                <Typography variant="h4" gutterBottom>
                  Contacts
                </Typography>

                <TextField
                  label="Search"
                  value={this.state.filter}
                  onChange={this.handleFilter}
                  className={style.searchField}
                />

                <ContactList
                  contacts={filteredContacts}
                  removeContact={this.onRemoveItem}
                />
              </section>
            </Fade>
          )}
        </div>
      </Container>
    );
  }
}

export default App;
