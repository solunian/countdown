<script lang="ts">
  import { goto } from "$app/navigation";
  import { decode_date, encode, now_offset } from "$lib/helper";

  let is_timer = $state(false);

  let title_el: HTMLTextAreaElement | undefined = $state();
  const title_maxlen = 100;
  const title_input = () => {
    title_el!.style.height = "";
    title_el!.style.height = title_el!.scrollHeight + "px";
  };

  let title = $state("");
  let start_input_val: string = $state("");
  let end_input_val: string = $state("");
  let minutes: number | undefined = $state();

  const generate = () => {
    let start = -1;
    let end = -1;

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
      goto(`/?code=${gencode}`);
    } else {
      alert(
        "bruh. that countdown don't work. i'm also too lazy to code up a ui element for errors."
      );
    }
  };
</script>

<div class="mt-3 flex h-full flex-col justify-between gap-8">
  <div class="flex flex-col gap-1">
    <div class="border-b-2 border-gray-300 pb-2">
      <textarea
        bind:this={title_el}
        class="align-center block h-10 w-full resize-none overflow-hidden bg-transparent text-center text-4xl text-wrap outline-none"
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
      <label class="flex flex-col items-center gap-1 rounded-lg border-2 border-gray-300 px-4 py-2">
        <h2>start</h2>
        <input class="bg-transparent outline-none" type="date" bind:value={start_input_val} />
      </label>
      <label class="flex flex-col items-center gap-1 rounded-lg border-2 border-gray-300 px-4 py-2">
        <h2>end</h2>
        <input class="bg-transparent outline-none" type="date" bind:value={end_input_val} />
      </label>
    </div>
  {/if}

  <button
    class="generate-glow hover:box-shadow block rounded-xl px-1 py-4 text-2xl outline outline-2 outline-gray-300 transition hover:bg-gray-950 hover:text-gray-50 hover:outline-none focus:bg-gray-950 focus:text-gray-50 focus:outline-none"
    onclick={generate}>generate!</button>
</div>
