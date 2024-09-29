<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { decode, encode } from "$lib/helper";

  let percentage = $state(1);
  let percentage_bar: HTMLDivElement;

  let code = $state($page.data.code);

  let title = $state("");
  let start = $state(-1);
  let end = $state(-1);

  // tests pleh
  // http://localhost:5173/?code=dGl0bGUsLTEsLTE%3D
  // http://localhost:5173/?code=dGl0bGUsLTEsLTEwMDA%3D

  let is_timer = $state(false);

  const generate = () => {
    let gencode = encode({ title, start, end });
    goto(`?code=${gencode}`);
    code = gencode;
  };
  const nav_home = () => {
    goto("/");
    code = "";
  };

  let title_el: HTMLTextAreaElement;
  const title_input = () => {
    title_el.style.height = "";
    title_el.style.height = title_el.scrollHeight + "px";
  };
  const title_maxlen = 100;

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

<svelte:head>
  <title>{title === "" ? "countdown" : `countdown: ${title}`}</title>
</svelte:head>

<div class="flex h-screen w-screen justify-center bg-transparent">
  <main
    class="light-shadow-glow m-auto h-1/2 w-4/5 rounded-xl border-none bg-gray-50 px-8 pb-7 pt-10 shadow-gray-50 sm:w-3/4 md:w-2/3 lg:w-1/2">
    {#if code === ""}
      <div class="flex h-full flex-col justify-between gap-8">
        <div class="flex flex-col gap-1">
          <div class="border-b-2 border-gray-300 pb-2">
            <textarea
              bind:this={title_el}
              class="align-center block h-10 w-full resize-none overflow-hidden text-wrap bg-transparent text-center text-4xl outline-none"
              oninput={title_input}
              placeholder="title"
              maxlength={title_maxlen}
              bind:value={title}>
            </textarea>
          </div>
          <div class="flex flex-row justify-between">
            <label class="flex flex-row gap-2">
              <span>is_timer</span>
              <input type="checkbox" bind:checked={is_timer} />
            </label>
            <div>{title.length}/{title_maxlen}</div>
          </div>
        </div>

        {#if is_timer}
          timer stuff
        {:else}
          start end stuff
        {/if}

        <button
          class="generate-glow hover:box-shadow block rounded-xl px-1 py-4 text-2xl outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:text-gray-50 hover:outline-none"
          onclick={generate}>generate!</button>
      </div>
    {:else}
      <button class="rounded-lg border p-4" onclick={nav_home}>home?</button>
      <div>
        code:
        {decode(code).title}
        {decode(code).start}
        {decode(code).end}
      </div>
    {/if}
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

  .generate-glow:hover {
    box-shadow: 0 0 5px 5px #f9fafb inset;
  }
</style>
