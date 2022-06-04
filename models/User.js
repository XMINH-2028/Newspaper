'use strict'
 
////////////////////Tạo class User
class User {
	constructor(firstname, lastname, username, password, pagesize, category) {
		this.firstname = firstname,
		this.lastname =lastname,
		this.username = username,
		this.password = password,
		this.pagesize = pagesize,
		this.category = category
	}
	//Hàm nhận và trả về data từ API
	async getNews(page,q) {
		try {
			//Lấy thông tin từ API theo country và category
			let data = await fetch(`https://newsapi.org/v2/top-headlines?pageSize=${this.pagesize}&page=${page}&country=us&category=${this.category}&q=${q = q === undefined ? ' ' : q}&apiKey=75bca4be60064579a54262158976914f`);
			data = await data.json();
			if (data.status === 'error') throw 'Fail to loading!';
			return data;
		}
		catch(err) {
			console.error(err);
			throw err;
		}
	}

}

////////////////////Tạo class Task 

class TodoTask {
	constructor(task,owner,isDone) {
		this.task = task,
		this.owner = owner,
		this.isDone = isDone
	}
}