# LocalStorageNamespace

## Namespaced local storage

LocalStorageNS allows you to more easily manage related items in localStorage.

For example, if you need to store some items related to how the user arranged 
the interface, as well as some items related to application state:

Create a namespace for storing the interface items
```javascript
var interface = LocalStorageNS.create("interface");
```
Store some interface-related items
```javascript
interface.setItem("sidebar", "collapsed");
interface.setItem("icon-set", "large");
```
Retrieve an item
```javascript
interface.getItem("icon-set"); // "large";
```
Create a namespace for storing application state items
```javascript
var appState = LocalStorageNS.create("application-state");
```
Store some application state items
```javascript
appState.setItem("project", {
	name: "My Project",
	file: "/path/to/project.file",
	resources: [
		'/path/to/resources/img1.png',
		'/path/to/resources/img2.png'
		]
	}, true); // third param `true` forces JSON encoding

appState.setItem("notes", app.notes, true);
```
Get an encoded item
```javascript
// pass `true` as second parameter to decode JSON
// project item will be returned as a JSON string if `true` not passed as second param
appState.getItem("project", true);
```
Get all items in the "application-state" namespace
```javascript
appState.getItems(true); // `true` requests parsing of JSON-encoded items
```
Clear the "project" from the "application-state" namespace
```javascript
appState.removeItem("project");
```
Clear all items from the "interface" namespace
```javascript
interface.clear(); // will remove all items from localStorage assigned to this namespace
```
The "interface" namespace is now empty
```javascript
interface.getItems(); // returns {}
```
Trying to create a namespace that already exists will simply return a reference to the original namespace
```javascript
var interface2 = LocalStorageNS.create("interface");
interface === interface2; // true
```
Test to see if an object is a local storage namespace
```javascript
LocalStorageNS.isNamespace(interface2); // true
```



