
<template>
  <div>
    <div v-if="display" @click="display = !display" class="modal-backdrop fade show"></div>
    <div class="navbar">
      <button v-if="this.page>1" aria-label="Previous" @click="prev()">
        <span aria-hidden="true">&laquo;</span>
      </button>
      <button aria-label="Next" @click="next()">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </div>
    <div v-if="posts && posts.length " class="card-columns">
      <div v-for="post in posts" :key="post.id" :post="post" class="card">
        <div class="card-body">
          <router-link :to="getlink(post.user.username)" active-class="active">
            <a>{{post.user.username}}</a>
          </router-link>
        </div>
        <!-- <router-view/> -->
        <img id="myImg" :src="post.urls.small" @click="show(post)">
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
            <router-link :to="getlink(image.user.username)" active-class="active">
              <a href>
                <h5
                  class="modal-title"
                  id="exampleModalLiveLabel"
                >instagram : {{image.user.username}}</h5>
              </a>
            </router-link>
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
      page: 2
    };
  },

  components: {},

  mounted() {
    this.getPosts(this.page);
  },
  methods: {
    getlink(username) {
      return "/user/" + username;
    },
    show(post) {
      this.image = post;
      this.display = true;
    },
    hide(event) {
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
          page: page,
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
  bottom: 0;
  width: 100%;
  position: none;
  z-index: 10;
}

.navbar button:hover {
  background: #ddd;
  color: black;
}
#myImg {
  width: 100%;
}
</style>
