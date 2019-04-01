var app = new Vue({
  el: '#app',
  data: {
		author: '',
		comment: '',
		comments: []	
	},
	created() {
		this.getComments();
	},
  methods: {
		async getComments() {
			try {
				let response = await axios.get("/api/eternal_comments");
				this.comments = response.data;
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async deleteComment(comment) {
			try {
				let response = axios.delete("/api/eternal_comments/" + comment._id);
				this.getComments();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async editComment(comment) {
			try {
				let response = await axios.put("/api/eternal_comments/" + comment._id, {
					author: this.editingComment.author,
					comment: this.editingComment.comment	
				});
				this.getComments();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async upload() {
			this.comments.push({
				author: this.author,
				comment: this.comment
			});
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
		}
	}
});
