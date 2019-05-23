var dbPromised = idb.open("champion_league_app", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });

    articlesObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function saveForLater(team) {
    dbPromised.then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.add(team);
        return tx.complete;
    }).then(function() {
        M.toast({html: 'Team Favorite!'});
    }).catch(function() {
        M.toast({html: 'Failed to favorite team!'});
    });
}

function deleteByID(id) {
    dbPromise.then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(id);
        return tx.complete;
    }).then(function() {
        M.toast({html: 'Team removed from favorite'});
    }).catch(function() {
        M.toast({html: 'Failed to remove team from favorite'});
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised.then(function(db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.getAll();
        }).then(function(teams) {
            resolve(teams)
        });
    })
}

function getAllByName(name) {
    return new Promise(function(resolve, reject) {
        dbPromised.then(function(db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            var nameIndex = store.index("name");
            var range = IDBKeyRange.bound(name, name + "\uffff");
            return nameIndex.getAll()
        }).then(function(articles) {
            resolve(articles)
        });
    })
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised.then(function(db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.get(parseInt(id));
        }).then(function(team) {
            resolve(team)
        });
    })
}

function deleteByID(id) {
    return dbPromised.then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        return store.delete(parseInt(id));
    })
}