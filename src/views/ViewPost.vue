<template>
  <div class="home" style="margin-top:10px;">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Thread
    </h1>
  </div>


  <br />

  <div class="box" style="position:absolute; left:300px;">

    <div class="All Post" style="margin-top:10px;">
      <br />
      <h2 class="title is-1"
        style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:40px; margin-bottom:20px">Replied Post
        :</h2>
    </div>

    <div class="card" style="display:flex; margin-bottom:20px">
      <div class="card-image is-rounded">
        <img :src="postInfo.imagepost" style=" width:400px;height:400px;" />
      </div>
      <div class="card-content">
        <div class="reply" style="margin-bottom:20px; ">
          #{{ postInfo.id }}
          <br/>
          <div style="color:#1C98F7">
             <router-link :to="{path: `/thread/${forumId}/${postInfo.replyTo}`}" @click="refreshOnReply">{{postInfo.replyTo}}</router-link>
             </div>
        </div>
        <h2 class="subtitle is-4" id="post">{{ postInfo.post }}</h2>
        <br/>
        <div style="position:absolute;top:150px">
          <router-link type="submit" id="input" class="button is-info" :to="{path: `/thread/replyPost/${postId}`}">reply</router-link>
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
.darkmode--activated #viewthread{
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
import forColRef from "../firebase";
import Darkmode from 'darkmode-js';
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
      postId: null,
      forumid: null,
      search: "",
      postInfo:  {
      replyTo: "",
      threadId: "",
      post: "",
      imagepost: "",
      postOrder: "",
      },
      posts: [],
    }
  },
  methods: {
      refreshOnReply(){
          this.$router.push(`/thread/${this.forumId}/${this.postInfo.replyTo}`)
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
        postData.id = post.id;
        posts.push(postData);
      });
      this.posts = posts
    },
    async getPost(){
    const postColRef = collection(db, `${this.forumId}/post`);
    let postRef = doc(postColRef, this.postId);
      this.docRef = postRef;
      let post = await getDoc(this.docRef);
      let postData = post.data();
      console.log(postData.imagepost)
      this.postInfo.id = this.postId;
      this.postInfo.replyTo = postData.replyTo;
      this.postInfo.threadId = postData.threadId;
      this.postInfo.post = postData.post;
      this.postInfo.imagepost = postData.imagepost;
      this.postInfo.postOrder = postData.postOrder;
    },
  },
  created() {
      new Darkmode().showWidget();
    let forumId = this.$route.params.forumId
    this.forumId = forumId
    let postId = this.$route.params.postId
    this.postId = postId
    this.postId=postId
    this.getPost();
    console.log(this.postInfo.id)
  }
}
</script>
