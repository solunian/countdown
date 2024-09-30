<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { countdown_text, decode, decode_date, encode, now_offset } from "$lib/helper";

  let percentage = $state(0);
  let percentage_bar: HTMLDivElement;

  let code = $state($page.data.code);

  let title = $state("");
  let start = $state(-1);
  let end = $state(-1);
  let now = $state(-1);

  // tests pleh
  // http://localhost:5173/?code=dGl0bGUsLTEsLTE%3D
  // http://localhost:5173/?code=dGl0bGUsLTEsLTEwMDA%3D

  let is_timer = $state(false);

  let start_input_val: string = $state("");
  let end_input_val: string = $state("");
  let minutes: number | undefined = $state();

  const generate = () => {
    if (is_timer) {
      start = now_offset(0);
      end = now_offset(minutes ?? 0);
    } else {
      start = decode_date(start_input_val);
      end = decode_date(end_input_val);
    }

    if (end > start) {
      if (title === "") {
        title = "untitled :o";
      }
      let gencode = encode({ title, start, end });
      goto(`?code=${gencode}`);
      code = gencode;
    } else {
      alert(
        "bruh. that countdown don't work. i'm also too lazy to code up a ui element for errors."
      );
    }
  };
  const nav_home = () => {
    goto("/");
    code = "";
    title = "";
    start = -1;
    end = -1;
    percentage = 0;
  };

  let title_el: HTMLTextAreaElement | undefined = $state();
  const title_input = () => {
    title_el!.style.height = "";
    title_el!.style.height = title_el!.scrollHeight + "px";
  };
  const title_maxlen = 100;

  const share_button_onclick = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  let countdown = $derived(countdown_text(end - Math.floor(now / 1000)));
  $effect(() => {
    if (code !== "") {
      let cd = decode(code);
      title = cd.title;
      start = cd.start;
      end = cd.end;
    }
    if (percentage_bar !== undefined) {
      percentage_bar.style.width = `${percentage * 100}%`;
    }

    let tick: number = -1;
    if (code !== "") {
      tick = setInterval(() => {
        now = Date.now();
        percentage = (now - start * 1000) / (1000 * (end - start));
      });
    }

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
  <title>{title === "" ? "countdown" : `countdown: ${title}`}</title>
</svelte:head>

<div class="flex h-screen w-screen justify-center bg-transparent">
  <main
    class="light-shadow-glow min-h-1/2 m-auto w-4/5 rounded-xl border-none bg-gray-50 px-8 py-7 shadow-gray-50 sm:w-3/4 md:w-2/3 lg:w-1/2">
    {#if code === ""}
      <div class="mt-3 flex h-full flex-col justify-between gap-8">
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
              <span>timer</span>
              <input type="checkbox" bind:checked={is_timer} />
            </label>
            <div>{title.length}/{title_maxlen}</div>
          </div>
        </div>

        {#if is_timer}
          <input
            class="rounded-lg border-2 border-gray-300 px-4 py-2 text-2xl"
            type="number"
            placeholder="duration in minutes"
            bind:value={minutes} />
        {:else}
          <div class="flex flex-col justify-around gap-2 text-xl sm:flex-row md:text-2xl">
            <label
              class="flex flex-col items-center gap-1 rounded-lg border-2 border-gray-300 px-4 py-2">
              <h2>start</h2>
              <input class="bg-transparent outline-none" type="date" bind:value={start_input_val} />
            </label>
            <label
              class="flex flex-col items-center gap-1 rounded-lg border-2 border-gray-300 px-4 py-2">
              <h2>end</h2>
              <input class="bg-transparent outline-none" type="date" bind:value={end_input_val} />
            </label>
          </div>
        {/if}

        <button
          data-sveltekit-reload
          class="generate-glow hover:box-shadow block rounded-xl px-1 py-4 text-2xl outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:text-gray-50 hover:outline-none"
          onclick={generate}>generate!</button>
      </div>
    {:else}
      <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between">
          <button
            class="generate-glow rounded-xl stroke-gray-950 p-3 outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:stroke-gray-50 hover:outline-none"
            aria-label="back"
            onclick={nav_home}
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
          <span class="flex flex-row gap-3">
            <button
              class="generate-glow rounded-xl stroke-gray-950 p-3 outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:stroke-gray-50 hover:outline-none"
              aria-label="share"
              onclick={share_button_onclick}
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
            <a href="https://github.com/solunian/countdown" aria-label="github" target="_blank">
              <button
                class="generate-glow rounded-xl stroke-gray-950 p-3 outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:stroke-gray-50 hover:outline-none"
                aria-label="code"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  class="size-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
              </button>
            </a>
          </span>
        </div>

        <div class="text-center text-5xl">{decode(code).title}</div>
        <div class="text-center">{countdown}</div>
        <div class="flex flex-row justify-between">
          <span class="flex flex-col items-center">
            <div>{new Date(decode(code).start * 1000).toDateString()}</div>
            <div>{new Date(decode(code).start * 1000).toLocaleTimeString()}</div>
          </span>
          <span class="flex flex-col items-center">
            <div>{new Date(decode(code).end * 1000).toDateString()}</div>
            <div>{new Date(decode(code).end * 1000).toLocaleTimeString()}</div>
          </span>
        </div>

        <div class="w-full rounded bg-gray-300">
          <div bind:this={percentage_bar} class="h-2 w-0 rounded bg-gray-950"></div>
        </div>
      </div>
    {/if}
  </main>
</div>

<!-- z = -10 -->
<div class="dark-shadow-glow absolute inset-0 -z-10 h-screen w-screen bg-gray-950 shadow-gray-950">
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
