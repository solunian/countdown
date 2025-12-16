<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<!-- z = -10 -->
<div class="dark-shadow-glow absolute inset-0 -z-10 h-screen w-screen bg-gray-950 shadow-gray-950">
</div>

<div class="flex h-screen w-screen justify-center bg-transparent">
  <main
      class="light-shadow-glow min-h-1/2 m-auto w-4/5 rounded-xl border-none bg-gray-50 px-8 py-7 shadow-gray-50 sm:w-3/4 md:w-2/3 lg:w-1/2">
      {@render children()}
    </main>
</div>

