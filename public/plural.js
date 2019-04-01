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
				let response = await axios.get("/api/plural_comments");
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
				let response = axios.delete("/api/plural_comments/" + comment._id);
				this.getComments();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async editComment(comment) {
			try {
				let response = await axios.put("/api/plural_comments/" + comment._id, {
					author: this.authorEdit,
					comment: this.commentEdit	
				});
				this.getComments();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async upload() {
			try {
				const formData = new FormData();
				let response = await axios.post('/api/plural_comments', {
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
