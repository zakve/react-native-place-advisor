import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'places.db',
        location: 'default',
        //createFromLocation: '~SQLite.db',
    },
    () => { },
    error => {
        console.log("ERROR: " + error);
    }
);

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                (trans, results) => {
                    resolve()
                },
                (err) => {
                    reject(err)
                }
            );
        })
    })
    return promise;
}

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
                [title, imageUri, address, lat, lng],
                (trans, result) => {
                    resolve(result)
                },
                (err) => {
                    reject(err)
                }
            );
        })
    })
    return promise;
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM places',
                [],
                (trans, result) => {
                    resolve(result)
                },
                (err) => {
                    reject(err)
                }
            );
        })
    })
    return promise;
}