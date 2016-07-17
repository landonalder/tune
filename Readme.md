## Intro
This is my first foray into using React js and one of the first times I've written this much javascript.
It was fun learning all these new (to me) technologies but I know there is still much to learn when it comes to
proper conventions around code organization in a react project.

Unfortunately, time didn't permit for me to write tests for my code this weekend because of how much there was to
learn in a short time span. However, I am passionate about making sure code is well tested so you can easily tell
if you're making breaking changes or not.

## About the files in the project

In the project you will find a small ruby file named `InputFormatter.rb` that I wrote to format the json files
that were provided into a format that's easier to process. It takes in both the users.json and logs.json files,
merges the data by user id, and then outputs users.json with the merged data. The small server I wrote (`server.js`) -- based
off the server from the react tutorial -- uses `express` to serve this file to the react application.

All of website related code can be found in the `public` folder.

## How to Run
1. Run `npm install` to download the needed packages locally
2. Run `npm start` to start the server. It will be running on port `3000`
3. Navigate to `localhost:3000` in your browser
