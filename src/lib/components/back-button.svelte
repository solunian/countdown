<script lang="ts">
  let { onclick } = $props();
</script>


<button
  class="generate-glow rounded-xl stroke-gray-950 p-3 outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:stroke-gray-50 hover:outline-none focus:bg-gray-950 focus:stroke-gray-50 focus:outline-none"
  aria-label="back"
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
      d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
  </svg>
</button>