'use strict'

const register = document.getElementById('btn-submit');//Trỏ tới nút submit

////////////////////Hàm validate form login

function validateFormRegister() {
	const data = getInputRegister();//Lấy dữ liệu từ form login

	//First name không được có khoảng trắng ở 2 đầu
	if (data.firstname.trim().length < data.firstname.length) {
		alert('First Name must not contain leading and trailing spaces!');
		return;
	}
	//First name không được để trống
	if (!data.firstname.trim()) {
		alert('Please input First Name!');
		return;
	}
	//Last name không được có khoảng trắng ở 2 đầu
	if (data.lastname.trim().length < data.lastname.length) {
		alert('Last Name must not contain leading and trailing spaces!');
		return;
	}
	//Last name không được để trống
	if (!data.lastname.trim()) {
		alert('Please input Last Name!');
		return;
	}
	//Tên đăng nhập không được có khoảng trắng ở 2 đầu
	if (data.username.trim().length < data.username.length) {
		alert('Username must not contain leading and trailing spaces!');
		return;
	}
	//Tên đăng nhập không được để trống
	if (!data.username.trim()) {
		alert('Please input Username!');
		return;
	}
	//Kiểm tra xem tài khoản có bị trùng không
	for (let user of userArr) {
		if (user.username === data.username) {
			alert('Account already exists, please enter another username!');
			return;
		}
	}
	//Password không được để trống
	if (data.password === '') {
		alert('Please input Password!');
		return;
	}
	//Password phải lớn hơn 8 kí tự
	if (data.password.length < 9) {
		alert('Password must be more than 8 characters!');
		return;
	}
	//Confirm Password không được để trống
	if (data.confirm === '') {
		alert('Please input Confirm Password!');
		return;
	}
	//Xác nhận lại password
	if (data.password != data.confirm) {
		alert('Confirm password incorrect!');
		return;
	}
	return data;
}

register.addEventListener('click', function() {
	//Nếu validate khác 'false'
	const data = validateFormRegister();
	if (data) {
		userArr.push(parseUser(data));
		saveToStorage('userArr',userArr);
		register.closest('form').submit();//Submit form
		window.location.href = 'login.html';//Chuyển tới trang login 
	}
})
