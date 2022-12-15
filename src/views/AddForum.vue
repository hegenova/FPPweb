<template>
  <div class="home">
    <br/>
    <h1>/vue/ vueJS based forum site</h1>
  </div>
  <form @submit.prevent="createForum">
  <div class="form-group">
    <label for="formGroupExampleInput">Title</label>
    <input type="text" class="form-control"  placeholder="Title" v-model="dataInfo.Title">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Description</label>
    <input type="text" class="form-control" placeholder="Description" v-model="dataInfo.Description">
  </div>
  <div class="mb-3">
  <label for="formFile" class="form-label">Image</label>
  <input class="form-control" type="file" id="formFile" @change="onFileChange">
</div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</template>

<script>
// @ is an alias to /src
import forColRef from "../firebase";
import { addDoc, serverTimestamp, getDoc, setDoc, doc, getCountFromServer, deleteDoc, collection } from "firebase/firestore";
import db from "../firebase";
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      createdOrder: 0,
      image: null,
      addedDoc: '',
      threadInfo: {
        orderNow: null,
      },
      dataInfo: { 
      Title: '',
      Description: '',
      imageThread: null,
      createdOrder: '',
      replyAmount: null,
      imageAmount: null,
      prevThread: null,
      imagepost: "",
      bumpOrder: '',}
    }
  },
  methods: {
    async createForum() {
      console.log("creating forum...");
      this.dataInfo.imageThread=this.image;
      this.dataInfo.createdOrder= serverTimestamp();
      const addedDoc = await addDoc(forColRef, this.dataInfo);
      console.log()
      this.addedDoc= addedDoc.id;
      alert("forum added");
      this.$router.push("/");
    },
     onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      console.log(this.image);
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
    removeImage: function (e) {
      this.image = '';
    }
  },
  created() {
    // this.getCreatedOrder();
  }
}
</script>
