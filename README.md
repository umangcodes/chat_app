# Chat app for MHL

Developed by Umang A

## Tech stack

This project is powered by React.js and Firebase.
Dependencies include:

- TailwindCss
- dotenv for environment variables.

### Functionality

The chat app needs you to login with your google account. The user can view all the messages posted on the channel and also post any additonal messages once a user is logged in.

The input form will detect if user tries to send an empty message and will pop-up an error.

The chat has functionality to update based on the data changes in database, but the due to api call limits in firebase, it has been disabled for now.

### Future versions

Future versions will include 
    - option to edit the message 
    - delete the message
    - create new channels
    - channel admin
    - users isolation
    - real time database
    - better UX/UI
