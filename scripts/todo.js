'use strict'

const btnAdd = document.getElementById('btn-add');
const inputTask = document.getElementById('input-task');
const todoList = document.getElementById('todo-list');
let todoArr = getFromStorage('todoArr') ? getFromStorage('todoArr') : [];
todoArr = todoArr.map(task => new TodoTask(task.task,task.owner,task.isDone));

//Render Todo List khi load lại trang
if (currentUser.username) {
	renderTodoList();
}

////////////////////Hàm render todolist theo User

function renderTodoList() {
	todoArr.forEach((user,index) => {
		if (user.owner === currentUser.username) {
			renderTask(user,index,'old');
		}
	})
}

////////////////////Hàm add thêm một task vào list

function renderTask(task,index,type) {
	const todo = document.createElement('li');//Tạo phần tử li
	todo.setAttribute('data-index',index);//Lưu thứ tự task trong list
	if (type === 'old') {//Nếu task đã tồn tại type = old kiểm tra trạng thái để thêm class 'checked'
		if (task.isDone) todo.setAttribute('class','checked');//isDone === true => checked
		else todo.setAttribute('class','');//isDone === false => ''
	} else {
		todo.setAttribute('class','');//Nếu task mới type = new isDone = false => ''
	}
	todo.innerHTML = `${task.task}<span class="close">×</span>`;
	todoList.insertAdjacentElement('afterbegin',todo);//Chèn task mới vào đầu list
}

////////////////////Validate task

function validateTask() {
	const data = inputTask.value;
	if (data.trim() === '') {//Kiểm tra xem người dùng đã nhập nội dung chưa, nội dung tất cả là khoảng trắng không được chấp nhận
		alert('Please input task name!');
		return;
	}
	//Nội dung không được chứa khoảng trắng ở 2 đầu
	if (data.trim().length < data.length) {
		alert('Task must not contain leading and trailing spaces!');
		return;
	}
	//Nếu owner đã thêm task vào list => hiện thông báo task đã tồn tại
	for (let task of todoArr) {
		if (task.task.toLowerCase() === data.toLowerCase() && task.owner === currentUser.username) {
			alert('Task already exists, please enter something else!');
			return;
		}
	}
	return data;
}

////////////////////Thêm task vào list khi click vào nút 'add'

btnAdd.addEventListener('click',function() {
	if (!currentUser.username) {
		alert('Please login to do this!')
		return;
	}
	const data = validateTask();
	if (!data) return;
	const task = new TodoTask(data,currentUser.username,false);//Tạo Task mới
	renderTask(task,todoArr.length,'new');
	todoArr.push(task);//Thêm task vào todoArr
	saveToStorage('todoArr',todoArr);//Lưu task lên localStorage
	inputTask.value = '';
})

////////////////////Xóa task khỏi list khi click vào nút 'close'

todoList.addEventListener('click',function(e) {
	if (e.target.className != 'close') return;//Xác định vị trí click chuột
	const index = e.target.closest('li').getAttribute('data-index');//Lấy vị trí trí task trong todolist
	console.log(index);
	e.target.closest('li').remove();//Xóa task khỏi trang
	todoArr.splice(index,1);//Xóa task trong todoArr
	saveToStorage('todoArr',todoArr);//Lưu todoArr vào local storage
})

////////////////////Toggle class 'checked' khi click vào task

todoList.addEventListener('click',function(e) {
	if (e.target.hasAttribute('data-index')) {
		e.target.classList.toggle('checked');
		const index = e.target.getAttribute('data-index');
		todoArr[index].isDone = todoArr[index].isDone ? false : true;
		saveToStorage('todoArr',todoArr);
	}
})



