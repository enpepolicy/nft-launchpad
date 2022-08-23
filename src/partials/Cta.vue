<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">

      <!-- CTA box -->
      <div class="dark relative bg-gray-800 py-10 px-8 md:py-16 md:px-12">

        <!-- Background illustration -->
        <div class="absolute inset-0 left-auto  pointer-events-none" aria-hidden="true">
          <svg class="h-full" width="400" height="232" viewBox="0 0 400 232" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="39.386%" id="box-gr-a">
                <stop stop-color="#667EEA" offset="0%" />
                <stop stop-color="#667EEA" stop-opacity="0" offset="100%" />
              </radialGradient>
              <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="39.386%" id="box-gr-b">
                <stop stop-color="#3ABAB4" offset="0%" />
                <stop stop-color="#3ABAB4" stop-opacity="0" offset="100%" />
              </radialGradient>
            </defs>
            <g transform="translate(-85 -369)" fill="none" fill-rule="evenodd">
              <circle fill-opacity=".16" fill="url(#box-gr-a)" cx="413" cy="688" r="240" />
              <circle fill-opacity=".24" fill="url(#box-gr-b)" cx="400" cy="400" r="400" />
            </g>
          </svg>
        </div>

        <div class="relative flex flex-col lg:flex-row justify-between items-center">

          <!-- CTA content -->
          <div class="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
            <h3 class="h3 font-red-hat-display text-gray-100">Free until you’re ready to launch</h3>
          </div>

          <!-- CTA form -->
          <form class="w-full lg:w-1/2">
            <div class="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
              <input type="tel" class="form-input w-full mb-2 sm:mb-0 sm:mr-2" placeholder="Phone number" aria-label="Phone number" />
              <a class="btn text-white bg-indigo-500 hover:bg-indigo-400 shrink-0" href="#0">Request code</a>
            </div>
            <!-- Success message -->
            <!-- <p class="text-center lg:text-left lg:absolute mt-2 opacity-75 text-sm">Thanks for subscribing!</p> -->
          </form>

        </div>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Cta',
}
</script>