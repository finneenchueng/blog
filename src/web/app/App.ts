import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const count = ref(0)
        const inc = () => {
            count.value++;
        }

        return {
            count,
            inc
        }
    },
    methods: {

        loadCavasApp() {
            var message = "your text";
            var fillOrStroke = "fill";
            var fontSize = "50";
            var fontFace = "serif";
            var textFillColor = "#ff0000";
            var textBaseline = "middle";
            var textAlign = "center";
            var fontWeight = "normal";
            var fontStyle = "normal";

            var theCanvas =  document.getElementById("canvas") as HTMLCanvasElement;
            let context = theCanvas.getContext("2d") as CanvasRenderingContext2D;
            var formElement = document.getElementById("textBox") as HTMLElement;
            formElement.addEventListener('keyup', textBoxChanged as any, false);
            formElement = document.getElementById("fillOrStroke") as HTMLElement;
            formElement.addEventListener('change', fillOrStrokeChanged as any, false);
            formElement = document.getElementById("textSize") as HTMLElement;
            formElement.addEventListener('change', textSizeChanged as any, false);
            formElement = document.getElementById("textFillColor") as HTMLElement;
            formElement.addEventListener('change', textFillColorChanged as any, false);
            formElement = document.getElementById("textFont") as HTMLElement;
            formElement.addEventListener('change', textFontChanged as any, false);
            formElement = document.getElementById("textBaseline") as HTMLElement;
            formElement.addEventListener('change', textBaselineChanged as any, false);
            formElement = document.getElementById("textAlign") as HTMLElement;
            formElement.addEventListener('change', textAlignChanged as any, false);
            formElement = document.getElementById("fontWeight") as HTMLElement;
            formElement.addEventListener('change', fontWeightChanged as any, false);
            formElement = document.getElementById("fontStyle") as HTMLElement;
            formElement.addEventListener('change', fontStyleChanged as any, false);

            drawScreen();

            function drawScreen() {
                context.fillStyle = "yellow";
                context.fillRect(0, 0, theCanvas.width, theCanvas.height);

                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(theCanvas.width / 2, 0);
                context.lineTo(theCanvas.width / 2, theCanvas.height);
                context.stroke();
                context.closePath();

                context.beginPath();
                context.moveTo(0, theCanvas.height / 2);
                context.lineTo(theCanvas.width, theCanvas.height / 2);
                context.stroke();
                context.closePath();

                //Text
                // context.textBaseline = textBaseline;
                // context.textAlign = textAlign;
                context.font = fontWeight + " " + fontStyle + " " + fontSize + "px " + fontFace;
                var xPosition = (theCanvas.width / 2);
                var yPosition = (theCanvas.height / 2);
                switch (fillOrStroke) {
                    case "fill":
                        context.fillStyle = textFillColor;
                        context.fillText(message, xPosition, yPosition);
                        break;
                    case "stroke":
                        context.strokeStyle = textFillColor;
                        context.strokeText(message, xPosition, yPosition);
                        break;
                    case "both":
                        context.fillStyle = textFillColor;
                        context.fillText(message, xPosition, yPosition);
                        context.strokeStyle = "#000000";
                        context.strokeText(message, xPosition, yPosition);
                        break;
                }
            }

            function textBoxChanged(e: MouseEvent) {
                const target: any = e.target as EventTarget;
                message = target.value as string;
                drawScreen();
            }

            function fillOrStrokeChanged(e: MouseEvent) {
                const target: any = e.target;
                fillOrStroke = target.value;
                drawScreen();
            }

            function textSizeChanged(e: MouseEvent) {
                const target: any = e.target;
                fontSize = target.value;
                drawScreen();
            }

            function textFillColorChanged(e: MouseEvent) {
                const target: any = e.target;
                textFillColor = "#" + target.value;
                drawScreen();
            }

            function textFontChanged(e: MouseEvent) {
                const target: any = e.target;
                fontFace = target.value;
                drawScreen();
            }

            function textBaselineChanged(e: MouseEvent) {
                const target: any = e.target;
                textBaseline = target.value;
                drawScreen();
            }

            function textAlignChanged(e: MouseEvent) {
                const target: any = e.target;
                textAlign = target.value;
                drawScreen();
            }

            function fontWeightChanged(e: MouseEvent) {
                const target: any = e.target;
                fontWeight = target.value;
                drawScreen();
            }

            function fontStyleChanged(e: MouseEvent) {
                const target: any = e.target;
                fontStyle = target.value as string;
                drawScreen();
            }


        },
        loadCanvas() {
            const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;//获取canvas对象

            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D; //创建二维的绘图上下文对象

            ctx.rect(50, 50, 200, 200);//定义矩形的边框
            ctx.strokeStyle = "red"; //填充边框（路径）颜色
            ctx.fillStyle = "green";//填充边框颜色
            ctx.fill();
            ctx.stroke();
            ctx.fillText('sdfsadfdsf', 22, 48);

            // ctx.clearRect(60,60,100,50);//擦除矩形区域内的图形
            // ctx.strokeRect(50,50,200,100);//定义无填充的矩形

            // ctx.fillStyle="red"; //填充矩形颜色
            // ctx.fliiRect(50,50,200,100);//定义有填充的矩形
        }
    },
    mounted() {
        console.log('>>>>>>>>>.mounted')
        // this.loadCanvas();
        this.loadCavasApp();
    },
});