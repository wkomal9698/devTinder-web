# DevTinder

Created a Vite + React application
Remove unnecessary code and create a Hello World app
Install Tailwind CSS
Install Daisy UI
Add NavBar component to App.jsx
Create a NavBar.jsx separate component file
Install react-router-dom
Create BrowserRouter > Routes > Route=/ > RouteChildren
Create an Outlet in Body component
Create a footer

Create a login page
Install axios
CORS - Install cors in backend -> add middleware to with configurations: origin, credentials: true
Whenever you're making an API call so pass axios -> {withCredentials: true}
Install react-redux + @redux/toolkit - https://redux-toolkit.js.org/tutorials/quick-start 
configureStore -> Provider -> createSlice -> add reducer to store
Add redux devtools in Chrome
Login and see if your data is coming properly in the store
NavBar should update as soon as user logs in
Refactor our code to add constants file + create a components folder
You should not be able to access other routes without login
If token is not present, redirect user to login page
Logout feature
Get the feed and add feed to the store
Build the user card on feed
Edit profile feature
Show toast message on save of profile
New Page - See all my connections
New Page - See all my connection requests
Feature - Accept/Reject Connection Request
Send/ignore the user card from feed
Signup new user
E2E Testing

Body
    NavBar
    Route=/ => feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile


# Deployment
    Signup on AWS
    Launch Instance
    chmod 400 <secret>.pem
    ssh -i "devTinder-secret.pem" ubuntu@ec2-13-61-32-49.eu-north-1.compute.amazonaws.com
    Install Node version 20.18.0
    Clone both frontend and backend code from GitHub - git clone
    Frontend:
        npm install -> install dependencies
        npm run build
        sudo apt update
        sudo apt install nginx
        sudo systemctl start nginx
        sudo systemctl enable nginx
        Copy code from dist(build files) to /var/www/html
        sudo scp -r dist/* /var/www/html
        Enable port :80 of your instance