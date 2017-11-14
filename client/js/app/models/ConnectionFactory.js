var stores = ['negociacoes'];
var version = 4;
var dbname = 'aluraframe';

class ConnectionFactory {
	
	constructor() {

		throw new Error('Nâo é possível instanciar ConnectionFactory');
	}

	static getConnection () {

		return new Promise((resolve, reject) => {

			let openRequest = window.indexedDB.open('aluraframe', version);

			openRequest.onupgradeneeded = e => {

				ConnectionFactory._createStores(e.target.result);
			};

			openRequest.onsuccess = e => {

				resolve(e.target.result);
			};

			openRequest.onerror = e => {

				console.log(e.target.error);
				reject(e.target.error.name);
			};
		});
	}

	_createStores(connection) {

		stores.forEach(store => {
			if (connection.target.result.objectStoreNames.contains(store)) 
				connection.target.result.deleteObjectStore(store);
			
			connection.target.result.createObjectStore(store, { autoIncrement: true});
		})
	}
}