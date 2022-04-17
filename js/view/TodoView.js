export class TodoView {
    #form = null;
    #todoWrapper = null;

    removeTodoTask(target) {
        target.closest('.taskWrapper').parentElement.remove();
    };

    removeAllTodos() {
        this.#todoWrapper.innerHTML = '';
    };

    clearForm() {
        this.#form.reset();
    };

    renderItem(renderData) {
        this.#todoWrapper.prepend(
            TodoView.#createTemplate(renderData)
        )
    };

    static #createTemplate({header, task, id}) {
        //wrappers
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-4');
        const taskWrapper = document.createElement('div');
        taskWrapper.classList.add('taskWrapper');
        //head
        const taskHeading = document.createElement('div');
        taskHeading.classList.add('taskHeading', 'text-center');
        taskHeading.innerHTML = header;
        //description
        const taskDescription = document.createElement('div');
        taskDescription.classList.add('taskDescription', 'text-center');
        taskDescription.innerHTML = task;
        //menu
        const taskMenu = document.createElement('div');
        taskMenu.classList.add('taskMenu');
        const formCheck = document.createElement('div');
        formCheck.classList.add('form-check');
        const formCheckInput = document.createElement('input');
        formCheckInput.classList.add('form-check-input');
        formCheckInput.setAttribute('type', 'checkbox');
        formCheckInput.setAttribute('id', 'form-check-label');
        formCheckInput.setAttribute('value', 'Done');
        formCheckInput.dataset.todoId = `${id}`;

        const formCheckLabel = document.createElement('label');
        formCheckLabel.classList.add('form-check-label');
        formCheckLabel.setAttribute('for', 'flexCheckDefault');
        formCheckLabel.innerHTML = 'Done';

        const redCross = document.createElement('input');
        redCross.classList.add('redCross');
        redCross.setAttribute('id', 'clearItem');
        redCross.setAttribute('type', 'button');
        redCross.dataset.todoId = `${id}`

        const hr = document.createElement('hr');
        hr.classList.add('hrNormalize');

        formCheck.append(formCheckInput);
        formCheck.append(formCheckLabel);
        taskWrapper.append(formCheck);
        taskWrapper.append(redCross);
        taskWrapper.append(hr)
        taskWrapper.append(taskHeading);
        taskWrapper.append(taskDescription);
        wrapper.append(taskWrapper);

        return wrapper;
    };

    //setters for properties
    set todoWrapper(wrapperElement) {
        if (this.#todoWrapper) throw new Error('Todo wrapper element already exists');
        if (!wrapperElement instanceof HTMLElement) throw new Error('Can not define wrapper. Value is not HTML element');
        this.#todoWrapper = wrapperElement;
    };

    set form(formElement) {
        if (this.#form) throw new Error('Form element already exists');
        if (!formElement instanceof HTMLElement) throw new Error('Can not define form. Value is not HTML element')
        this.#form = formElement;
    };
};