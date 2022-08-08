<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-12 md:py-20 border-t border-gray-200 dark:border-gray-800">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 class="h2 font-red-hat-display mb-4">Custom built ecosystem</h1>
          <p class="text-xl text-gray-600 dark:text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est.</p>
        </div>

        <!-- Custom animation -->
        <div class="max-w-3xl mx-auto">
          <div class="relative flex justify-center items-center overflow-hidden">

            <!-- Big circle behind: light layout -->
            <svg class="dark:hidden" width="432" height="432" viewBox="0 0 432 432" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="48.919%" id="prefix__a">
                  <stop stop-color="#B2F5EA" stop-opacity=".64" offset="0%" />
                  <stop stop-color="#B2F5EA" stop-opacity="0" offset="100%" />
                </radialGradient>
              </defs>
              <g fill="none" fill-rule="evenodd">
                <circle fill="url(#prefix__a)" cx="216" cy="216" r="216" />
                <g transform="translate(22 22)" stroke="#1D1D20">
                  <circle stroke-opacity=".04" cx="194" cy="194" r="193.5" />
                  <circle stroke-opacity=".08" stroke-width="2" cx="194" cy="194" r="153" />
                  <circle stroke-opacity=".16" stroke-width="2.5" cx="194" cy="194" r="112.75" />
                </g>
              </g>
            </svg>

            <!-- Big circle behind: dark layout -->
            <svg class="hidden dark:block" width="432" height="432" viewBox="0 0 432 432" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="50%" id="circleill_a">
                  <stop stop-color="#1D1D21" stop-opacity="0" offset="0%" />
                  <stop stop-color="#2E2E33" stop-opacity=".32" offset="100%" />
                </radialGradient>
              </defs>
              <circle cx="216" cy="216" r="216" fill="url(#circleill_a)" fill-rule="evenodd" />
            </svg>

            <!-- Moving tags -->
            <div class="absolute inset-0">
              <div class="absolute font-medium px-4 py-2 text-white dark:text-indigo-500 bg-gradient-to-tr from-indigo-500 to-indigo-400 dark:bg-indigo-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation mt-28">Custom Support</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-teal-500 bg-gradient-to-tr from-teal-500 to-teal-400 dark:bg-teal-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-1 mt-72">Components</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-pink-500 bg-gradient-to-tr from-pink-500 to-pink-400 dark:bg-pink-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-2 mt-40">Items</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-indigo-500 bg-gradient-to-tr from-indigo-500 to-indigo-400 dark:bg-indigo-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-3 mt-80 top-4">Tools</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-indigo-500 bg-gradient-to-tr from-indigo-500 to-indigo-400 dark:bg-indigo-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-4 mt-56">Development</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-pink-500 bg-gradient-to-tr from-pink-500 to-pink-400 dark:bg-pink-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-4">Project Settings</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-teal-500 bg-gradient-to-tr from-teal-500 to-teal-400 dark:bg-teal-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-5 mt-14">Tools & Widgets</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-purple-500 bg-gradient-to-tr from-purple-500 to-purple-400 dark:bg-purple-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-5 mt-80 top-4">Getting Started</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-indigo-500 bg-gradient-to-tr from-indigo-500 to-indigo-400 dark:bg-indigo-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-6 mt-40">Templates</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-indigo-500 bg-gradient-to-tr from-indigo-500 to-indigo-400 dark:bg-indigo-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-7">Frameworks</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-pink-500 bg-gradient-to-tr from-pink-500 to-pink-400 dark:bg-pink-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-7 mt-72">Custom UI</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-purple-500 bg-gradient-to-tr from-purple-500 to-purple-400 dark:bg-purple-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-8 mt-28">Layout & Design</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-teal-500 bg-gradient-to-tr from-teal-500 to-teal-400 dark:bg-teal-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-9 mt-80 top-4">Perks</div>
              <div class="absolute font-medium px-4 py-2 text-white dark:text-teal-500 bg-gradient-to-tr from-teal-500 to-teal-400 dark:bg-teal-500 dark:from-transparent dark:to-transparent dark:bg-opacity-25 rounded-full inline-flex items-center justify-center tags-animation tags-10 mt-56">Product & Design</div>
            </div>

            <!-- Inner cricle -->
            <svg class="absolute rounded-full shadow-xl" width="148" height="148" viewBox="0 0 148 148" xmlns="http://www.w3.org/2000/svg">
              <circle cx="74" cy="74" r="74" fill="#2E2E33" fill-rule="evenodd" />
            </svg>
            <!-- Logo -->
            <svg class="absolute w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="26%" y1="100%" x2="100%" y2="100%" id="logo_a">
                  <stop stop-color="#3ABAB4" offset="0%" />
                  <stop stop-color="#7F9CF5" offset="100%" />
                </linearGradient>
                <linearGradient x1="26%" y1="100%" x2="100%" y2="100%" id="logo_b">
                  <stop stop-color="#3ABAB4" offset="0%" />
                  <stop stop-color="#3ABAB4" stop-opacity="0" offset="100%" />
                </linearGradient>
              </defs>
              <path d="M32 16h-8a8 8 0 10-16 0H0C0 7.163 7.163 0 16 0s16 7.163 16 16z" fill="url(#logo_a)" />
              <path d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16h8a8 8 0 1016 0h8z" fill="url(#logo_b)" />
            </svg>
            <!-- Side gradients -->
            <div class="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-900" aria-hidden="true"></div>
            <div class="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-900" aria-hidden="true"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesAnimation',
}
</script>