'use strict';
console.log('hello')
import {select, getElement, onEvent, validateContact,validateEmail} from "./utilty.js";
import { Contact } from './Contact.js';



  const contacts = [];
  const feedbackElement = document.getElementById('feedback');

  function showFeedback(message, isError = true) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = isError ? 'red' : 'green';
  }

  document.getElementById('addBtn').addEventListener('click', function() {
    const contactInfoValue = document.getElementById('contactInfo').value;
    const [name, city, email] = contactInfoValue.split(',').map(s => s.trim());

    if (name && city && validateEmail(email)) {
      const contact = new Contact(name, city, email);
      contacts.push(contact);
      listContacts();
      showFeedback('Contact added successfully.', false);
      contactInfoInput.value = '';
    } else {
      showFeedback('Invalid input or email format. Please enter the information in the format: Name, City, valid Email.');
    }
  });

  function listContacts() {
    const contactsDiv = document.getElementById('contacts');
    contactsDiv.innerHTML = ''; // Clear the list
    contacts.forEach((contact, index) => {
      const contactCard = document.createElement('div');
      contactCard.className = 'contact-card';
      contactCard.innerHTML = `
        <h3>Name: ${contact.name}</h3>
        <p>City: ${contact.city}</p>
        <p>Email: ${contact.email}</p>
      `;
      contactCard.addEventListener('click', () => deleteContact(index));
      contactsDiv.appendChild(contactCard);
    });
    console.log('Contacts listed.');
  }
// Access the modal, confirm, and cancel buttons
const modal = document.getElementById('delete-confirmation-modal');
const confirmBtn = document.getElementById('confirm-delete');
const cancelBtn = document.getElementById('cancel-delete');

function showConfirmationModal(message) {
  document.getElementById('modal-text').textContent = message;
  modal.style.display = 'block'; // Show the modal
}

// When the user clicks on "Yes" (confirmBtn), close the modal and delete the contact
confirmBtn.onclick = function() {
  modal.style.display = 'none';
  const index = this.getAttribute('data-index'); // Use a data attribute to hold the index
  contacts.splice(index, 1);
  listContacts();
  // Show some feedback here if necessary
};

// When the user clicks on "No" (cancelBtn), close the modal
cancelBtn.onclick = function() {
  modal.style.display = 'none';
};

// Call this function when a delete action is attempted
function deleteContact(index) {
  // Attach the index to the confirm button
  confirmBtn.setAttribute('data-index', index);
  showConfirmationModal('Are you sure you want to delete this contact?');
}

  
