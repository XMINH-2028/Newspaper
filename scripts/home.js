'use strict'

const login = document.getElementById('login-modal');
const content = document.getElementById('main-content');
const message = document.getElementById('welcome-message');
const logout = document.getElementById('btn-logout');

//Hiển thị nội dung khi đã đăng nhập và chưa đăng nhập
if (currentUser.username) {
	login.style.display = 'none';
	message.textContent = `Welcome ${currentUser.firstname}`;
} else {
	content.style.display = 'none';
	message.textContent = `Please Login or Register`;
}

////////////////////Khi click vào button Logout

logout.addEventListener('click', function() {
	localStorage.removeItem('currentUser');
	window.location.href = 'pages/login.html';
})