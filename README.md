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
    Backend:
        Updated DB password
        Allowed EC2 instance public IP on MongoDB server (whitelisting the IP)
        Installed pm2 globally (npm install pm2 -g)
        Started server (pm2 start npm -- start)
        pm2 logs
        pm2 list
        pm2 flush <name>
        pm2 stop <name>
        pm2 delete <name>
        pm2 start npm --name "devTinder-backend" -- start
        config nginx path -> /etc/nginx/sites-available/default
        Restart nginx (sudo systemctl restart nginx)
        Modify the BASE_URL in frontend project to "/api"

# Nginx config
    Frontend: http://13.61.32.49/
    Backend: http://13.61.32.49:3000/

    Domain name = devtinder.com => 13.61.32.49

    Frontend: http://devtinder.com/
    Backend: http://devtinder.com:3000/ => http://devtinder.com/api

    nginx config:

    server_name 13.61.32.49;
    location /api/ {
            proxy_pass http://localhost:3000/;  # Forward requests to Node.js app
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
    }

# Adding a custom domain name
    Purchased domain name from GoDaddy
    Signup on CloudFlare and add a new domain name
    Change the Nameservers on GoDaddy and point it to CloudFlare (important step)
    Wait for sometime till your nameservers are updated (around 15 minutes)
    Add DNS record: A devtinder.in 13.61.32.49
    Enable SSL for website

# Sending Emails via SES
    Create a IAM user
    Give access to AmazonSESFullAccess
    Amazon SES: Create an Identity
    Verify your domain name
    Verify an email address identity
    Install AWS SDK v3
    Code Example - https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
    Setup SesClient
    Access Credentials should be created on IAM under SecurityCredentials tab
    Add the credentials to the env file
    Write code for SESClient
    Write code for sendEmail
    Make the email dynamic by passing more parameters to the run function

# Scheduling Cron jobs in NodeJS
    Installing node-cron
    Learning about cron expressions syntaxt - crontab.guru
    Schedule a job
    date-fns
    Find all unique emailIds who have received connection requests the previous day
    Send email
    Explore different queue mechanisms to send bulk requests
    Amazon SES bulk Emails
    Make sendEmail function dynamic
    bee-queue and bull npm packages

# Razorpay Payment Gateway Integration
    Sign up on Razorpay and complete KYC (Activation takes 3-5 days)
    Created UI for premium page
    Creating an API for create order in backend
    Added my key and secret in .env file
    Initialized RazorPay in utils
    Creating order on razorpay
    Created schema and model
    Saved the order in payments collection
    Make the order API dynamic
    Setup Razorpay webhook on your live API
    Ref - Razorpay gitHub : https://github.com/razorpay/razorpay-node/tree/master/documents
    Ref - Razorpay steps to integrate : https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
    Ref - Verify webhook signature : https://razorpay.com/docs/webhooks/validate-test/
    Ref - Payment payload in webhooks : https://razorpay.com/docs/webhooks/payloads/payments/

# Real time chat using Websocket (Library: socket.io)
    Build the UI for a chat window on /chat/:targetUserId
    Setup socket.io in backend
    npm i socket.io
    Setup frontend socket.io-client
    Initialize the chat
    createSocketConnection
    Listen to events
    Homework: Improve the UI
    Homework: Fix security bug - Auth in web sockets
    Homework: Fix bug - If I am not a connection, then I should not be able to send message
    Homework: Feat: Show green symbol when online - [last Seen 2 hours ago - use timestamps]
    Homework: Limit messages when fetching from DB - Load more on scroll up
    For scalability, read about Redis

# Project Ideas
    Tic tac toe game
    Chess game
    TypeRacer game
