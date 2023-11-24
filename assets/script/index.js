'use strict';

import {select, getElement, onEvent} from "./utilty.js";
import { Contact } from './Contact.js';

const contacts = [];

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Get form values and create new contact
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const contact = new Contact(name, city, email);
    contacts.unshift(contact); // Add to the beginning of the array
    listContacts();
});

function listContacts() {
    const contactsDiv = document.getElementById('contacts');
    contactsDiv.innerHTML = '';
    // Iterate through contacts and display them
    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.innerHTML = `<p>${contact.name}</p><p>${contact.city}</p><p>${contact.email}</p>`;
        contactDiv.addEventListener('click', () => {
            contacts.splice(index, 1);
            listContacts();
        });
        contactsDiv.appendChild(contactDiv);
    });
}
