<script lang="ts">
  import { goto } from "$app/navigation";
  import BackButton from "$lib/components/back-button.svelte";
  import GithubButton from "$lib/components/github-button.svelte";
  import ShareButton from "$lib/components/share-button.svelte";
  import { countdown_text } from "$lib/helper";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let now = $derived(data.now);
  let percentage = $derived((now - data.start * 1000) / (1000 * (data.end - data.start)));
  let percentage_bar: HTMLDivElement;

  // text for countdown
  let countdown = $derived(countdown_text(data.end - Math.floor(now / 1000)));

  $effect(() => {
    // adjusting width of bar according to percentage
    if (percentage_bar !== undefined) {
      percentage_bar.style.width = `${percentage * 100}%`;
    }

    // ticking for updating percentage
    let tick: number = -1;
    tick = setInterval(() => (now = Date.now()));

    if (percentage >= 1) {
      percentage = 1;
      clearInterval(tick);
      return;
    }

    return () => {
      clearInterval(tick);
    };
  });

  const copy_to_clipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };
</script>

<svelte:head>
  <title
    >{data.title === ""
      ? "countdown"
      : `(${Math.trunc(percentage * 100)}%) countdown: ${data.title}`}</title>
</svelte:head>

<div class="flex flex-col gap-4">
  <div class="flex flex-row justify-between">
    <BackButton />
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
    <div class="text-center">{(Math.trunc(percentage * 10000) / 100).toFixed(2)}%</div>
  </div>
</div>
