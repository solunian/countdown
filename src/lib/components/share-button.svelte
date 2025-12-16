            <script lang="ts">
  let { onclick } = $props();
</script>

            
            <button
              class="generate-glow rounded-xl stroke-gray-950 p-3 outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:stroke-gray-50 hover:outline-none focus:bg-gray-950 focus:stroke-gray-50 focus:outline-none"
              aria-label="share"
              {onclick}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
            </button>