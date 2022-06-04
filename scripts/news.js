'use strict'

const newsContainer = document.getElementById('news-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');
const nav = document.querySelector('#content nav');
let page = 1;

//Render News khi load lại trang
nav.style.display = 'none';
renderNews().then(data => {
	if (data.totalResults !=0) nav.style.display = 'block';
});

//////////////////// Hàm render các bài báo nhận được từ API theo từng trang

async function renderNews() {
	const data = await currentUser.getNews(page);
	newsContainer.innerHTML = '';//Xóa dữ liệu trang cũ
	//Lưu tổng số bài viết lấy từ API
	newsContainer.setAttribute('data-total',data.totalResults);
	//Điều khiển sự ẩn hiện của các nút 'Previous' và 'Next'
	nav.style.display = data.totalResults > 0 ? 'block': 'none';
	btnPrev.style.display = page === 1 ? 'none' : 'block';
	btnNext.style.display = page >= data.totalResults/currentUser.pagesize ? 'none' : 'block';
	//Render các bài báo theo page
	data.articles.forEach((value,index) => {
		const article = document.createElement('div');
		article.setAttribute('id','new-content');
		article.setAttribute('class','d-flex border mb-3');
		article.innerHTML = `<img src="${value.urlToImage}" alt='Image not found' class="d-block" style="width: 36%; height: 16rem">
			<div id="new-description" class="px-3" style="width: 64%;">
				<h5>${value.title}</h5>
				<p>${value.description}</p>
				<button id="btn-new-detail" data-index='${index}' class="border-0 bg-primary text-white px-2 py-1 rounded">View</button>
			</div>`;
		newsContainer.appendChild(article);
	})

	////////////////////Chuyển tới trang nguồn của bài báo khi click button 'View'

	newsContainer.addEventListener('click', function(e) {
		if (e.target.id = 'btn-new-detail') {
			const view = e.target.getAttribute('data-index');
			window.location.href = data.articles[view].url;
		}
	})
	return data;
}

////////////////////Chuyển trang tiếp theo khi click vào nút 'Next'

btnNext.addEventListener('click', function () {
	const total = newsContainer.getAttribute('data-total');
	page = page >= total/currentUser.pagesize ? page : page + 1;
	pageNum.textContent = page;
	renderNews();

})

////////////////////Quay lại trang trước khi click vào nút 'Previous'

btnPrev.addEventListener('click', function () {
	const total = newsContainer.getAttribute('data-total');
	page = page === 1 ? page : page - 1;
	pageNum.textContent = page;
	renderNews();

})
