import './bootstrap';
import { fabric } from "fabric";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import * as bootstrap from 'bootstrap';

document.addEventListener('DOMContentLoaded', function() {

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasNavbar');
    const openCanvas = document.querySelector('header .navbar-toggler');

    openCanvas.addEventListener('click', function () {
        bsOffcanvas.show();
    });

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const tokenID = (+new Date).toString(16);
    let vh = document.documentElement.clientHeight / 100 * 78; 
    
    let canvas = new fabric.Canvas('canvas');
    let json = document.querySelector('#json').innerText.replaceAll('&quot;', '"');
    let ch = JSON.parse(json).clientHeight;
    canvas.loadFromJSON(json, function() {
        resizeCanvas(ch);
    });
    canvas.freeDrawingBrush.color = '#4079c2';
    let currentColor = "#4079c2";
    let currentWidth = 15;

    canvas.on({
        'mouse:down': function (options) {            
            let evt = options.e;
            console.log(evt);
            if ((evt.altKey === true && !tools.brush.classList.contains('active') && !tools.pencil.classList.contains('active')) || tools.drag.classList.contains('active')) {
              this.isDragging = true;
              this.selection = false;
              this.lastPosX = evt.clientX ? evt.clientX : evt.touches[0].clientX;
              this.lastPosY = evt.clientY ? evt.clientY : evt.touches[0].clientY;
            } else {
                if (options.target && tools.bucket.classList.contains('active')) {
                    if (options.target.type === "path") {
                        options.target.set("stroke", currentColor);
                    } else {
                        options.target.set("fill", currentColor).set("stroke", currentColor);
                    }
                    saveCanvas();
                }
            }
        },
        'mouse:move': function (opt) {
            if (this.isDragging) {
                let e = opt.e;
                let zoom = canvas.getZoom();
                let vpt = this.viewportTransform;
                if (zoom < 0.4) {
                  vpt[4] = 200 - 1000 * zoom / 2;
                  vpt[5] = 200 - 1000 * zoom / 2;
                } else {
                  vpt[4] += (e.clientX ? e.clientX : e.touches[0].clientX) - this.lastPosX;
                  vpt[5] += (e.clientY ? e.clientY  : e.touches[0].clientY) - this.lastPosY;
                  if (vpt[4] >= 0) {
                    vpt[4] = 0;
                  } else if (vpt[4] < canvas.getWidth() - canvas.getWidth() * zoom) {
                    vpt[4] = canvas.getWidth() - canvas.getWidth() * zoom;
                  }
                  if (vpt[5] >= 0) {
                    vpt[5] = 0;
                  } else if (vpt[5] < canvas.getHeight() - canvas.getHeight() * zoom) {
                    vpt[5] = canvas.getHeight() - canvas.getHeight() * zoom;
                  }
                }
                this.requestRenderAll();
                this.lastPosX = e.clientX ? e.clientX : e.touches[0].clientX;
                this.lastPosY = e.clientY ? e.clientY  : e.touches[0].clientY;
              }
        },
        'mouse:up': function (opt) {
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
        },
        'path:created': saveCanvas,
        'object:modified': saveCanvas
    });
    
    function resizeCanvas(clientHeight) {
        let newHeight;
        if (document.body.clientWidth <= 768) {

            const containerWidth = document.body.clientWidth - 20;

            const originalWidth = canvas.backgroundImage.width;
            const originalHeight = canvas.backgroundImage.height;

            const aspectRatio = originalWidth / originalHeight;

            newHeight = containerWidth / aspectRatio;
        }
        let s = 78;
        if (document.querySelector('main').classList.contains('fullscreen')) {
            s = 98;
        }
        let percent;
        if (clientHeight && typeof clientHeight === 'number') {
            if (document.body.clientWidth <= 768) {
                percent = ((clientHeight - newHeight) / clientHeight) * 100;
            } else {
                percent = ((clientHeight - document.documentElement.clientHeight / 100 * s) / clientHeight) * 100;
            }
        } else {
            if (document.body.clientWidth <= 768) {
                percent = ((vh - newHeight) / vh) * 100;
            } else {
                percent = ((vh - document.documentElement.clientHeight / 100 * s) / vh) * 100;
            }
        }
        if (document.body.clientWidth > 768) {
            vh = document.documentElement.clientHeight / 100 * s;
        } else {
            vh = newHeight;
        }
        canvas.discardActiveObject();
        let sel = new fabric.ActiveSelection(canvas.getObjects(), {
          canvas: canvas,
        });
        canvas.setActiveObject(sel);
        if (Math.sign(percent) === 1) {
            sel.scaleToWidth(sel.width - sel.width / 100 * percent);
            sel.scaleToHeight(sel.height - sel.height / 100 * percent);
            sel.top -= sel.top / 100 * percent;
            sel.left -= sel.left / 100 * percent;
        } else if (Math.sign(percent) === -1) {
            sel.scaleToWidth(sel.width + sel.width / 100 * percent * -1);
            sel.scaleToHeight(sel.height + sel.height / 100 * percent * -1);
            sel.top += sel.top / 100 * percent * -1;
            sel.left += sel.left / 100 * percent * -1;
        }
        sel.setCoords();
        let bgPercent = ((canvas.backgroundImage.height - vh) / canvas.backgroundImage.height) * 100;
        if (Math.sign(bgPercent) === 1) {
            canvas.setWidth(canvas.backgroundImage.width - canvas.backgroundImage.width / 100 * bgPercent);
            canvas.backgroundImage.scaleToWidth(canvas.backgroundImage.width - canvas.backgroundImage.width / 100 * bgPercent);
        } else if (Math.sign(bgPercent) === -1) {
            canvas.setWidth(canvas.backgroundImage.width + canvas.backgroundImage.width / 100 * bgPercent * -1);
            canvas.backgroundImage.scaleToWidth(canvas.backgroundImage.width + canvas.backgroundImage.width / 100 * bgPercent * -1);
        }
        canvas.setHeight(vh);
        canvas.backgroundImage.scaleToHeight(vh);        
        canvas.requestRenderAll();
        canvas.calcOffset();
        canvas.discardActiveObject();
    };
    window.addEventListener('resize', resizeCanvas);
    document.querySelector('main').addEventListener('onfullscreenchange', resizeCanvas);

    function saveCanvas() {
        let data = new FormData();
        data.append('uniqid', document.body.dataset.uniqid);
        data.append('token', tokenID);
        let o = canvas.toObject();
        o.clientHeight = vh;
        data.append('data', JSON.stringify(o));
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
        drag: document.querySelector('#drag'),
        brush: document.querySelector('#brush'),
        rectangle: document.querySelector('#rectangle'),
        triangle: document.querySelector('#triangle'),
        circle: document.querySelector('#circle'),
        pencil: document.querySelector('#pencil'),
        text: document.querySelector('#text'),
        line: document.querySelector('#line'),
        hexagon: document.querySelector('#hexagon'),
        star: document.querySelector('#star'),
        bucket: document.querySelector('#bucket'),
        color: document.querySelector('#color'),
        remove: document.querySelector('#remove'),
        download: document.querySelector('#download'),        
        url: document.querySelector('#url'),    
        zoom: document.querySelector('#zoom'),
        brushWidth: document.querySelector('#brush-width'),
        clear: document.querySelector('#clear'),
        fullscreen: document.querySelector('#fullscreen'),
        screen: document.querySelector('#screen'),
        toggler: document.querySelector('#toggler')
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
        if (tools.drag.classList.contains('active')) {
            tools.drag.classList.remove('active');
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
    });
    tools.drag.addEventListener('click', function() {     
        canvas.isDrawingMode = false;   
        if (!this.classList.contains('active')) {
            this.classList.add('active');
        }
        if (tools.cursor.classList.contains('active')) {
            tools.cursor.classList.remove('active');
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
    });
    tools.bucket.addEventListener('click', function() {
        canvas.isDrawingMode = false;
        if (!this.classList.contains('active')) {
            this.classList.add('active');
        }
        if (tools.drag.classList.contains('active')) {
            tools.drag.classList.remove('active');
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
        if (tools.drag.classList.contains('active')) {
            tools.drag.classList.remove('active');
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
        if (tools.drag.classList.contains('active')) {
            tools.drag.classList.remove('active');
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
        let polygon = new fabric.Polygon([
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
    tools.star.addEventListener('click', function() {
        let polygon = new fabric.Polygon([
            { x: 349.9, y: 75, },
            { x: 379, y: 160.9,},
            { x: 469, y: 160.9,},
            { x: 397, y: 214.9,},
            { x: 423, y: 300.9,},
            { x: 350, y: 249.9,},
            { x: 276.9, y: 301,},
            { x: 303, y: 215,},
            { x: 231, y: 161,},
            { x: 321, y: 161,}], {
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
    tools.fullscreen.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('main').requestFullscreen();
        document.querySelector('main').classList.add('fullscreen');
        this.classList.add('d-none');
        tools.screen.classList.remove('d-none');
        let interval = setInterval(() => {            
            if (document.fullscreenElement === null) {
                document.querySelector('main').classList.remove('fullscreen');
                tools.screen.classList.add('d-none');
                tools.fullscreen.classList.remove('d-none');
                resizeCanvas();
                clearInterval(interval);
            }
        }, 500);
    });
    tools.screen.addEventListener('click', function(e) {
        e.preventDefault();
        document.exitFullscreen();
        document.querySelector('main').classList.remove('fullscreen');
        this.classList.add('d-none');
        tools.fullscreen.classList.remove('d-none');
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
        const bsToast = new bootstrap.Toast('#zoomToast');
        if (+this.value > 1 && document.body.clientWidth > 768) {
            bsToast.show();
        }
        let zoom = canvas.getZoom();
        let vpt = canvas.viewportTransform;
        if (vpt[4] >= 0) {
            vpt[4] = 0;
          } else if (vpt[4] < canvas.getWidth() - canvas.getWidth() * zoom) {
            vpt[4] = canvas.getWidth() - canvas.getWidth() * zoom;
          }
          if (vpt[5] >= 0) {
            vpt[5] = 0;
          } else if (vpt[5] < canvas.getHeight() - canvas.getHeight() * zoom) {
            vpt[5] = canvas.getHeight() - canvas.getHeight() * zoom;
          }
    });
    tools.brushWidth.addEventListener('input', function() {
        canvas.freeDrawingBrush.width = +this.value;
        currentWidth = +this.value;
    });
    tools.toggler.addEventListener('click', function(e) {
        e.preventDefault();
        const toolbar = document.querySelector('.toolbar');

        if (toolbar.classList.contains('d-none')) {
            toolbar.classList.remove('d-none');
            this.querySelector('i').classList.remove('bi-caret-down-fill');
            this.querySelector('i').classList.add('bi-caret-up-fill');
        } else {
            toolbar.classList.add('d-none');
            this.querySelector('i').classList.remove('bi-caret-up-fill');
            this.querySelector('i').classList.add('bi-caret-down-fill');
        }        
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
    forceTLS: import.meta.env.VITE_PUSHER_TLS,
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
            let ch = JSON.parse(data).clientHeight;
            canvas.loadFromJSON(data, function() {
                resizeCanvas(ch);
            });
        });
    }
});

