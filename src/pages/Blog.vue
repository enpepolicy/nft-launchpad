<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroBlog />
      <FeaturedPosts />
      <BlogList />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import HeroBlog from './../partials/HeroBlog.vue'
import FeaturedPosts from './../partials/FeaturedPosts.vue'
import BlogList from './../partials/BlogList.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'Blog',
  components: {
    Header,
    HeroBlog,
    FeaturedPosts,
    BlogList,
    Footer,
  },
};
</script>
