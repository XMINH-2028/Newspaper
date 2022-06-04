'use strict'

const btnSubmit = document.getElementById('btn-submit');
let inputPageSize  =  document.getElementById('input-page-size');
let inputCategory = document.getElementById('input-category');
//Đặt giá trị cài đặt theo từng User
inputPageSize.value = currentUser.pagesize;
inputCategory.value = currentUser.category;
//Đặt giá trị nhỏ nhất có thể lựa chọn cho số bài viết hiển thị mỗi trang => không phải validate input
inputPageSize.setAttribute('min','1');

////////////////////Lưu thay đổi khi click vào nút 'Save Settings'
btnSubmit.addEventListener('click', function() {
	if (!currentUser.username) {
		alert('Please login to do this!')
		return;
	}
	currentUser.pagesize = inputPageSize.value;
	currentUser.category = inputCategory.value;
	saveToStorage('currentUser',currentUser);
	userArr.forEach(value => {
		if (value.username === currentUser.username) {
			value.pagesize = inputPageSize.value;
			value.category = inputCategory.value;
		}
	})
	saveToStorage('userArr',userArr);
})