import './bootstrap';
import { fabric } from "fabric";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import * as bootstrap from 'bootstrap';

document.addEventListener('DOMContentLoaded', function() {

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const tokenID = (+new Date).toString(16);
    let vh = document.documentElement.clientHeight / 100;
    document.querySelector('canvas').height = vh * 78;
    document.querySelector('canvas').width = vh * 78;
    // let bgImage = '/images/maps/dota2/dota2.jpg';
    
    let canvas = new fabric.Canvas('canvas');
    let json = document.querySelector('#json').innerText.replaceAll('&quot;', '"');
    canvas.loadFromJSON(json);
    // fabric.Image.fromURL(bgImage, function(img) {
    //     img.scaleToWidth(canvas.width);
    //     img.scaleToHeight(canvas.height);
    //     canvas.setBackgroundImage(img);
    //     canvas.requestRenderAll();
    //  });
    canvas.freeDrawingBrush.color = '#4079c2';
    let currentColor = "#4079c2";
    let currentWidth = 15;

    canvas.on({
        'mouse:down': function(options) {
        if (options.target && tools.bucket.classList.contains('active')) {
            if (options.target.type === "path") {
                options.target.set("stroke", currentColor);
            } else {
            options.target.set("fill", currentColor).set("stroke", currentColor);        
            }
            saveCanvas();
        }
      },
      'path:created': saveCanvas,
      'object:modified': saveCanvas
    });

    function saveCanvas() {
        let data = new FormData();
        data.append('uniqid', document.body.dataset.uniqid);
        data.append('token', tokenID);
        data.append('data', JSON.stringify(canvas.toObject()));
        fetch('/savecanv', {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token
            },
            body: data
        })
        .then((response) => response.text())
        .then((data) => {
        });
    }

    let tools = {
        cursor: document.querySelector('#cursor'),
        brush: document.querySelector('#brush'),
        rectangle: document.querySelector('#rectangle'),
        triangle: document.querySelector('#triangle'),
        circle: document.querySelector('#circle'),
        pencil: document.querySelector('#pencil'),
        text: document.querySelector('#text'),
        line: document.querySelector('#line'),
        hexagon: document.querySelector('#hexagon'),
        bucket: document.querySelector('#bucket'),
        color: document.querySelector('#color'),
        remove: document.querySelector('#remove'),
        download: document.querySelector('#download'),        
        url: document.querySelector('#url'),    
        zoom: document.querySelector('#zoom'),
        brushWidth: document.querySelector('#brush-width'),
        clear: document.querySelector('#clear')
    };

    let mainTools = document.querySelector('.toolbar .main-tools');
    mainTools.addEventListener('click', function() {
        if (!tools.brush.classList.contains('active')) {
            if (!tools.brushWidth.parentNode.classList.contains('d-none')) {
                tools.brushWidth.parentNode.classList.add('d-none')
            }
        } else {
            if (tools.brushWidth.parentNode.classList.contains('d-none')) {
                tools.brushWidth.parentNode.classList.remove('d-none')
            }
        }
    });


    tools.cursor.addEventListener('click', function() {
        canvas.isDrawingMode = false;
        if (!this.classList.contains('active')) {
            this.classList.add('active');
        }
        if (tools.brush.classList.contains('active')) {
            tools.brush.classList.remove('active');
        }
        if (tools.pencil.classList.contains('active')) {
            tools.pencil.classList.remove('active');
        }
        if (tools.bucket.classList.contains('active')) {
            tools.bucket.classList.remove('active');
        }
        // document.querySelector('main').requestFullscreen();
        // canvas.setHeight(700);
        // canvas.setWidth(700);
        // canvas.renderAll();
    });
    tools.bucket.addEventListener('click', function() {
        canvas.isDrawingMode = false;
        if (!this.classList.contains('active')) {
            this.classList.add('active');
        }
        if (tools.brush.classList.contains('active')) {
            tools.brush.classList.remove('active');
        }
        if (tools.pencil.classList.contains('active')) {
            tools.pencil.classList.remove('active');
        }
        if (tools.cursor.classList.contains('active')) {
            tools.cursor.classList.remove('active');
        }
    });
    tools.brush.addEventListener('click', function() {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = currentWidth;
        canvas.freeDrawingBrush.color = currentColor;
        canvas.isDrawingMode = true;
        if (!this.classList.contains('active')) {
            this.classList.add('active');
        }
        if (tools.cursor.classList.contains('active')) {
            tools.cursor.classList.remove('active');
        }
        if (tools.pencil.classList.contains('active')) {
            tools.pencil.classList.remove('active');
        }
        if (tools.bucket.classList.contains('active')) {
            tools.bucket.classList.remove('active');
        }
    });
    tools.pencil.addEventListener('click', function() {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 2;
        canvas.freeDrawingBrush.color = currentColor;
        canvas.isDrawingMode = true;
        if (!this.classList.contains('active')) {
            this.classList.add('active');
        }
        if (tools.cursor.classList.contains('active')) {
            tools.cursor.classList.remove('active');
        }
        if (tools.brush.classList.contains('active')) {
            tools.brush.classList.remove('active');
        }
        if (tools.bucket.classList.contains('active')) {
            tools.bucket.classList.remove('active');
        }
    });
    tools.rectangle.addEventListener('click', function() {
        let rect = new fabric.Rect({
            left: 'center',
            top: 'center',
            width: 50,
            height: 50,      
            fill: currentColor,
            stroke: currentColor,
            strokeWidth: 5,
                });  
          canvas.add(rect);
          rect.center();
          saveCanvas();
    });
    tools.triangle.addEventListener('click', function() {
        let tri = new fabric.Triangle({
            left: 40,
            top: 40,
            width: 50,
            height: 50,      
            fill: currentColor,
            stroke: currentColor,
            strokeWidth: 5,
                });  
          canvas.add(tri);
          tri.center();
          saveCanvas();
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
          circle.center();
          saveCanvas();
    });
    tools.hexagon.addEventListener('click', function() {
        var polygon = new fabric.Polygon([
        { x: 300, y: 150 },
        { x: 225, y: 280 },
        { x: 75, y: 280},
        { x: 0, y: 150},
        { x: 75, y: 20 },
        { x: 225, y: 20 }], {
            fill: currentColor
        });
        canvas.add(polygon);
        polygon.center();
        saveCanvas();
    });
    tools.line.addEventListener('click', function() {
        let line = new fabric.Line([250, 125, 350, 125], {
            fill: currentColor,
            stroke: currentColor,
            strokeWidth: 2,
            selectable: true,
            evented: true,
          });
          canvas.add(line);
          line.center();
          saveCanvas();
    });
    tools.remove.addEventListener('click', function() {
        let activeObjs = canvas.getActiveObjects();
        if (activeObjs) {
        activeObjs.forEach(el => {
            canvas.remove(el);
        });
        saveCanvas();
    }
    });
    tools.clear.addEventListener('click', function() {
        let objs = canvas.getObjects();
        if (objs) {
        objs.forEach(el => {
            canvas.remove(el);
        });
        saveCanvas();
    }
    });
    tools.text.addEventListener('click', function() {
        let text = new fabric.IText('текст', {
            left: 100,
            top: 100,
            textAlign: 'center',
            fontSize: 28,
            fontFamily: 'Comic Sans',
            stroke: currentColor,
            fill: currentColor
          });
          canvas.add(text);
          text.center();
          saveCanvas();
    });
    tools.color.addEventListener('input', function() {
        let color = this.value;
        let activeObjs = canvas.getActiveObjects();
        currentColor = color;
        canvas.freeDrawingBrush.color = color;
        if (activeObjs.length > 0) {
            activeObjs.forEach(el => {                
                if (el.type === "path") {
                    el.set("stroke", color);
                } else {
                el.set("fill", color).set("stroke", color);        
                }
            });
        canvas.renderAll();
    }
    });
    tools.color.addEventListener('change', function() {
        saveCanvas();
    });
    tools.zoom.addEventListener('input', function() {
        canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), +this.value);
    });
    tools.brushWidth.addEventListener('input', function() {
        canvas.freeDrawingBrush.width = +this.value;
        currentWidth = +this.value;
    });

    tools.download.addEventListener('click', function(e) {
        e.preventDefault();
        saveImage(this);
    });
    tools.url.addEventListener('click', function(e) {
        e.preventDefault();
        copyUrl();
        // console.log(canvas.toObject());
    });

    function saveImage(el) {
        let link = document.createElement('a');
        link.href = canvas.toDataURL({
            format: 'jpeg',
            quality: 1
        });
        link.download = 'canvas.jpg';
        link.click();
    }

    function copyUrl() {
        navigator.clipboard.writeText(location.href);
        const bsToast = new bootstrap.Toast('#copyToast');
        bsToast.show();
    }

    window.Pusher = Pusher;
 
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: false,
    encryption: true
});

window.Echo.channel(`fabric${document.body.dataset.uniqid}`)
    .listen('Canvas', e => {
        if (e.id.length > 0 && tokenID != e.token) {
            getMap(e.id);
        }
    });
    
    function getMap(uniqid) {
        fetch(`/getmap${uniqid}`, {
            method: "GET",
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            canvas.loadFromJSON(data, function() {
                canvas.renderAll();
            });
        });
    }
});

