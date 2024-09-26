# Phonebook Application

This is a simple React application for managing a phonebook. It allows you to add new contacts with names and phone numbers, and filter the displayed contacts by name in a case-insensitive manner.

## Features

- Add new contacts with a name and phone number.
- Prevent duplicate contacts based on the name (case-insensitive).
- Filter and display contacts based on a search input (case-insensitive).

## Components

`Filter`: A functional component that renders an input field to filter the displayed contacts by name.

Props:

- `handleFilter`: A function to handle changes in the filter input.

`Form`: A functional component that renders a form to add a new contact.

Props:

- `handleNewName`: A function to handle changes in the name input.
- `handleNewNumber`: A function to handle changes in the number input.
- `handleSubmit`: A function to handle form submission.

`Person`: A functional component that renders the list of contacts.

Props:

- `filter`: An array of filtered contacts to be displayed.

## Main Component

`App`: The main component that manages the state and logic of the phonebook application.

==== To be continued ===
