# Running the Ionic App

Instructions to run the mobile app in the browser:

Requirements (must all be installed globally):
* [Node.JS and NPM](https://nodejs.org/en/download/package-manager/) (v10.0 or newer)
* [Angular-CLI](https://github.com/angular/angular-cli/wiki) (latest version)
* [Cordova and Ionic](https://ionicframework.com/docs/intro/installation/) (latest version)

Once you have the main requirements, go ahead and open a terminal and navigate to the /ebay-app folder. Make sure that ```packages.json``` is in your current working directory.
Then, install all depencies using

```
npm install
```

If this succeeds without errors, you are ready to go! Launch Ionic with

```
ionic serve
```

The application is now available on ```http://localhost:8100```.

## Run Local JSON Server

The application currently makes use of a local server to retrieve the information on products. 
In order to fully run the app, this server must be running for data retrieval. 

The server can easily be run using ``` json-server ```. Install it by running
```
sudo npm install -g json-server
```

Then, navigate to the server/ folder and run
```
json-server -w products.json
```
Your local server is now accessible from ``` http://localhost:3000 ```. Note that ```json-server``` also serves the files in the public/ folder. 
These are directly accessible on, for example, ```http://localhost:3000/images/<file>.jpg```

## Build Applications

You can build the application by first adding the desired platform by running

```
ionic cordova platform add <platform_name>
```

Note that this process will return an error if the platform is already added.

Next, check whether all platform requirements are met using

```
ionic cordova requirements <platform_name>
```

If there is something missing, Cordova will tell you and you can fix this.

Finally, build the application with
``` 
ionic cordova build <platform_name> 
```
run in local emulator with
``` 
ionic cordova emulate <platform_name> 
```
or run on connected device with
``` 
ionic cordova run <platform_name> 
```
