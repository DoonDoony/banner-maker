<script lang="ts">
    import {onMount} from 'svelte';
    import {bannerBackground, bannerHeight, bannerWidth, previewCanvas, userInput} from '../stores';

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    function drawBackground() {
        if ($bannerBackground.startsWith("#")) {
            ctx.fillStyle = $bannerBackground
            return ctx.fillRect(0, 0, $bannerWidth, $bannerHeight)
        }

        const img = new Image;
        img.src = $bannerBackground
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            drawText()
        }
    }

    function drawText() {
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.font = "bold 40px Serif"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText($userInput, $bannerWidth / 2, $bannerHeight / 2)
    }

    function draw() {
        canvas.width = $bannerWidth
        canvas.height = $bannerHeight
        drawBackground()
        drawText()
    }


    onMount(() => {
        $previewCanvas = canvas
        ctx = canvas.getContext('2d')
        draw()
    })

    userInput.subscribe(value => {
        ctx && draw()
    })

    bannerBackground.subscribe(value => {
        ctx && draw()
    })

    bannerWidth.subscribe(value => {
        ctx && draw()
    })

    bannerHeight.subscribe(value => {
        ctx && draw()
    })

</script>

<div class="container">
    <canvas bind:this={canvas}></canvas>
</div>