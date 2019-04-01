var app = new Vue({
  el: '#app',
  data: {
		author: '',
		comment: '',
		comments: [],
		authorEdit: '',
		commentEdit: '',
		idEdit: ''
	},
	created() {
		this.getComments();
	},
  methods: {
		async getComments() {
			try {
				let response = await axios.get("/api/eternal_comments");
				this.comments = response.data;
				this.idEdit = '';
				this.authorEdit = '';
				this.commentEdit = '';
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async deleteComment(comment) {
			try {
				let response = axios.delete("/api/eternal_comments/" + comment._id);
				await this.getComments();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async editComment(comment) {
			try {
				let response = axios.put("/api/eternal_comments/" + comment._id, {
					author: this.authorEdit,
					comment: this.commentEdit	
				});
				await this.getComments();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async upload() {
			try {
				const formData = new FormData();
				let response = await axios.post('/api/eternal_comments', {
					author: this.author,
					comment: this.comment
				});
				this.getComments();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		checkEdit(comment) {
			if (comment._id === this.idEdit) {
				return true;
			}
		},
		setEdit(comment) {
			this.idEdit = comment._id;
			this.authorEdit = comment.author;
			this.commentEdit = comment.comment;
		}
	}
});

