import { fabric } from "fabric";

document.addEventListener('DOMContentLoaded', function() {
    let canvas = new fabric.Canvas('canvas');
    canvas.setBackgroundImage('/images/dota.jpg', canvas.renderAll.bind(canvas));
    let currentColor = "#000000";

    let tools = {
        cursor: document.querySelector('#cursor'),
        brush: document.querySelector('#brush'),
        rectangle: document.querySelector('#rectangle'),
        triangle: document.querySelector('#triangle'),
        circle: document.querySelector('#circle'),
        pencil: document.querySelector('#pencil'),
        text: document.querySelector('#text'),
        line: document.querySelector('#line'),
        eraser: document.querySelector('#eraser'),
        bucket: document.querySelector('#bucket'),
        color: document.querySelector('#color'),
        remove: document.querySelector('#remove'),
        download: document.querySelector('#download'),        
        url: document.querySelector('#url')        
    };

    tools.cursor.addEventListener('click', function() {
        canvas.isDrawingMode = false;
    });
    tools.brush.addEventListener('click', function() {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 15;
        canvas.freeDrawingBrush.color = currentColor;
        canvas.isDrawingMode = true;
    });
    tools.pencil.addEventListener('click', function() {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 2;
        canvas.freeDrawingBrush.color = currentColor;
        canvas.isDrawingMode = true;
    });
    tools.rectangle.addEventListener('click', function() {
        let rect = new fabric.Rect({
            left: 40,
            top: 40,
            width: 50,
            height: 50,      
            fill: currentColor,
            stroke: currentColor,
            strokeWidth: 5,
                });  
          canvas.add(rect);
    });
    tools.triangle.addEventListener('click', function() {
        let rect = new fabric.Triangle({
            left: 40,
            top: 40,
            width: 50,
            height: 50,      
            fill: currentColor,
            stroke: currentColor,
            strokeWidth: 5,
                });  
          canvas.add(rect);
    });
    tools.circle.addEventListener('click', function() {
        let circle = new fabric.Circle({
            left: 40,
            top: 40,
            radius: 50,     
            fill: currentColor,
            stroke: currentColor,
            strokeWidth: 5,
                });  
          canvas.add(circle);
    });
    tools.eraser.addEventListener('click', function() {
        canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
        canvas.isDrawingMode = true;
    });
    tools.line.addEventListener('click', function() {
        let line = new fabric.Line([250, 125, 250, 175], {
            fill: currentColor,
            stroke: currentColor,
            strokeWidth: 5,
            selectable: true,
            evented: true,
          });
          canvas.add(line);
    });
    tools.remove.addEventListener('click', function() {
        let activeObjs = canvas.getActiveObjects();
        if (activeObjs) {
        activeObjs.forEach((el, i) => {
            canvas.remove(el);
        });
    }
    });
    tools.text.addEventListener('click', function() {
        let text = new fabric.IText('текст', {
            left: 100,
            top: 100,
            textAlign: 'center',
            fontSize: 28,
            fontFamily: 'Comic Sans'

          });
          canvas.add(text);
    });
    tools.color.addEventListener('input', function() {
        let color = this.value;
        let currentEl = canvas.getActiveObject();
        if (currentEl) {
        if (currentEl.type === "path") {
            currentEl.set("stroke", color);
            canvas.renderAll();
        } else {
        currentEl.set("fill", color).set("stroke", color);
        canvas.renderAll();
        }
    }
    currentColor = color;
        canvas.freeDrawingBrush.color = color;
    });

    tools.download.addEventListener('click', function(e) {
        e.preventDefault();
        saveImage(this);
    });
    tools.url.addEventListener('click', function(e) {
        e.preventDefault();
        copyUrl();
    });

    function saveImage(el) {
        let link = document.createElement('a');
        link.href = canvas.toDataURL({
            format: 'jpeg',
            quality: 0.8
        });
        link.download = 'canvas.jpg';
        link.click();
    }

    function copyUrl() {
        navigator.clipboard.writeText(location.href);
    }

});

