<template>
  <div class="home" style="margin-top:10px;">
    <br />
    <h1 class="title is-1"
      style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">Thread
    </h1>
  </div>
<h1 style="text-align:center; font-family: 'Verdana'; color:red"> <b>THREAD ARCHIVED</b></h1>
  <br />

  <div class="box" style="position:absolute; left:300px;">
    <div class="card" style="width:1000px; display:flex; margin-bottom:50px">
      <div class="card-image is-rounded" style="align-items:center">
        <img :src="forumInfo.imageThread" onerror="this.style.display='none'"
          style="width:400px;height:400px; object-fit: cover" />
      </div>

      <div class="card-content">
        <h5>#{{ forumId }}</h5>
        <h5 class="title is-3">{{ forumInfo.Title }}</h5>
        <div class="content">
          <p class="subtitle is-5">{{ forumInfo.Description }}</p>
        </div>

      </div>
    </div>

    <div class="All Post" style="margin-top:10px;">
      <br />
      <h2 class="title is-1"
        style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:40px; margin-bottom:20px">All Post
        :</h2>
    </div>

    <div class="card" style="display:flex; margin-bottom:20px" v-for="post in posts" :key="post.id">
      <div class="card-image is-rounded">
        <img :src="post.imagepost" onerror="this.style.display='none'" style="width:200px;height:200px; object-fit: cover"/>
      </div>
      <div class="card-content">
        <div class="reply" style="margin-bottom:20px; ">
          #{{ post.id }}
          <br/>
          <div style="color:#1C98F7">
             <router-link :to="{path: `/archived/${forumId}/${post.replyTo}`}">{{post.replyTo}}</router-link>
             </div>
        </div>
        <h2 class="subtitle is-4">{{ post.post }}</h2>

        <div style="margin-top:70px;">
          <p>created: {{post.postOrder}}</p>
        </div>
        <br/>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import forColRef from "../firebase";
import { getDoc, getDocs, doc, setDoc, query, orderBy } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import db from "../firebase";
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      forums: [],
      selectedDoc: {},
      docRef: {},
      postdocRef: {},
      forumId: null,
      search: "",
      forumInfo: {
        Title: "",
        Description: "",
        imageThread: null,
      },
      posts: [],
    }
  },
  methods: {
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
        let date= postData.postOrder.toDate();
        postData.postOrder = moment(date).fromNow();
        posts.push(postData);
      });
      this.posts = posts
    },
  },
  created() {
    let forumId = this.$route.params.forumId
    let id;
    this.forumId = forumId;
    console.log(this.forumId);
    localStorage.setItem("id", forumId);
    console.log(localStorage.getItem(id));
    this.getForum();
    this.fetchPost();
  }
}
</script>
