<template>
  <div class="home">
    <br/>
    <h1>/vue/ vueJS based forum site</h1>
  </div>
  <form @submit.prevent="createReplyPost">
      <div class="form-group">
    <label for="formGroupExampleInput2">Reply to:  </label>
    <input type="text" class="form-control" v-model="postId" placeholder="post ID">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Post</label>
    <input type="text" class="form-control" v-model="postInfo.post" placeholder="post">
  </div>
  <div class="mb-3">
  <label for="formFile" class="form-label">Image</label>
  <input class="form-control" type="file" @change="onFileChange">
</div>
  <button type="submit" class="btn btn-primary">Submit new post</button>
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
    async deleteForum(forumID) {
      let forumRef = doc(forColRef, forumID);
      await deleteDoc(forumRef);
      this.$router.go();
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
