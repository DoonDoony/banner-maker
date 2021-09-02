<script lang="ts">
    import {onMount} from "svelte";
    import {showModal} from "../stores";
    import {getRandomPhoto} from "../utils";

    let range = [...Array(6).keys()]
    let imageUrls = []

    onMount(() => {
        imageUrls = range.map(() => {
            return getRandomPhoto(400, 200)
        })
    })


    function handleImageClick(e: Event) {
        let img = e.currentTarget as Element
        (img.firstChild as Element).getAttribute("src")
    }
</script>

{#if $showModal}
    <div>
        <ul>
            {#each imageUrls as imageUrl}
                <li on:click={handleImageClick}>
                    <img src={imageUrl} alt="thumbnail">
                </li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    div {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    ul {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-content: space-evenly;
        justify-content: space-between;
        width: 820px;
        height: 660px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    li {
        list-style: none;
    }
</style>