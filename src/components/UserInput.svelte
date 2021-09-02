<script lang="ts">
    import {bannerBackground, bannerHeight, bannerWidth, previewCanvas, userInput} from "../stores";
    import {getRandomPhoto} from "../utils";

    function createBlackOverlay() {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        ctx.fillRect(0, 0, $bannerWidth, $bannerHeight)

        const img = new Image
        img.src = canvas.toDataURL("image/png")
        return img
    }

    function handleImageButton(e: Event) {
        const img = new Image
        img.src = getRandomPhoto($bannerWidth, $bannerHeight)
        img.crossOrigin = "Anonymous"
        const canvas = document.createElement("canvas")
        canvas.width = $bannerWidth
        canvas.height = $bannerHeight
        const ctx = canvas.getContext("2d")
        const overlay = createBlackOverlay()
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            ctx.drawImage(overlay, 0, 0, $bannerWidth, $bannerHeight)
            $bannerBackground = canvas.toDataURL("image/png")
        }
    }

    function handleDownload(e: Event) {
        let aTag = e.currentTarget as HTMLAnchorElement
        aTag.download = $userInput.replace(" ", "_") + ".png"
        aTag.href = $previewCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        aTag.click()
    }
</script>

<div>
    <input bind:value={$userInput} on:submit|preventDefault type="text">
    <label for="width">Width</label>
    <input bind:value={$bannerWidth} id="width" on:submit|preventDefault type="number">
    <label for="height">Height</label>
    <input bind:value={$bannerHeight} id="height" on:submit|preventDefault type="number">
    <label for="color">Color</label>
    <input bind:value={$bannerBackground} id="color" on:submit|preventDefault type="color">
    <label for="image">Photo</label>
    <button id="image" on:click={handleImageButton} type="reset">
        <svg class="feather feather-camera" fill="none" height="24" stroke="currentColor" stroke-linecap="round"
             stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
        </svg>
    </button>
    <label for="download">Download</label>
    <a id="download" on:click={handleDownload}>
        <svg class="feather feather-download" fill="none" height="24" stroke="currentColor" stroke-linecap="round"
             stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" x2="12" y1="15" y2="3"/>
        </svg>
    </a>
</div>