<script lang='ts'>
    import pfp from "$lib/assets/images/pfp.jpg";

    let { lastMessage, contactName } = $props();
</script>

<div class="h-20 w-full max-w-full cursor-pointer flex gap-3 items-center hover:bg-[rgba(0,0,0,0.05)] p-2 px-4 rounded">
    <figure class="h-full">
        <img class="h-full rounded-full" src={pfp} alt="">
    </figure>
    <div class="w-[80%] max-w-[80%]">
        <p class="text-lg font-semibold text-nowrap w-full text-ellipsis overflow-x-hidden">{contactName}</p>
        <p class="text-gray-700 text-nowrap w-full text-ellipsis overflow-x-hidden">{lastMessage}</p>
    </div>
</div>