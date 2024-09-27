<script lang="ts">
  let percentage = $state(1);
  let percentage_bar: HTMLDivElement;

  $effect(() => {
    percentage_bar.style.height = `${percentage * 100}vh`;

    const tick = setInterval(() => {
      percentage += 0.0001;
    }, 1);

    if (percentage >= 1) {
      clearInterval(tick);
    }

    return () => {
      clearInterval(tick);
    };
  });
</script>

<div class="flex h-screen w-screen justify-center bg-transparent">
  <main
    class="light-shadow-glow m-auto h-1/2 w-4/5 rounded-xl border-none bg-gray-50 p-4 shadow-gray-50 sm:w-3/4 md:w-2/3 lg:w-1/2">
    hello!
  </main>
</div>

<!-- z = -10, percentage bar -->
<div
  bind:this={percentage_bar}
  class="dark-shadow-glow absolute inset-0 -z-10 h-screen w-screen bg-gray-950 shadow-gray-950">
</div>

<style>
  /* using gray-50 */
  .light-shadow-glow {
    box-shadow:
      0 0 20px 0 #f9fafb,
      0 0 20px 0 #f9fafb;
  }

  /* using gray-950 */
  .dark-shadow-glow {
    box-shadow: 0 0 20px 20px #f9fafb inset;
  }
</style>
