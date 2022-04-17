export class TodoModelStorage {
    databaseKey = 'todoInputs';

    #data() {
        return JSON.parse(localStorage.getItem(this.databaseKey));
    };

    #setItem(data) {
        return localStorage.setItem(this.databaseKey, JSON.stringify(data));
    };

    #hasItem() {
        const localStorageItem = localStorage.getItem(this.databaseKey);
        if (localStorageItem === null) return false;

        return !!JSON.parse(localStorageItem).length;
    };

    static #clearStorage() {
        return localStorage.clear();
    }

    get data() {
        return this.#data()
    };

    setItem(data) {
        return this.#setItem(data)
    };

    hasItem() {
        return this.#hasItem()
    };

    clearStorage() {
        TodoModelStorage.#clearStorage();
    };
};
