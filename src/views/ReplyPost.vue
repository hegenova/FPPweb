<template>
  <div class="newPost" style="margin-top:10px;margin-bottom:20px">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Reply Post
    </h1>
  </div>

  <form class="box" @submit.prevent="createReplyPost" style="width:1000px;position:absolute; left:350px">
    <div class="field">
      <label class="label">Reply To:</label>
      <div class="control">
        <input class="input" type="text" placeholder="Post ID" v-model="postId" disabled>
      </div>
    </div>

    <div class="field">
      <label class="label">Post</label>
      <div class="control">
        <input class="input" type="text" placeholder="Post" v-model="postInfo.post">
      </div>
    </div>

    <div class="field">
      <label  class="label">Image</label>
      <div class="file">
        <label for="formFile"  class="file-label">
          <input class="input" type="file" id="formFile" @change="onFileChange">
        </label>
      </div>
    </div>
  
    <button class="button is-primary" style="margin-top:10px;">Submit New Post</button>
  </form>
  
</template>

<script>
// @ is an alias to /src
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
      selectedDoc: null,
      replyPostid: null,
      search: "",
      postInfo: {
        post: "",
        imagepost: "",
        replyTo: "",
        threadId: "",
        postOrder: "",
      },
      adminMode: false,
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
      console.log(forumId)
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
    this.getThreadId();
    let postId = this.$route.params.postId;
    this.postId = postId;
  }
}
</script>
