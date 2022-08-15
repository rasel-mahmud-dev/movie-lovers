function drawImage(element, width=200, height=200){
    let canvas = document.createElement("canvas")
    let context = canvas.getContext("2d")
    canvas.width = width
    canvas.height = height
    context.drawImage(element,0, 0, width , height);
    return canvas;
}

export default drawImage
