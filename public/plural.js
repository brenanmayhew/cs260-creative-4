var app = new Vue({
  el: '#app',
  data: {
		author: '',
		comment: '',
		comments: [],
		authorEdit: '',
		commentEdit: ''
	},
	created() {
		this.getComments();
	},
  methods: {
		async getComments() {
			try {
				let response = await axios.get("/api/plural_comments");
				this.comments = response.data;
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
					author: this.editingComment.author,
					comment: this.editingComment.comment	
				});
				this.getComments();
				this.editMode(comment);
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
		editMode(comment) {
			for (c in this.comments) {
				if (c._id === comment._id) {
					c.edit = !c.edit;
				} else {
					c.edit = false;
				}
			}
			console.log("here");
		}
	}
});
