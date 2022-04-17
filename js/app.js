'use strict';

import {TodoController as Controller} from "./controller/TodoController.js";
import {TodoView as View} from "./view/TodoView.js";
import {TodoModel as Model} from "./model/TodoModel.js";

const app = (() => {

    const config = {
        todoFormID: '#todoForm',
        todoWrapperID: '#todoItems',
        removeAllBtnClass: '.remove-all',
    };

    const controller = new Controller(
        config, Model, View
    )
    return controller;
})();


