# Sparq Network Subnet Explorer


Steps to run the subplorer locally

1.) Git clone this repo

2.) Cd into the explorer directory

3.) 

a.) Add a .env file with the a variable titled "DATABASE" (Strings not included).

b.) Set this = your mongodb uri given to you when you click "connect" then "connect your application" on mongoDb.

4.) Locate the "indexer.js" file. 

5.) Switch out the JSON RPC endpoint to the node you would like it to be pointed at.

<img width="612" alt="Screen Shot 2022-11-21 at 4 46 40 PM" src="https://user-images.githubusercontent.com/88636756/203164534-e2bd1c96-0be7-4b35-9660-c94d5c55725a.png">

6.) Make sure you are still in the explorer directory and run "yarn install". 

7.) This will install all the necessary dependencies.

8.) Run "yarn dev" in your terminal and open up your browser to your local host
