import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Testimonials from './pages/Testimonials.vue'
import Blog from './pages/Blog.vue'
import BlogPost from './pages/BlogPost.vue'
import About from './pages/About.vue'
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
      path: '/testimonials',
      component: Testimonials
    },
    {
      path: '/blog',
      component: Blog
    },
    {
      path: '/blog-post',
      component: BlogPost
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/help',
      component: Help
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    }
  ]
})

export default router
