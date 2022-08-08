<template>
  <section class="relative border-t border-transparent dark:border-gray-800">
    <!-- Background gradient -->
    <div class="absolute inset-0 h-128 dark:opacity-25 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 pointer-events-none" aria-hidden="true"></div>
    <!-- End background gradient -->
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-12 md:py-20">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h2 class="h2 font-red-hat-display mb-4">Turn your ideas into reality in seconds</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p>
        </div>

        <!-- Section content -->
        <div>
          <div class="grid lg:grid-cols-3 gap-12 lg:gap-6">

            <!-- Category buttons -->
            <div class="lg:col-span-1 lg:pr-16 flex flex-wrap justify-center lg:flex-col lg:justify-start -m-1 lg:mx-0">
              <button class="lg:w-full font-medium px-3 py-2 bg-white hover:bg-gray-50 shadow dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded flex items-center justify-center lg:justify-start m-1 lg:mx-0" :class="{ 'bg-teal-500 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-600 dark:bg-opacity-25 dark:hover:bg-opacity-25': category === '1' }" @click="category = '1'">
                <svg class="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" :class="category === '1' ? 'text-teal-200 dark:text-teal-400' : 'text-teal-500 dark:text-gray-400'" d="M5 16H4a4 4 0 01-4-4v-1h2v1a2 2 0 002 2h1v2zM13 10h-1.686l-1.207-1.207L14.37 4.63a2.121 2.121 0 00-3-3L7.207 5.793 5.99 4.576 5.98 3.02 3.038.079 0 3.117 3 6h1.586l1.207 1.207L4 9l3 3 1.793-1.793L10 11.414V13l3.01 3.01 2.98-2.979L13 10z" />
                </svg>
                <span :class="category === '1' ? 'text-white dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'">Getting Started</span>
              </button>
              <button class="lg:w-full font-medium px-3 py-2 bg-white hover:bg-gray-50 shadow dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded flex items-center justify-center lg:justify-start m-1 lg:mx-0" :class="{ 'bg-teal-500 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-600 dark:bg-opacity-25 dark:hover:bg-opacity-25': category === '2' }" @click="category = '2'">
                <svg class="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" :class="category === '2' ? 'text-teal-200 dark:text-teal-400' : 'text-teal-500 dark:text-gray-400'" d="M8 3l4 4H4zM8 13L4 9h8zM1 0h14v2H1zM1 14h14v2H1z" />
                </svg>
                <span :class="category === '2' ? 'text-white dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'">Collection list</span>
              </button>
              <button class="lg:w-full font-medium px-3 py-2 bg-white hover:bg-gray-50 shadow dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded flex items-center justify-center lg:justify-start m-1 lg:mx-0" :class="{ 'bg-teal-500 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-600 dark:bg-opacity-25 dark:hover:bg-opacity-25': category === '3' }" @click="category = '3'">
                <svg class="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" :class="category === '3' ? 'text-teal-200 dark:text-teal-400' : 'text-teal-500 dark:text-gray-400'" d="M6 0H1a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V1a1 1 0 00-1-1zM5 5H2V2h3v3zM15 9h-5a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1zm-1 5h-3v-3h3v3zM6 9H1a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1zm-1 5H2v-3h3v3zM12.5 7a1 1 0 01-.707-.293l-2.5-2.5a1 1 0 010-1.414l2.5-2.5a1 1 0 011.414 0l2.5 2.5a1 1 0 010 1.414l-2.5 2.5A1 1 0 0112.5 7z" />
                </svg>
                <span :class="category === '3' ? 'text-white dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'">Element Hierarchy</span>
              </button>
              <button class="lg:w-full font-medium px-3 py-2 bg-white hover:bg-gray-50 shadow dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded flex items-center justify-center lg:justify-start m-1 lg:mx-0" :class="{ 'bg-teal-500 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-600 dark:bg-opacity-25 dark:hover:bg-opacity-25': category === '4' }" @click="category = '4'">
                <svg class="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" :class="category === '4' ? 'text-teal-200 dark:text-teal-400' : 'text-teal-500 dark:text-gray-400'" d="M15.4.6c-.84-.8-2.16-.8-3 0L8.7 4.3c.73.252 1.388.68 1.916 1.244.469.515.83 1.119 1.065 1.775L15.4 3.6c.8-.84.8-2.16 0-3zM4.937 6.9c-1.2 1.2-1.4 5.7-1.4 5.7s4.4-.4 5.6-1.5a2.987 2.987 0 000-4.2 2.9 2.9 0 00-4.2 0z" />
                </svg>
                <span :class="category === '4' ? 'text-white dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'">Styling Basics</span>
              </button>
              <button class="lg:w-full font-medium px-3 py-2 bg-white hover:bg-gray-50 shadow dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded flex items-center justify-center lg:justify-start m-1 lg:mx-0" :class="{ 'bg-teal-500 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-600 dark:bg-opacity-25 dark:hover:bg-opacity-25': category === '5' }" @click="category = '5'">
                <svg class="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current" :class="category === '5' ? 'text-teal-200 dark:text-teal-400' : 'text-teal-500 dark:text-gray-400'" d="M11 16v-5h5V0H5v5H0v11h11zM2 7h7v7H2V7z" />
                </svg>
                <span :class="category === '5' ? 'text-white dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'">Image Field</span>
              </button>
            </div>

            <!-- Videos -->
            <div class="lg:col-span-2 max-w-sm mx-auto md:max-w-3xl lg:max-w-none">
              <div class="grid md:grid-cols-2 gap-6">
                <div v-show="['1'].includes(category)">
                  <div class="relative">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Using index pages</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">2 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['1', '2'].includes(category)">
                  <div class="relative flex justify-center items-center">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Working with content</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">4 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['1', '3'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Using cover pages</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">7 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['1', '4'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Intro to the style model</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">9 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['2', '5'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Exploring collections</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">12 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['2', '3'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Understand hierarchy</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">3 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['2', '4'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Customisations</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">11 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['3', '5'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Image galleries</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">6 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['5'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Sorting images</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">4 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="['5'].includes(category)">
                  <div class="relative flex justify-center items-center shadow">
                    <img class="w-full" src="../images/video-thumb.jpg" width="352" height="264" alt="Video thumbnail 01" />
                    <div class="absolute inset-0 flex flex-col">
                      <div class="grow flex justify-center items-center">
                        <a class="hover:opacity-75 transition duration-150 ease-in-out" href="#0">
                          <img src="../images/play-button.svg" width="72" height="72" alt="Play icon" />
                        </a>
                      </div>
                      <div class="w-full bottom-0 px-6 py-3 bg-white opacity-90 dark:bg-gray-900 flex justify-between items-center">
                        <a class="text-gray-900 dark:text-gray-400 font-medium" href="#0">Filters</a>
                        <div class="inline-flex px-3 py-1 text-xs font-medium text-white bg-gray-900 bg-opacity-50 dark:text-teal-400 dark:bg-teal-600 dark:bg-opacity-25 rounded-full">9 Min</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Tabs',
  data: function () {
    return {
      category: '1',
    }
  },
}
</script>