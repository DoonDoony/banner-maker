<script lang="ts">
    import {onMount} from 'svelte';
    import {bannerBackground, bannerHeight, bannerWidth, previewCanvas, userInput} from '../stores';

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let x: number = $bannerWidth / 2;
    let y: number = $bannerHeight / 2;

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
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText($userInput, x, y)
    }


    onMount(() => {
        $previewCanvas = canvas
        ctx = canvas.getContext('2d')
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.font = "bold 40px Serif"

        drawBackground()
        drawText()
    })

    userInput.subscribe(value => {
        if (ctx) {
            drawBackground()
            drawText()
        }
    })

    bannerBackground.subscribe(value => {
        if (ctx) {
            drawBackground()
        }
    })

</script>

<div class="container">
    <canvas
            bind:this={canvas}
            class="text"
            height={$bannerHeight}
            width={$bannerWidth}
    ></canvas>
</div>