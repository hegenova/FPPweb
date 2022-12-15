<template>
  <div class="home">
    <br/>
    <h1>/vue/ vueJS based forum site</h1>
  </div>
  <form @submit.prevent="createPost">
  <div class="form-group">
    <label for="formGroupExampleInput2">Post</label>
    <input type="text" class="form-control" v-model="postInfo.post" placeholder="post">
  </div>
  <div class="mb-3">
  <label for="formFile" class="form-label">Image</label>
  <input class="form-control" type="file" id="formFile" @change="onFileChange">
</div>
  <button type="submit" class="btn btn-primary">Submit new post</button>
</form>
</template>

<script>
// @ is an alias to /src
import forColRef from "../firebase";
import db from "../firebase";
import { addDoc, doc, getCountFromServer, serverTimestamp, setDoc, deleteDoc } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      forumId: "",
      image: null,
      postInfo:  {
      replyTo: "",
      threadId: "",
      post: "",
      imagepost: "",
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
    async createPost() {
      this.postInfo.imagepost=this.image;
      if (this.image==null){
        this.postInfo.imagepost=""
      }
      this.postInfo.postOrder= serverTimestamp();
      this.addLastPost();
      let postColRef = collection(db, `${this.forumId}/post`);
      console.log("creating post...");
      await addDoc(postColRef,this.postInfo);
      alert("post added");
      this.$router.push("/");
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      console.log(this.image)
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
    let forumId = this.$route.params.forumId
    this.forumId = forumId;
    this.postInfo.threadId = forumId;
  }
}
</script>
