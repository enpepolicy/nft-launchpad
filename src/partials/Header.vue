<template>
  <header class="absolute w-full z-30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-20">

        <!-- Site branding -->
        <div class="shrink-0 mr-5">
          <!-- Logo -->
          <router-link to="/" class="block" aria-label="Cruip">
            
            <img class="" src="../images/favicon.png" width="70" height="60" style="max-width: 84.33%;" alt="Features illustration" />
          </router-link>
        </div>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex md:grow">

          <!-- Desktop menu links -->
          <ul class="flex grow flex-wrap items-center font-medium">
            <li>
              <router-link to="/about" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out">About</router-link>
            </li>
            <li>
              <router-link to="/blog" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out">Blog</router-link>
            </li>
            <li>
              <router-link to="/testimonials" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out">Testimonials</router-link>
            </li>
            <!-- 1st level: hover -->
            <Dropdown title="Resources">
              <li>
                <router-link to="/help" class="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-500 flex py-2 px-4 leading-tight">Help center</router-link>
              </li>
              <li>
                <router-link to="/404" class="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-500 flex py-2 px-4 leading-tight">404</router-link>
              </li>
            </Dropdown>
          </ul>

          <!-- Desktop lights switch -->
          <div class="form-switch flex flex-col justify-center mx-3">
            <input type="checkbox" name="light-switch" id="light-switch-desktop" v-model="darkMode" class="light-switch sr-only" />
            <label class="relative" for="light-switch-desktop">
              <span class="relative bg-gradient-to-t from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 shadow-sm z-10" aria-hidden="true"></span>
              <svg class="absolute inset-0" width="44" height="24" viewBox="0 0 44 24" xmlns="http://www.w3.org/2000/svg">
                <g class="fill-current text-white" fill-rule="nonzero" opacity=".88">
                  <path d="M32 8a.5.5 0 00.5-.5v-1a.5.5 0 10-1 0v1a.5.5 0 00.5.5zM35.182 9.318a.5.5 0 00.354-.147l.707-.707a.5.5 0 00-.707-.707l-.707.707a.5.5 0 00.353.854zM37.5 11.5h-1a.5.5 0 100 1h1a.5.5 0 100-1zM35.536 14.829a.5.5 0 00-.707.707l.707.707a.5.5 0 00.707-.707l-.707-.707zM32 16a.5.5 0 00-.5.5v1a.5.5 0 101 0v-1a.5.5 0 00-.5-.5zM28.464 14.829l-.707.707a.5.5 0 00.707.707l.707-.707a.5.5 0 00-.707-.707zM28 12a.5.5 0 00-.5-.5h-1a.5.5 0 100 1h1a.5.5 0 00.5-.5zM28.464 9.171a.5.5 0 00.707-.707l-.707-.707a.5.5 0 00-.707.707l.707.707z" />
                  <circle cx="32" cy="12" r="3" />
                  <circle fill-opacity=".4" cx="12" cy="12" r="6" />
                  <circle fill-opacity=".88" cx="12" cy="12" r="3" />
                </g>
              </svg>
              <span class="sr-only">Switch to light / dark version</span>
            </label>
          </div>

          <!-- Desktop CTA on the right -->
          <ul class="flex justify-end flex-wrap items-center">
            <ConnectButton />
          </ul>

        </nav>

        <!-- Mobile menu -->
        <div class="inline-flex md:hidden">

          <!-- Mobile lights switch -->
          <div class="form-switch flex flex-col justify-center mr-6 -mt-0.5">
            <input type="checkbox" name="light-switch" id="light-switch-mobile" v-model="darkMode" class="light-switch sr-only" />
            <label class="relative" for="light-switch-mobile">
              <span class="relative bg-gradient-to-t from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 shadow-sm z-10" aria-hidden="true"></span>
              <svg class="absolute inset-0" width="44" height="24" viewBox="0 0 44 24" xmlns="http://www.w3.org/2000/svg">
                <g class="fill-current text-white" fill-rule="nonzero" opacity=".88">
                  <path d="M32 8a.5.5 0 00.5-.5v-1a.5.5 0 10-1 0v1a.5.5 0 00.5.5zM35.182 9.318a.5.5 0 00.354-.147l.707-.707a.5.5 0 00-.707-.707l-.707.707a.5.5 0 00.353.854zM37.5 11.5h-1a.5.5 0 100 1h1a.5.5 0 100-1zM35.536 14.829a.5.5 0 00-.707.707l.707.707a.5.5 0 00.707-.707l-.707-.707zM32 16a.5.5 0 00-.5.5v1a.5.5 0 101 0v-1a.5.5 0 00-.5-.5zM28.464 14.829l-.707.707a.5.5 0 00.707.707l.707-.707a.5.5 0 00-.707-.707zM28 12a.5.5 0 00-.5-.5h-1a.5.5 0 100 1h1a.5.5 0 00.5-.5zM28.464 9.171a.5.5 0 00.707-.707l-.707-.707a.5.5 0 00-.707.707l.707.707z" />
                  <circle cx="32" cy="12" r="3" />
                  <circle fill-opacity=".4" cx="12" cy="12" r="6" />
                  <circle fill-opacity=".88" cx="12" cy="12" r="3" />
                </g>
              </svg>
              <span class="sr-only">Switch to light / dark version</span>
            </label>
          </div>

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
                    <router-link to="/about" class="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2">About</router-link>
                  </li>
                  <li>
                    <router-link to="/blog" class="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2">Blog</router-link>
                  </li>
                  <li>
                    <router-link to="/testimonials" class="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2">Testimonials</router-link>
                  </li>
                  <li class="py-2 my-2 border-t border-b border-gray-200 dark:border-gray-800">
                    <span class="flex text-gray-600 dark:text-gray-400 py-2">Resources</span>
                    <ul class="pl-4">
                      <li>
                        <router-link to="/help" class="text-sm flex font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 py-2">Help center</router-link>
                      </li>
                      <li>
                        <router-link to="/404" class="text-sm flex font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 py-2">404</router-link>
                      </li>
                    </ul>
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