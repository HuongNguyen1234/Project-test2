<template>
  <div class="col-md-12">
    <div class="row mb-5">
      <div class="col-md-12 text-center">
        <img
          :src="postImage.profile_image != null ? postImage.profile_image.large : '#' "
          class="avatar"
        >
        <div class="user_bio mt-3">
          <h3>{{postImage.username}}</h3>
        </div>
        <div class="user_info">
          <span class="ml-3">{{postImage.location}}</span>
          <span class="ml-3">{{postImage.portfolio_url}}</span>
        </div>
      </div>
    </div>
    <div v-if="listImage && listImage.length " class="card-columns">
      <div v-for="image in listImage" :key="image.id" class="card">
        <img id="myImg" :src="image.urls.small" class="img-fluid" @click="show(image)">
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
            <h5
              class="modal-title"
              id="exampleModalLiveLabel"
            >instagram : {{showImage.user.username}}</h5>
          </div>
          <div class="modal-body">
            <img :src="showImage.urls.regular" alt style="width:100%">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "userPost",

  data() {
    return {
      display: false,
      listImage: [],
      postImage: {},
      showImage: {}
    };
  },
  mounted() {
    this.getPost(this.$route.params.username);
  },

  methods: {
    show(post) {
      this.image = post;
      this.display = true;
    },
    hide(event) {
      if (event.target.id == "exampleModalLive") {
        this.display = false;
      }
    },
    getPost(username) {
      axios({
        method: "get",
        url:
          "https://api.unsplash.com/users/" +
          username +
          "/photos/?client_id=547200f1dd00ab529dac3f360c540e29b5cbca2832758864f7909bd8c8cc60ef",
        params: {
          method: "unsplash.search.photos",
          extras: "urls, created_at, updated_at, description",

          format: "json",
          nojsoncallback: 1,
          per_page: 20
        }
      })
        .then(response => {
          this.listImage = response.data;
          this.showImage = response.data["0"];
          this.postImage =
            this.listImage.length > 0 ? this.listImage["0"].user : {};
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
<style>
.avatar {
  border-radius: 82px;
}
.col-md-12 {
  margin-top: 2%;
}
.card_header {
  padding: 16px;
}
</style>
