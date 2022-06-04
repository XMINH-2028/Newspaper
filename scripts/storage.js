'use strict'
	
let userArr = getFromStorage('userArr') ? getFromStorage('userArr') : [];
let currentUser = getFromStorage('currentUser') ? getFromStorage('currentUser') : {};
//Chuyển dữ liệu lấy từ localStorage về dạng Class Instance
userArr = userArr.map(value => parseUser(value));
currentUser = parseUser(currentUser);

////////////////////Hàm chuyển dữ liệu nhận về dạng Class Instance

function parseUser(userData) {
	const user = new User(userData.firstname, userData.lastname, userData.username, userData.password, userData.pagesize, userData.category);
	return user;
}

////////////////////Lấy dữ liệu từ localStorage

function getFromStorage(string) {
	const data = localStorage[string];
	if (data) return JSON.parse(data);
	else return;
}

////////////////////Lưu dữ liệu lên localStorage

function saveToStorage(string,value) {
	localStorage[string] = JSON.stringify(value);
}

////////////////////Lấy dữ liệu từ form đăng nhập

function getInputLogin() {
	const inputUsername = document.getElementById('input-username');
	const inputPassword = document.getElementById('input-password');
	const data = {
		username: inputUsername.value,
		password: inputPassword.value
	}
	return data;
}

////////////////////Lấy dữ liệu từ form đăng kí

function getInputRegister() {
	const inputFirstname = document.getElementById('input-firstname');
	const inputLastname = document.getElementById('input-lastname');
	const inputPasswordConfirm = document.getElementById('input-password-confirm');
	const data = getInputLogin();
	data.firstname = inputFirstname.value;
	data.lastname = inputLastname.value;
	data.confirm = inputPasswordConfirm.value;
	data.pagesize = 5;
	data.category = 'General';
	data.todolist = [{content: 'Hit the gym',status: ''},{content: 'Pay bills',status: ''},{content: 'Meet George',status: ''},{content: 'Buy eggs',status: ''},{content: 'Read a book',status: ''},{content: 'Organize office',status: ''}];
	return data;
}