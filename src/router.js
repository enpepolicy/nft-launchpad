import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Testimonials from './pages/Testimonials.vue'
import NFTStore from './pages/NFTStore.vue'
import BlogPost from './pages/BlogPost.vue'
import CreateCollection from './pages/CreateCollection.vue'
import Contact from './pages/Contact.vue'
import Help from './pages/Help.vue'
import PageNotFound from './pages/PageNotFound.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      window.scroll({ top: 0 })
    } else {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
    }
  },
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/launch-collection',
      component: CreateCollection
    },
    {
      path: '/nft-store',
      component: NFTStore
    },
    {
      path: '/my-mystery-boxes',
      component: Testimonials
    },
    {
      path: '/my-nft',
      component: Contact
    },

    // TO-DO Remove
    {
      path: '/blog-post',
      component: BlogPost
    },
    {
      path: '/help',
      component: Help
    },

    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    },
  ]
})

export default router
