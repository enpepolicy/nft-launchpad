<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page illustration -->
      <div class="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
        <PageIllustration />
      </div>

      <!-- Page sections -->
      <HeroHelp />
      <HelpList />
      <RelatedLinks />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import PageIllustration from './../partials/PageIllustration.vue'
import HeroHelp from './../partials/HeroHelp.vue'
import HelpList from './../partials/HelpList.vue'
import RelatedLinks from './../partials/RelatedLinks.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'Help',
  components: {
    Header,
    PageIllustration,
    HeroHelp,
    HelpList,
    RelatedLinks,
    Footer,
  },  
};
</script>
