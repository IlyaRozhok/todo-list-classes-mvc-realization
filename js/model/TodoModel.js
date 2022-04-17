import {TodoModelStorage as Storage} from './TodoModelStorage.js';

export class TodoModel extends Storage {

    setData(todoItemData) {
        if (!this.hasItem()) {
            return this.setItem([todoItemData])
        }

        let refreshedData = [...this.data, todoItemData];
        this.setItem(refreshedData)
    };

    deleteData() {
        this.clearStorage();
    };
};