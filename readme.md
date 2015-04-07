# Squid

Squid is a small cool tool that give you a quick access to all your Github repositories, straight from from your Mac OS X menu bar.

### Builded on top of:

* [nw.js](http://nwjs.io/)
* [react.js](https://facebook.github.io/react/)
* [Github API](https://developer.github.com/v3/)

### Contributors

* [Didier Forest](https://github.com/welcometothesky) for the cool design.  
* [Adrien Griveau](https://dribbble.com/adrien-griveau) for the nice icons.  
* [e-Founders](http://www.e-founders.com) for the time.

## Roadmap

### 0.2.0:

* Distribution build script
* Unit-test
* Node-Webkit auto update [ref](https://github.com/edjafarov/node-webkit-updater)
* Start at user login [ref](https://github.com/nwjs/nw.js/wiki/Making-your-app-start-at-user-login-(OS-X))


## Personal reminders / Troubleshoots

run the app:  

	../tmp/nwjs.app/Contents/MacOS/nwjs .

if gulp throw a `'Error: EMFILE, open '/path/to/package.json' error`, run the following command: 

	ulimit -S -n 2048 
