
<template>
  <div>
    <div class="navbar">
      <button v-if="this.page>1" aria-label="Previous" @click="prev()">
        <span aria-hidden="true">&laquo;</span>
      </button>
      <button aria-label="Next" @click="next()">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </div>
    <div v-if="display" @click="display = !display" class="modal-backdrop fade show"></div>
    <div v-if="posts && posts.length " class="card-columns">
      <div v-for="post in posts" :key="post.id" :post="post">
        <img id="myImg" :src="post.urls.small" class="card" @click="show(post)">
      </div>
    </div>
    <div
      v-if="display"
      @click="hide($event)"
      id="exampleModalLive"
      class="modal show"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLiveLabel"
      style="display: block;"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">instagram : {{image.user.username}}</h5>
          </div>
          <div class="modal-body">
            <img :src="image.urls.regular" alt style="width:100%">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
 

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      posts: [],
      display: false,
      image: {},
      page: 1
    };
  },

  components: {},

  mounted() {
    this.getPosts(this.page);
  },
  methods: {
    show(post) {
      this.image = post;
      this.display = true;
    },
    hide($event) {
      if (event.target.id == "exampleModalLive") {
        this.display = false;
      }
    },
    next() {
      this.page = this.page + 1;
      this.getPosts(this.page);
    },
    prev() {
      this.page = this.page - 1;
      this.getPosts(this.page);
    },
    getPosts(page) {
      axios({
        method: "get",
        url:
          "https://api.unsplash.com/photos/?client_id=547200f1dd00ab529dac3f360c540e29b5cbca2832758864f7909bd8c8cc60ef",
        params: {
          method: "unsplash.search.photos",
          extras: "urls, created_at, update_at, description",
          page: this.page,
          format: "json",
          nojsoncallback: 1,
          per_page: 20
        }
      })
        .then(response => {
          this.posts = response.data;
          this.image = response.data["0"];
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
<style>
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
  position: none;
}

.navbar button:hover {
  background: #ddd;
  color: black;
}
</style>
