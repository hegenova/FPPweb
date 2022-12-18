<template>
  <div class="home" style="margin-top:10px;">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Thread
    </h1>
  </div>

<button @click="reverseOrder" id="reverse" class="button is-primary">reverse the order</button>

  <br />

  <div class="box" style="position:absolute; left:300px;">
    <div class="card" style="width:1000px; display:flex; margin-bottom:50px">
      <div class="card-image is-rounded" style="align-items:center">
        <img :src="forumInfo.imageThread" onerror="this.style.display='none'"
          style="width:400px;height:400px; object-fit: cover" />
      </div>

      <div class="card-content">
        <h5>#{{ forumId }}</h5>
        <h5 class="title is-3" id="title">{{ forumInfo.Title }}</h5>
        <div class="content">
          <p class="subtitle is-5" id="desc">{{ forumInfo.Description }}</p>
        </div>

        <div style="position:absolute;top:300px">
          <router-link type="submit" id="input3" class="button is-info" :to="{ path: `/thread/newpost/${this.forumId}` }">New
            Post</router-link>
        </div>
      </div>
    </div>

    <div class="All Post" style="margin-top:10px;">
      <br />
      <h2 class="title is-1"
        style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:40px; margin-bottom:20px">All Post
        :</h2>
    </div>

    <div class="card" style="display:flex; margin-bottom:20px" v-for="post in posts" :key="post.id">
      <div class="card-image is-rounded">
        <img :src="post.imagepost" onerror="this.style.display='none'" style="width:200px;height:200px; object-fit: cover"/>
      </div>
      <div class="card-content">
        <div class="reply" style="margin-bottom:20px; ">
          #{{ post.id }}
          <br/>
          <div style="color:#1C98F7">
             <router-link :to="{path: `/thread/${forumId}/${post.replyTo}`}">{{post.replyTo}}</router-link>
             </div>
        </div>
        <h2 class="subtitle is-4" id="post">{{ post.post }}</h2>
        <br/>
        <div style="margin-top:50px">
        <p>created: {{post.postOrder}}</p>
        </div>
        <br/>
        <div style="position:absolute;top:150px">
          <router-link type="submit" class="button is-info" id="input2" :to="{path: `/thread/replyPost/${post.id}`}">reply</router-link>
        </div>
      </div>
    </div>

  </div>
</template>
<style>
.darkmode--activated .box, .darkmode--activated .card, .darkmode--activated .card-content, .darkmode--activated .content, .darkmode--activated .label{
    background-color:black;
    color:white;
}
.darkmode--activated #title, .darkmode--activated #post{
  color:white
}
.darkmode--activated #desc{
  color:white
}
.darkmode--activated #viewthread, .darkmode--activated #navbar, .darkmode--activated #navbar2, .darkmode--activated .nav{
  background-color:rgb(227, 103, 8);
}
.darkmode--activated #search2, .darkmode--activated #input, .darkmode--activated #input2, .darkmode--activated #input3{
  background-color:rgb(227, 103, 8);;
  border-color: black;
}
.darkmode--activated ::placeholder{
  color:black;
}
.darkmode--activated #reverse, .darkmode--activated #submit{
  background-color:rgb(219, 63, 63)
}
</style>

<script>
// @ is an alias to /src
import Darkmode from 'darkmode-js';
import moment from "moment";
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
      test: 5,
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
    }
  },
  methods: {
    reverseOrder(){
      this.posts = this.posts.reverse();
    },
    savePostId(postId){
      localStorage.setItem("postId", postId);
    },
    async getForum() {
      let forRef = doc(forColRef, this.forumId);
      this.docRef = forRef;
      let forum = await getDoc(this.docRef);
      let forumData = forum.data();
      this.forumInfo.Title = forumData.Title;
      this.forumInfo.Description = forumData.Description;
      this.forumInfo.imageThread = forumData.imageThread;
    },
    async fetchPost() {
      const postColRef = collection(db, `${this.forumId}/post`);
      let dataSS = await getDocs(query(postColRef, orderBy('postOrder')));
      let posts = [];
      dataSS.forEach((post) => {
        let postData = post.data();
        let date= postData.postOrder.toDate();
        postData.postOrder = moment(date).fromNow();
        postData.id = post.id;
        posts.push(postData);
      });
      this.posts = posts
    },
  },
  created() {
    new Darkmode().showWidget();
    let forumId = this.$route.params.forumId
    let id;
    this.forumId = forumId;
    localStorage.setItem("id", forumId);
    this.getForum();
    this.fetchPost();
  }
}
</script>
