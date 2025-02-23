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
Profile page

Body
    NavBar
    Route=/ => feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile