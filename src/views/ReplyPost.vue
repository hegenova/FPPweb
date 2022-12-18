<template>
  <div class="newPost" style="margin-top:10px;margin-bottom:20px">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Reply Post
    </h1>
  </div>

  <form class="box" @submit.prevent="createReplyPost" style="width:1000px;position:absolute; left:350px">
    <div class="field">
      <label class="label">Reply To: #{{postId}}</label>
      <div v-if="getPostInfo.imagepost"><img :src="getPostInfo.imagepost"  style="width:200px;height:200px; object-fit: cover"/></div>
      <div>{{ getPostInfo.post }}</div>
    </div>

    <div class="field">
      <label class="label">Post</label>
      <div class="control">
        <input class="input" id="input3" type="text" placeholder="Post" v-model="postInfo.post">
      </div>
    </div>

    <div class="field">
      <label  class="label">Image</label>
      <div class="file">
        <label for="formFile"  class="file-label">
          <input class="input" type="file" id="input2" @change="onFileChange">
        </label>
        <div v-if="image" style=" width:400px;height:400px; object-fit: cover">
        <img :src="image"/>
        </div>
      </div>
    </div>
  
    <button class="button is-primary" id="input" style="margin-top:10px;">Submit New Post</button>
  </form>
  
</template>

<script>
// @ is an alias to /src
import Darkmode from 'darkmode-js'
import forColRef from "../firebase";
import { getDocs, getDoc, setDoc, serverTimestamp, getCountFromServer, addDoc, doc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import db from "../firebase";
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      postId: "",
      forums: [],
      image: null,
      forumId: null,
      search: "",
      postInfo: {
        post: "",
        imagepost: "",
        replyTo: "",
        threadId: "",
        postOrder: "",
      },
      getPostInfo: {
        post: "",
        imagepost: "",
        replyTo: "",
        threadId: "",
        postOrder: "",
      }
    }
  },
  methods: {
    async addLastPost(){
    console.log("adding last post")
    let postColRef = collection(db, `${this.forumId}/post`);
    let ss = await getCountFromServer(postColRef);
    this.postInfo.postOrder = ss.data().count+1;
    console.log(this.postInfo.postOrder)
    const lastColRef = doc(db, this.forumId)
    await setDoc(lastColRef,this.postInfo, {merge: true});
    console.log("lastPost created");
    this.$router.push("/");
    },
    async getThreadId() {
      console.log("in getthreadId()")
      let forumId = localStorage.getItem("id");
      this.forumId = forumId;
      localStorage.clear();
    },
    async createReplyPost() {
      this.postInfo.imagepost=this.image;
      if (this.image==null){
        this.postInfo.imagepost=""
      }
      this.postInfo.postOrder= serverTimestamp();
      this.addLastPost();
      this.postInfo.replyTo=this.postId;
      console.log("in createReplyPost()")
      var postColRef = collection(db, `${this.forumId}/post`);
      console.log("creating post...");
      const addedDoc = await addDoc(postColRef,this.postInfo);
      alert("post added");
      this.$router.push("/");
    },
    async getPost(){
    const postColRef = collection(db, `${this.forumId}/post`);
    //this.postId=this.$route 
    //console.log(this.forumId)
    let postRef = doc(postColRef, this.postId);
      this.docRef = postRef;
      let post = await getDoc(this.docRef);
      let postData = post.data();
      console.log(postData.imagepost)
      this.getPostInfo.id = this.postId;
      this.getPostInfo.replyTo = postData.replyTo;
      this.getPostInfo.threadId = postData.threadId;
      this.getPostInfo.post = postData.post;
      this.getPostInfo.imagepost = postData.imagepost;
      this.getPostInfo.postOrder = postData.postOrder;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      console.log(this.image)
      this.postInfo.imagepost=this.image;
    },
      createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  created() {
    new Darkmode().showWidget();
    this.getThreadId();
    let postId = this.$route.params.postId;
    this.postId = postId;
    this.getPost();
  }
}
</script>
