LocalStorageNamespace
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Namespaced local storage

LocalStorageNS allows you to more easily manage related items in localStorage.

For example, if you need to store some items related to how the user arranged 
the interface, as well as some items related to application state.

// create a namespace for storing the interface items

var interface = LocalStorageNS.create("interface");

// store some interface-related items

interface.setItem("sidebar", "collapsed");
interface.setItem("icon-set", "large");

// retrieve an item

interface.getItem("icon-set"); // "large";

// create a namespace for storing application state items

var appState = LocalStorageNS.create("application-state");

// store some application state items

appState.setItem("project", {
	name: "My Project",
	file: "/path/to/project.file",
	resources: [
		'/path/to/resources/img1.png',
		'/path/to/resources/img2.png'
		]
	}, true); // third param `true` forces JSON encoding

appState.setItem("notes", app.notes, true);

// get an encoded item

appState.getItem("project", true);

// we want to close the "project", so we clear it from the namespace

appState.removeItem("project");

// we want to get all application state items

appState.getItems(true); // `true` requests parsing of JSON-encoded items

// we want to reset all interface preferences

interface.clear(); // will remove all items from localStorage assigned to this namespace

// the interface namespace is how empty
interface.getItems(); // returns {}






