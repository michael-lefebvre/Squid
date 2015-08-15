# Squid

Squid is a small cool tool that give you a quick access to all your Github repositories, straight from from your Mac OS X menu bar. It was originally coded to learn react.js and the flux architecture. Now the project is seriously moving into a Github issues client. Any helps is welcome.
  
![screenshot](http://f.cl.ly/items/0G0w1R1J0a2P102M1G0M/search.jpg)  
<sub><sup>old screenshot, will be updated soon</sup></sub>

### Builded on top of:

* [nw.js](http://nwjs.io/)
* [react.js](https://facebook.github.io/react/)
* [Github API](https://developer.github.com/v3/)

### Contributors:

* [Didier Forest](https://github.com/welcometothesky) for the design 
* [Adrien Griveau](https://dribbble.com/adrien-griveau) for the iconography

## Dev Env

After you cloned this repository to your workstation, follow the next steps to run Squid into developer mode:

* first, install Node.js packages:

		npm install
		
* into `./package.json` set `debug` property to `true` (optional but useful). If you want a very cosy developpement environnement  rename the `window` property to `windowProd` and rename the `windowDev` node to `window`. This will force nw.js to display the console.
	
* the following Gulp command will concatenate js/less files and wait for any further changes to do it again: 

		gulp
		
* To start the Application, into a new terminal window run:

		npm start
		
	
## Build app

Run these command

	sh build.sh
	
The freshly builded `.dmg` will be available into the `release` folder.

## Roadmap

See the [roadmap](https://github.com/michael-lefebvre/Squid/milestones) future developments.


## Personal reminders / Troubleshoots

if gulp throw a `'Error: EMFILE, open '/path/to/package.json' error`, run the following command: 

	ulimit -S -n 2048 
