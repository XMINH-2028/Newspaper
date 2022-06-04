'use strict'

const login = document.getElementById('btn-submit');//Trỏ tới nút submit

////////////////////Hàm validate form login

function validateFormLogin() {
	const data = getInputLogin();//Lấy dữ liệu từ form login

	//Tên đăng nhập không được để trống
	if (!data.username) {
		alert('Please input Username!');
		return;
	}
	//Password không được để trống
	if (!data.password) {
		alert('Please input Password!');
		return;
	}
	//Kiểm tra username và password
	if (userArr.length === 0) {
		alert('Incorrect Username or Password!');
		return;
	}
	for (let user of userArr) {
		if (user.username === data.username && user.password === data.password) {
			return user;
		} 	
	}
	alert('Incorrect Username or Password!');
	return;
}

login.addEventListener('click', function() {
	//Nếu validate khác 'false'
	const data = validateFormLogin();
	if (data) {
		currentUser = data;
		saveToStorage('currentUser',currentUser);
		login.closest('form').submit();//Submit form
		window.location.href = '../index.html';//Chuyển tới trang chủ
	}
})