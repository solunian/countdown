<script lang="ts">
  import { goto } from "$app/navigation";
  import BackButton from "$lib/components/back-button.svelte";
  import GithubButton from "$lib/components/github-button.svelte";
  import ShareButton from "$lib/components/share-button.svelte";
  import { countdown_text } from "$lib/helper";
  import type { PageProps } from "./$types";

  let percentage = $state(0);
  let percentage_bar: HTMLDivElement;

  let { data }: PageProps = $props();

  // tests pleh
  // http://localhost:5173/?code=dGl0bGUsLTEsLTE%3D
  // http://localhost:5173/?code=dGl0bGUsLTEsLTEwMDA%3D

  let now = $state(-1);

  const nav_back = () => {
    goto("/create");
  };

  const copy_to_clipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  let countdown = $derived(countdown_text(data.end - Math.floor(now / 1000)));
  $effect(() => {
    if (percentage_bar !== undefined) {
      percentage_bar.style.width = `${percentage * 100}%`;
    }

    let tick: number = -1;
    tick = setInterval(() => {
      now = Date.now();
      percentage = (now - data.start * 1000) / (1000 * (data.end - data.start));
    });

    if (percentage >= 1) {
      percentage = 1;
      clearInterval(tick);
      return;
    }

    return () => {
      clearInterval(tick);
    };
  });
</script>

<svelte:head>
  <title
    >{data.title === ""
      ? "countdown"
      : `(${Math.floor(percentage * 100)}%) countdown: ${data.title}`}</title>
</svelte:head>

<div class="flex flex-col gap-4">
  <div class="flex flex-row justify-between">
    <BackButton onclick={nav_back} />
    <span class="flex flex-row gap-3">
      <ShareButton onclick={copy_to_clipboard} />
      <GithubButton />
    </span>
  </div>

  <div class="text-center text-5xl">{data.title}</div>
  <div class="text-center">{countdown}</div>
  <div class="flex flex-row justify-between">
    <span class="flex flex-col items-center">
      <div>{new Date(data.start * 1000).toDateString()}</div>
      <div>{new Date(data.start * 1000).toLocaleTimeString()}</div>
    </span>
    <span class="flex flex-col items-center">
      <div>{new Date(data.end * 1000).toDateString()}</div>
      <div>{new Date(data.end * 1000).toLocaleTimeString()}</div>
    </span>
  </div>

  <div class="space-y-2">
    <!-- progress bar -->
    <div class="w-full overflow-hidden rounded bg-gray-300">
      <div bind:this={percentage_bar} class="h-2 w-0 rounded bg-gray-950"></div>
    </div>

    <!-- percentage thing -->
    <div class="text-center">{(percentage * 100).toFixed(1)}%</div>
  </div>
</div>
