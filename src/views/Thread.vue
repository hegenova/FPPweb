<template>
  <div class="home">
    <br/>
    <h1>/vue/ vueJS based forum site</h1>
  </div>
  <br/>
  <router-link type="submit" class="btn btn-primary" :to="{path: `/thread/newpost/${this.forumId}`}">new post</router-link>
  <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        #{{forumId}}
        <h5 class="card-title">{{forumInfo.Title}}</h5>
        <div><img :src="forumInfo.imageThread" onerror="this.style.display='none'"/></div>
        <p class="card-text">{{forumInfo.Description}}</p>
      </div>
    </div>
  </div>
  </div>
  <div class="row">
    <div class="col-sm-6">
      <div class="card"> 
        <div class="card-body" v-for="post in posts" :key="post.id">
          #{{ post.id }}
          <br/>
          {{post.replyTo}}
          <br/>
          <div>
        <img :src="post.imagepost" onerror="this.style.display='none'"/>
        </div>
          {{ post.post }}
          <br/>
          <router-link type="submit" class="btn btn-success" :to="{path: `/thread/replyPost/${post.id}`}">reply</router-link>
          <br/>
          --------------------------------------------------------------
        </div>
      </div>
  </div>
  </div>
</template>
<style>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card img {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
</style>

<script>
// @ is an alias to /src
import forColRef from "../firebase";
import { getDoc, getDocs, doc, setDoc, query, orderBy } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import db from "../firebase";
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      forums: [],
      selectedDoc: {},
      docRef: {},
      postdocRef: {},
      forumId: null,
      search: "",
      forumInfo: {
        Title: "",
        Description: "",
        imageThread: null,
      },
      posts: [],
      adminMode: false,
    }
  },
  methods: {
    async getForum() {
      let forRef = doc(forColRef, this.forumId);
      this.docRef = forRef;
      let forum = await getDoc(this.docRef);
      let forumData = forum.data();
      this.forumInfo.Title = forumData.Title;
      this.forumInfo.Description = forumData.Description;
      this.forumInfo.imageThread = forumData.imageThread;
    },
    async deleteForum(forumID) {
      let forumRef = doc(forColRef, forumID);
      await deleteDoc(forumRef);
      this.$router.go();
    },
    async fetchPost() {
      const postColRef = collection(db, `${this.forumId}/post`);
      let dataSS = await getDocs(query(postColRef, orderBy('postOrder')));
      let posts = [];
      dataSS.forEach((post) => {
        let postData = post.data();
        postData.id = post.id;
        posts.push(postData);
      });
      this.posts = posts
    },
  },
  created() {
    let forumId = this.$route.params.forumId
    let id;
    this.forumId = forumId;
    console.log(this.forumId);
    localStorage.setItem("id", forumId);
    console.log(localStorage.getItem(id));
    this.getForum();
    this.fetchPost();
  }
}
</script>
