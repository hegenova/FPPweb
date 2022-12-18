<template>
  <div class="home" style="margin-top:10px;">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Ghibahin
    </h1>
  </div>


  
  <button @click="reverseOrder" id="reverse" class="button is-primary">reverse the order</button>
  <div class="columns is-centered" id="search1" style="margin-top:40px; margin-bottom:30px">
    <input class="input is-rounded" id="search2" style="width:500px" type="text" v-model="search" name="search"
      placeholder="search thread...">
  </div>
  <div class="box" style="position:absolute; left:300px; ">
    <body>
    <div class="card" style="width:1000px; display:flex; margin-bottom:50px" v-for="forum in filteredItems"
      :key="forum.id">
      <div class="card-image is-rounded" style="align-items:center">
        <img :src="forum.imageThread" onerror="this.style.display='none'"
          style="width:400px;height:400px; object-fit: cover"  />
      </div>

      <div class="card-content">
        <h5>#{{ forum.id }} </h5>
        <h5 class="title is-3" id="title">{{ forum.Title }}</h5>
        <div class="content">
          <p class="subtitle is-5" id="desc">{{ forum.Description }}</p>
        </div>

        <div style="position:absolute;top:300px">
          <h5>reply amount: {{ forum.postOrder }}</h5>
          <p>at {{forum.createdOrder}}</p>
          <router-link href="#" id="viewthread" class="button is-info" :to="{ path: `/thread/${forum.id}` }">view thread</router-link>
        </div>
      </div>
      <div style="position:absolute; left:800px; top:20px">
        <h5>Last Reply: </h5>
        <br />
        <div class="box" style="max-width:180px">
          <img :src="forum.imagepost" onerror="this.style.display='none'" class="image is-128x128"
            style="object-fit:cover; margin-bottom:10px;" />

          <h2> {{ forum.post }}</h2>
        </div>


      </div>

    </div>
</body>
    
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import url('https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap');
.darkmode--activated .box, .darkmode--activated .card, .darkmode--activated .card-content, .darkmode--acivated .content{
    background-color:black;
    color:white;
}
.darkmode--activated #title{
  color:white
}
.darkmode--activated #desc{
  color:white
}
.darkmode--activated #viewthread, .darkmode--acivated #logohome{
  background-color:rgb(227, 103, 8);
}
.darkmode--activated #search2{
  background-color:rgb(227, 103, 8);;
  border-color: black;
}
.darkmode--activated ::placeholder{
  color:white;
}
.darkmode--activated #reverse{
  background-color:rgb(219, 63, 63)
}
/* .darkmode-layer, .darkmode-toggle {
} */
</style>

<script>
// @ is an alias to /src
import moment from "moment";
import Darkmode from 'darkmode-js';
import FetchForum from "../services/FetchForum";
import forColRef from "../firebase";
import { getDocs, getCountFromServer, getDoc, query, orderBy, doc, deleteDoc, limitToLast } from "firebase/firestore";
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      darkmode: "",
      reverseButton: "new",
      unreverseButton: "old",
      threadCount:"",
      forums: [],
      posts: [],
      lastPost: [],
      numberOfReply: [],
      selectedDoc: null,
      search: "",
    }
  },
  methods: {
    darkMode(){
      this.darkmode.toggle();
      var element = document.body;
      element.classList.toggle("dark-mode");
    },
    reverseOrder(){
      this.forums = this.forums.reverse();
    },
    async fetchData() {
      let dataSS = await getDocs(query(forColRef, orderBy('createdOrder'), limitToLast(5)));
      let forums = [];
      dataSS.forEach((forum) => {
        let forumData = forum.data();
        let date= forumData.createdOrder.toDate();
        forumData.createdOrder = moment(date).fromNow();
        forumData.id = forum.id;
        forums.push(forumData);
      });
      this.forums = forums
    },
    neutralize(){
      if(this.forums.imagepost==null){
        this.forums.imagepost = ""
      }
      if (this.forums.imageThread==null){
        this.forums.imageThread = ""
      }
    },
    // async load(){
    //   const response = await FetchForum.fetch();
    //   this.response = response.data.message;
    //   console.log("hey")
    //   this.forums = response.data.data;
    // }
  },
  // mounted(){
  //   this.load()
  // },
  created() {
    new Darkmode().showWidget();

    this.fetchData();
    this.neutralize();
    console.log(this.forums);
  },
  computed: {
    filteredItems(){
      return this.forums.filter((item) => {
        this.search.toLowerCase();
          return item.Title.match(this.search) || item.Description.match(this.search) || item.id.match(this.search)
      })
    }
  }
}
</script>
