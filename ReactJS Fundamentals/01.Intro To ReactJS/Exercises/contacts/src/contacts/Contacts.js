import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style/app.css';
import './style/index.css';
import contactsList from './data/contacts.json';

const showContact = (firstName, lastName, key) => (
  <div className='contact' data-id='id' key={key} onClick={e => onClickForDetails(e, key)}>
    <span className='avatar small'>&#9787;</span>
    <span className='title'>{firstName} {lastName}</span>
  </div>
);

const changeName = (value) => (
  <span className='name'>{value}</span>
);

const changeInfoLine = (value) => (
  <span className='info-line'>{value}</span>
);

const showDetails = (contact) => (
  <div className='content'>
    <div className='info'>
      <div className='col'>
        <span className='avatar'>&#9787;</span>
      </div>
      <div className='col'>
        {changeName(contact.firstName)}
        {changeName(contact.lastName)}
      </div>
    </div>
    <div className='info'>
      {changeInfoLine(`\u260e ${contact.phone}`)}
      {changeInfoLine(`\u2709 ${contact.email}`)}
    </div>
  </div>
);

let contactToRender = contactsList[0];

const onClickForDetails = (event, contactId) => {
  contactToRender = contactsList.find(el => el.id === contactId);
  // ReactDOM.render(<Contacts />, document.getElementById('root'));
  ReactDOM.render(
    showDetails(contactToRender),
    document.getElementById('here'));
};

const Contacts = () => (
  <div className='container'>
    <header>&#9993; Contact Book</header>
    <div id='book'>
      <div id='list'>
        <h1>Contacts</h1>
        <div className='content'>
          {
            contactsList.map(el => {
              return showContact(el.firstName, el.lastName, el.id);
            })
          }
        </div>
      </div>
      <div id='details'>
        <h1>Details</h1>
        <div id='here'>
          {
            showDetails(contactToRender)
          }
        </div>
      </div>
      <footer>Contact Book SPA &copy; 2017</footer>
    </div>
  </div>
);

/*
class Contacts extends Component {
  render () {
    return (
      <div className='container'>
        <header>&#9993; Contact Book</header>
        <div id='book'>
          <div id='list'>
            <h1>Contacts</h1>
            <div className='content'>
              {
                contactsList.map(el => {
                  return showContact(el.firstName, el.lastName, el.id);
                })
              }
            </div>
          </div>
          <div id='details'>
            <h1>Details</h1>
            {
              showDetails(contactToRender)
            }
          </div>
        </div>
        <footer>Contact Book SPA &copy; 2017</footer>
      </div>
    );
  }
}
*/
export default Contacts;
