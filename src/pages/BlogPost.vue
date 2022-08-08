<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <BlogSingle />
      <RelatedPosts />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import BlogSingle from './../partials/BlogSingle.vue'
import RelatedPosts from './../partials/RelatedPosts.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'BlogPost',
  components: {
    Header,
    BlogSingle,
    RelatedPosts,
    Footer,
  },
};
</script>
