<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pb-12 md:pb-20">

        <!-- Video image -->
        <div class="text-center" data-aos="fade-down">
          <div class="relative inline-flex justify-center items-center">
            <img src="../images/video-testimonial.jpg" width="1024" height="576" alt="Video testimonial" />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900" aria-hidden="true"></div>
            <a class="absolute group" @click.prevent.stop="videoModalOpen = true" href="#0" aria-controls="modal">
              <svg class="w-16 h-16 sm:w-20 sm:h-20 hover:opacity-75 transition duration-150 ease-in-out" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient x1="78.169%" y1="9.507%" x2="24.434%" y2="90.469%" id="a">
                    <stop stop-color="#EBF1F5" stop-opacity=".8" offset="0%" />
                    <stop stop-color="#EBF1F5" offset="100%" />
                  </linearGradient>
                </defs>
                <circle fill="url(#a)" cx="44" cy="44" r="44" />
                <path class="fill-current text-indigo-500" d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z" />
              </svg>
            </a>
          </div>

          <!-- Modal -->
          <Modal id="modal" ariaLabel="modal-headline" :show="videoModalOpen" @handleClose="videoModalOpen = false">
            <div class="relative pb-9/16">
              <iframe class="absolute w-full h-full" src="https://www.youtube.com/embed/qz4F1uMzihY" title="Video" allowFullScreen></iframe>
            </div>
          </Modal>          

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Modal from './../utils/Modal.vue'

export default {
  name: 'VideoTestimonial',
  components: {
    Modal
  },
  data: function () {
    return {
      videoModalOpen: false
    }
  },  
}
</script>