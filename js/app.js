const main = (document=>{
	function createElement (tag, props, ...childeren){
		const element = document.createElement(tag);
		// console.log(element); 

		Object.keys(props).forEach(key => element[key] = props[key]);

		if(childeren.length > 0){
			childeren.forEach(child => {
				if(typeof child === "string"){
					child = document.createTextNode(child);
				}
				element.appendChild(child);
			});
		}

		return element;
	}

	function createTodoItem(title){
		const checkbox = createElement("input", {type: "checkbox", className: "checkbox"} );
		const label = createElement("label", {className: "title"}, title);
		const editInput = createElement("input", {type: "text", className: "textfield"});
		const editButton = createElement('button', { className: "edit"}, "ИЗМЕНИТЬ");
		const deleteButton = createElement("button", {className:"delete"}, "УДАЛИТЬ");
		const listItem = createElement('li', {className:"todo-item"}, checkbox, label, editInput, editButton, deleteButton);
		
		// const checkbox = document.createElement("input");
		// checkbox.type = "checkbox";
		// checkbox.className = "checkbox";

		// const label = document.createElement("label");
		// label.innerText = title;
		// label.className = "title";

		// const editInput = document.createElement("input");
		// editInput.type = 'text';
		// editInput.className = 'textfield';

		// const editButton = document.createElement('button');
		// editButton.innerText = 'ИЗМЕНИТЬ';
		// editButton.className = 'edit';

		// const deleteButton = document.createElement("button");
		// deleteButton.innerText = 'УДАЛИТЬ';
		// deleteButton.className = 'delete';

		// const listItem = document.createElement('li');
		// listItem.className = 'todo-item';

		// listItem.appendChild(checkbox);
		// listItem.appendChild(label);
		// listItem.appendChild(editInput);
		// listItem.appendChild(editButton);
		// listItem.appendChild(deleteButton);
		
		// console.log(listItem);

		bindEvents(listItem);

		return listItem;
	}

	function bindEvents(todoItem){

		const checkbox = todoItem.querySelector(".checkbox");
		const editButton = todoItem.querySelector("button.edit");
		const deleteButton = todoItem.querySelector("button.delete");

		checkbox.addEventListener("change", toggleTodoItem);
		editButton.addEventListener("click", editTodoItem);
		deleteButton.addEventListener("click", deleteTodoItem);
	}

	function addTodoItem (event){
		event.preventDefault();

		if (addInput.value === "") return alert("write something");

		const todoItem = createTodoItem(addInput.value);
		todoList.appendChild(todoItem);
	  
		addInput.value = "";
	}

	function toggleTodoItem(){
		// console.log(this);
		const listItem = this.parentNode;
		// console.log(listItem);
		listItem.classList.toggle("completed");
	}

	function editTodoItem(){
		const listItem = this.parentNode;
		const title = listItem.querySelector('.title');
		const editInput = listItem.querySelector(".textfield");
		const isEditing = listItem.classList.contains("editing");

		// console.log(listItem);
		// console.log(title);
		// console.log(editInput);
		// console.log(isEditing);

		if(isEditing){
			title.innerText = editInput.value;
			this.innerText = 'изменить';
		} else {
			editInput.value = title.innerText;
			this.innerText = 'сохранить';
		}

		listItem.classList.toggle("editing");
	}

	function deleteTodoItem(){
		const listItem = this.parentNode;
		todoList.removeChild(listItem);
	}

	const todoForm = document.getElementById("todo-form");
	const addInput = document.getElementById("add-input");
	const todoList = document.getElementById("todo-list");
	const todoItems = document.querySelectorAll(".todo-item");



	function main (){
		todoForm.addEventListener("submit", addTodoItem);
		todoItems.forEach(item => bindEvents(item));
	}

	return main;		
})(document);

main();