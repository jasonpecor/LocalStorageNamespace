
/**
 * LocalStorageNS
 * v 0.1
 *
 * Created by Jason Pecor
 *
 * Usage
 * - - - - - - - - - -
 * var p = LocalStorageNS.create( "preferences" ); 							// create a namespage
 * p.setItem( "username", "faflintstone" ); 								// set a standard item in the namespace
 * p.setItem( "contact", {email: "ff@bedrock.com", name: "Fred"}, true );	// set an encoded item in the namespace
 * p.getItem( "username" );													// get a standard item in the namespace
 * p.getItem( "contact", true );											// get an encoded item in the namespace
 * p.getItems();															// get all items in the namespace
 * p.getItems( true );														// get all items, decoding encoded items
 * p.clear();																// clear all items in the namespace
 */
 
var LocalStorageNS = ( function ( window ) {
	
	var _index = [], _all = {}, sep = '::';
	
	function LocalStorageNamespace(ns) {
		this.ns = ns;
	}
	
	LocalStorageNamespace.prototype.setItem = function (name, item, json) {
		window.localStorage.setItem(this.ns + sep + name, json ? JSON.stringify(item) : item);
		return this;
	};
	
	LocalStorageNamespace.prototype.getItem = function (name, json) {
		return json ? JSON.parse(window.localStorage.getItem(this.ns + sep + name)) : window.localStorage.getItem(this.ne + sep + name);
	};
	
	LocalStorageNamespace.prototype.removeItem = function (name) {
		window.localStorage.removeItem(this.ns + sep + name);
		return this;
	};
	
	LocalStorageNamespace.prototype.getItems = function (json) {
		
		var i = 0, 
			l = window.localStorage.length, 
			items = {}, 
			start = this.ns + sep,
			sl = start.length;
		
		for (; i<l; i++) {
			
			var key = window.localStorage.key(i),
				raw = key.substr(sl);
			
			if (key.indexOf(start) === 0) {
				if (json) {
					
					try {
						items[raw] = JSON.parse(window.localStorage[key]);
						
					} catch(ex) {
						
						items[raw] = window.localStorage[key];
					}
					
				} else {
					items[raw] = window.localStorage[key];
				}
			}
		}
		
		return items;
	};
	
	LocalStorageNamespace.prototype.clear = function () {
		
		var i = 0, 
			l = window.localStorage.length, 
			remove = [], 
			start = this.ns + sep;
		
		for (; i<l; i++) {
			var key = localStorage.key(i);
			if (key.indexOf(start) === 0)
				remove.push(key);
		}
		
		var i = 0; l = remove.length;
		
		for (; i<l; i++)
			window.localStorage.removeItem(remove[i]);
			
		return this;
	};
	
	return {
		create: function (ns) {
			if (-1 === _index.indexOf(ns)) {
				_index.push(ns);
				_all[ns] = new LocalStorageNamespace(ns);
			}
			return _all[ns];
		}
	}

})( window );
