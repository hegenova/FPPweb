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
        <input class="input" id="input" type="text" placeholder="Title" v-model="dataInfo.Title">
      </div>
    </div>
  
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <input class="input" id="input2" type="text" placeholder="Description Your Thread" v-model="dataInfo.Description">
      </div>
    </div>

    <div class="field">
      <label  class="label">Image</label>
      <div class="file">
        <label for="formFile"  class="file-label">
          <input class="input" type="file" id="input3" @change="onFileChange">
        </label>
        <div v-if="image" style=" width:400px;height:400px; object-fit: cover">
        <img :src="image"/>
        </div>
      </div>
    </div>
    <button class="button is-primary" id="submit" style="margin-top:10px;">Submit</button>
  </form>
</template>
<style>
.darkmode--activated .box, .darkmode--activated .card, .darkmode--activated .card-content, .darkmode--activated .content, .darkmode--activated .label{
    background-color:black;
    color:white;
}
.darkmode--activated #title{
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
}</style>>

<script>
// @ is an alias to /src
import Darkmode from 'darkmode-js';
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
      console.log(this.image)
      this.dataInfo.imageThread=this.image;
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
    // this.getCreatedOrder();
    new Darkmode().showWidget();
  }
}
</script>
