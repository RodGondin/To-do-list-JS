var input = document.getElementById('input');
var btnAddTodo = document.getElementById('plus');
var listTodo = document.getElementById('list');
var btnClearAll = document.getElementById('clear-all');
document.addEventListener("DOMContentLoaded", localStorageHistory);

input.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    event.preventDefault()
    let todo = {
      name: input.value,
      id: generateId(),
    }

    createTodo(todo);
  }
});

btnAddTodo.addEventListener("click", function () {
  let todo = {
    name: input.value,
    id: generateId(),
  }

  createTodo(todo);
});

function generateId() {
  return Math.floor(Math.random() * 3000)
}

function createTodo(todoInfo) {
  if (todoInfo.name < 1) {
    alert("Por favor digite uma tarefa");
  } else {
    let li = createTagLi(todoInfo);
    listTodo.appendChild(li);
    input.value = '';
    localStorage.setItem('todo:' + todoInfo.id, JSON.stringify(todoInfo));
  }
}

function createTagLi(todoInfo) {
  let li = document.createElement('li');
  li.id = todoInfo.id;

  let input = document.createElement('input');
  input.classList.add('to-do-text');
  input.setAttribute("readonly", true)
  input.value = todoInfo.name;

  let buttonEdit = document.createElement('button');
  buttonEdit.classList.add('icon-button');
  buttonEdit.id = 'button-edit';
  buttonEdit.innerHTML = '<ion-icon name="create-outline" class="icon-button"></ion-icon>';
  buttonEdit.setAttribute('onclick', 'edit(' + todoInfo.id + ')');

  let buttonRemove = document.createElement('button');
  buttonRemove.classList.add('icon-button');
  buttonRemove.id = 'button-remove';
  buttonRemove.innerHTML = '<ion-icon name="trash-outline" class="icon-button"></ion-icon>';
  buttonRemove.setAttribute('onclick', 'remove(' + todoInfo.id + ')');

  li.appendChild(input);
  li.appendChild(buttonEdit);
  li.appendChild(buttonRemove);

  return li;
}

function edit(idTodo) {
  let li = document.getElementById('' + idTodo + '');
  let input = li.children[0];
  if (input) {
    input.removeAttribute("readonly");

    input.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        event.preventDefault();
        input.setAttribute("readonly", true);

        let todoInfo = {
          name: input.value,
          id: idTodo,
        };

        updateTodo(todoInfo);
      }
    });
  }
}

function updateTodo(todoInfo) {
  let li = document.getElementById(todoInfo.id);
  if (li) {
    let input = li.children[0];
    if (input) {
      input.value = todoInfo.name;
      localStorage.setItem('todo:' + todoInfo.id, JSON.stringify(todoInfo));
    }
  }
}


function remove(idTodo) {
  let confirmDelete = window.confirm('Tem certeza que deseja excluir?');
  if (confirmDelete) {
    let li = document.getElementById('' + idTodo + '');
    if (li) {
      listTodo.removeChild(li);
      localStorage.removeItem('todo:' + idTodo);
    }
  }
}

function localStorageHistory() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith('todo:')) {
      let todoInfo = JSON.parse(localStorage.getItem(key));
      let li = createTagLi(todoInfo);
      listTodo.appendChild(li);
    }
  }
}

btnClearAll.addEventListener('click', function (e) {
  localStorage.clear();
  window.location.reload();
})