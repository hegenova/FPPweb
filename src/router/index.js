import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddForum from '../views/AddForum.vue'
import Thread from '../views/Thread.vue'
import Catalog from '../views/Catalog.vue'
import Post from '../views/NewPost.vue'
import ReplyPost from '../views/ReplyPost.vue'
import Archive from '../views/Archive.vue'
import ArchiveThread from '../views/ArchiveThread.vue'
import ViewPost from '../views/ViewPost.vue'
import ViewPostArchive from '../views/ViewPostArchive.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalog',
    name: 'catalog',
   component: Catalog
  },
  {
    path: '/AddForum',
    name: 'addForum',
    component: AddForum
  },
  {
    path: '/thread/:forumId',
    name: 'thread',
    component: Thread
  },
  {
    path: '/thread/newpost/:forumId',
    name: 'post',
    component: Post
  },
  {
    path: '/thread/replyPost/:postId',
    name: 'replypost',
    component: ReplyPost
  },
   { path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/archived/:forumId',
    name: 'archivedthread',
    component: ArchiveThread
  },
    {path: '/thread/:forumId/:postId',
    name: 'viewpost',
    component: ViewPost
  },
  {
    path: '/archived/:forumId/:postId',
    name: 'viewpostarchived',
    component: ViewPostArchive
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
