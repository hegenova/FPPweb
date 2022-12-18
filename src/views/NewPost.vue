<template>
  <div class="newPost" style="margin-top:10px;margin-bottom:20px">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Create Post
    </h1>
  </div>

  <form class="box" @submit.prevent="createPost" style="width:1000px;position:absolute; left:350px">
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
