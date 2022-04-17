export class TodoController {

    #formID = null;
    #todoWrapperID = null;
    #currentItemID = 0;

    #removeAllBtnID = null;
    #removeAllBtn = null;

    #form = null;
    #formFields = null;
    #todoWrapper = null;

    #Model = null;
    #View = null;

    constructor(config, Model, View) {
        //connect model & view
        this.#setModel(Model);
        this.#setView(View);

        //define selectors
        this.#formID = config.todoFormID;
        this.#todoWrapperID = config.todoWrapperID;
        this.#removeAllBtnID = config.removeAllBtnClass;

        //define HTML elements
        this.form = TodoController.#getDOMElement(this.formID);
        this.todoWrapper = TodoController.#getDOMElement(this.todoWrapperID);
        this.removeAllBtn = TodoController.#getDOMElement(this.removeAllBtnID);

        //events
        this.#setSubmitEvent();
        this.#setOnloadEvent();
        this.#setRemoveItemEvent();
        this.#setRemoveAllEvent();
        this.#setChangeStatusEvent();
    };

    #setView(View) {
        this.#View = new View(this);
    };

    #setModel(Model) {
        this.#Model = new Model(this);
    };

    static #getDOMElement(selector) {
        const element = document.querySelectorAll(selector);
        if (!element.length) throw new Error('Did not find HTML element');

        return element;
    };

    static #validateInputs(key) {
        if (!key.trim()) throw new Error('Inputs can not be empty');
    };

    static #findInputs(target) {
        const data = Array.from(target.querySelectorAll('input[type=text], textarea'))
            .reduce((accum, key) => {
                TodoController.#validateInputs(key.value)
                accum[key.name] = key.value;
                return accum
            }, {})

        return this.formFields = data;
    };

    //events
    #setSubmitEvent() {
        this.form.addEventListener('submit', this.submitHandler.bind(this)) //todo handler
    };

    #setOnloadEvent() {
        document.addEventListener('DOMContentLoaded', this.onloadHandler.bind(this))
    };

    #setRemoveItemEvent() {
        this.todoWrapper.addEventListener('click', this.removeItemEventHandler.bind(this));
    };

    #setRemoveAllEvent() {
        this.removeAllBtn.addEventListener('click', this.removeAllHandler.bind(this));
    };

    #setChangeStatusEvent() {
        this.todoWrapper.addEventListener('change', this.changeStatusHandler.bind(this));
    };

    //event handlers
    submitHandler(e) {
        e.preventDefault();
        const {target} = e;

        this.currentItemID += 1;

        let data = {
            ...TodoController.#findInputs(target),
            completed: false,
            id: this.currentItemID,
        };

        this.#Model.setData(data);
        this.#View.renderItem(data);
        this.#View.clearForm();
    };

    onloadHandler() {
        if (!this.#Model.hasItem()) return;

        const data = [...this.#Model.data];
        this.currentItemID = data.length;

        for (const item of data) {
            this.#View.renderItem(item);
        }
    };

    removeItemEventHandler(e) {
        e.stopPropagation();
        const {target} = e;
        const data = this.#Model.data;
        const id = target.getAttribute('data-todo-id');
        const currentItemIndex = data.findIndex(todoItem => {
            return todoItem.id === +id;
        });

        if (target.classList.contains('redCross')) {
            data.splice(currentItemIndex, 1);
            this.#Model.setItem(data);
            this.#View.removeTodoTask(target);
        }
    };

    removeAllHandler() {
        if (confirm('Do you want to delete all todo tasks?')) {
            this.#View.removeAllTodos();
            if (this.#Model.data.length) this.#Model.deleteData();
        }
    };

    changeStatusHandler(e) {

        e.stopPropagation();
        const {target} = e;
        const data = this.#Model.data;
        const itemId = target.getAttribute('data-todo-id');
        const currentItemIndex = data.findIndex(todoItem => {
            return todoItem.id === +itemId
        });
        data[currentItemIndex].completed = target.checked;

        this.#Model.setItem(data);
    };

    //getters
    get formID() {
        return this.#formID;
    };

    get form() {
        return this.#form;
    };

    get todoWrapperID() {
        return this.#todoWrapperID;
    }

    get todoWrapper() {
        return this.#todoWrapper;
    };

    get formFields() {
        return this.#formFields;
    };

    get currentItemID() {
        return this.#currentItemID;
    };

    get removeAllBtnID() {
        return this.#removeAllBtnID;
    };

    get removeAllBtn() {
        return this.#removeAllBtn;
    };

    //setters
    set form(formNode) {
        if (!(!!formNode.length)) throw new Error('Error in setting form.');
        this.#form = formNode[0];
        this.#View.form = formNode[0];
    };

    set todoWrapper(wrapperNode) {
        if (!(!!wrapperNode.length)) throw new Error('Error in setting todo wrapper.');
        this.#todoWrapper = wrapperNode[0];
        this.#View.todoWrapper = wrapperNode[0];
    };

    set removeAllBtn(buttonNode) {
        if (!(!!buttonNode.length)) throw new Error('Error in setting remove-all button.');
        this.#removeAllBtn = buttonNode[0];
    };

    set formFields(fieldList) {
        if (!!Object.keys(fieldList)) return this.#formFields = fieldList;
    };

    set currentItemID(id) {
        if (id === 0) throw new Error('ID = 0.');
        if (id === this.currentItemID) throw new Error('ID can not be equal current one.');
        this.#currentItemID = id;
    };
};