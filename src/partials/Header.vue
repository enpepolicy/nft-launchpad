<template>
  <header class="absolute w-full z-30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-end justify-between h-20">

        <!-- Site branding -->
        <div class="shrink-0 mr-5">
          <!-- Logo -->
          <router-link to="/" class="flex items-end" aria-label="Cruip">
            <img class="" src="../images/favicon.png" width="70" height="60" style="max-width: 84.33%;" alt="Features illustration" />
            <div class="flex items-baseline">
              <span class="text-white text-3xl font-red-hat-display font-black">NFT</span>
              <span class="text-indigo-500 text-sm font-red-hat-display font-bold">Launchpad</span>
            </div>
          </router-link>
        </div>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex md:grow justify-end">

          <!-- Desktop menu links -->
          <ul class="flex flex-wrap font-medium items-end pr-4 justify-end text-sm xl:text-lg">
            <li>
              <router-link to="/launch-collection" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out">Launch Collection</router-link>
            </li>
            <li>
              <router-link to="/nft-store" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out">NFT Store</router-link>
            </li>
            <li>
              <router-link to="/my-mystery-boxes" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out">My Mystery Boxes</router-link>
            </li>
            <li>
              <router-link to="/my-nft" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out">My NFT's</router-link>
            </li>
          </ul>

          <!-- Desktop CTA on the right -->
          <ul class="flex justify-end flex-wrap items-center">
            <ConnectButton />
          </ul>

        </nav>

        <!-- Mobile menu -->
        <div class="inline-flex md:hidden">

          <!-- Hamburger button -->
          <button class="hamburger" ref="hamburger" :class="{ active: mobileNavOpen }" aria-controls="mobile-nav" :aria-expanded="mobileNavOpen" @click="mobileNavOpen = !mobileNavOpen">
            <span class="sr-only">Menu</span>
            <svg class="w-6 h-6 fill-current text-gray-900 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>
          </button>

          <!-- Mobile navigation -->
          <transition
            enter-active-class="transition ease-out duration-200 transform"
            enter-from-class="opacity-0 -translate-x-full"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition ease-out duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <nav v-show="mobileNavOpen" id="mobile-nav" ref="mobileNav" class="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg no-scrollbar">
              <div class="py-6 pr-4 pl-20">
                <!-- Logo -->
                <img class="pb-5" src="../images/favicon.png" width="70" height="60" style="max-width: 84.33%;" alt="Features illustration" />
                <!-- Links -->
                <ul>
                  <li>
                    <router-link to="/create-collection" class="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2">Create Collection</router-link>
                  </li>
                  <li>
                    <router-link to="/nft-store" class="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2">NFT Store</router-link>
                  </li>
                  <li>
                    <router-link to="/my-mystery-boxes" class="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2">My Mystery Boxes</router-link>
                  </li>
                  <li>
                    <router-link to="/my-nft" class="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2">My NFT's</router-link>
                  </li>
                  <ConnectButton class="mt-6"/>
                </ul>
              </div>
            </nav>
          </transition>

        </div>

      </div>
    </div>
  </header>
</template>

<script>
import Dropdown from './../utils/Dropdown.vue'
import ConnectButton from './ConnectButton.vue';

export default {
  name: 'Header',
  components: {
    Dropdown,
    ConnectButton,
  },
  data: function () {
    return {
      mobileNavOpen: false,
      darkMode: this.handleLights()
    }
  },
  methods: {
    clickOutside(e) {
      if (!this.mobileNavOpen || this.$refs.mobileNav.contains(e.target) || this.$refs.hamburger.contains(e.target)) return
      this.mobileNavOpen = false
    },
    keyPress() {
      if (!this.mobileNavOpen || event.keyCode !== 27) return
      this.mobileNavOpen = false
    },
		handleLights: function() {
			const dark = localStorage.getItem('dark-mode')
			if (dark === null) {
				return true
			} else {
				return dark === 'true'
			}
		}
  },
	watch: {
		darkMode() {
      localStorage.setItem('dark-mode', this.darkMode)
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
		}
	},
  mounted() {
    document.addEventListener('click', this.clickOutside)    
    document.addEventListener('keydown', this.keyPress)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.clickOutside)
    document.removeEventListener('keydown', this.keyPress)
  }
};
</script>