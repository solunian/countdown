<script lang="ts">
  import { page } from "$app/state";

  let error_status = $derived(page.status);
  let error_message = $derived(page.error?.message.toLowerCase());
</script>

<svelte:head>
  <title>{error_status}: {error_message}</title>
</svelte:head>

<div class="text-center text-4xl">
  {error_status}: {error_message} :(
</div>
