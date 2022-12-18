<template>
  
  <div class="home" style="margin-top:10px;margin-bottom:20px">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Add Thread
    </h1>
  </div>

  <form class="box" @submit.prevent="createForum" style="width:1000px;position:absolute; left:350px">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Title" v-model="dataInfo.Title">
      </div>
    </div>
  
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <input class="input" type="text" placeholder="Description Your Thread" v-model="dataInfo.Description">
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
  
    <button class="button is-primary" style="margin-top:10px;">Submit</button>
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
      image: "",
      addedDoc: '',
      threadInfo: {
        orderNow: null,
      },
      dataInfo: { 
      Title: '',
      Description: '',
      imageThread: '',
      createdOrder: '',
      replyAmount: null,
      imagepost: "",}
    }
  },
  methods: {
    async createForum() {
      console.log("creating forum...");
      this.dataInfo.imageThread=this.image;
      if(this.dataInfo.imageThread==null) {
        this.dataInfo.imageThread=""
      }
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
