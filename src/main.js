import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
Vue.use(VueResource)
Vue.use(VueMoment)

var vm = new Vue({
  el: "body",
  data: {
  	key : "qMKlb7FhuLXIhBwz0Z6aevxjqwyFyGtKMHoFCqinLeTnhPrCjX",
  	offset : 0,
  	hostname : "foo-chan.tumblr.com",
    medias: [],
  },
  methods: {
  	loadMedias: function() {
  		console.log('loadMedias');
  		this.$http.jsonp(
	    	"http://api.tumblr.com/v2/blog/"+this.hostname+"/posts/photo?offset="+this.offset+"&api_key="+this.key,
	    	{
				headers: {
					'Access-Control-Allow-Origin' : "http://blog.left.tw",
					'Accept': 'application/json'
				}
	    	}
	   	).then((response) => {
	   		console.log('Success');
	   		var posts = response.body.response.posts;
	   		if (posts === 0) {
	   			return ;
	   		}

	   		this.offset += posts.length;
		   	var medias = [];
			posts.forEach(function(post) {
               	if (post.type === "photo") {
					post.photos.forEach(function(photo) {
						var media = {
							"created" : post.date,
							"url" : photo.original_size.url
						}
						medias.push(media);
					});
				}
            });
		
			this.medias = medias;
			console.log(this.offset);
		}, (response) => {
			console.log('Fail');
			console.log(response);
		});
  	}
  }
})

vm.loadMedias();