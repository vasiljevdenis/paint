import * as bootstrap from 'bootstrap';

    const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasNavbar');
    const openCanvas = document.querySelector('header .navbar-toggler');

    openCanvas.addEventListener('click', function () {
        bsOffcanvas.show();
    });

    document.addEventListener('DOMContentLoaded', function() {
        const maps = document.querySelectorAll('#maps a:not(.dropdown-toggle)');
    
        console.log(maps);
    
        maps.forEach(el => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                let obj = {
                    "version": "5.3.0",
                    "objects": [],
                    "backgroundImage": {
                        "type": "image",
                        "version": "5.3.0",
                        "originX": "left",
                        "originY": "top",
                        "left": 0,
                        "top": 0,
                        "width": +this.dataset.width,
                        "height": +this.dataset.height,
                        "fill": "rgb(0,0,0)",
                        "stroke": null,
                        "strokeWidth": 0,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeDashOffset": 0,
                        "strokeLineJoin": "miter",
                        "strokeUniform": false,
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "skewX": 0,
                        "skewY": 0,
                        "cropX": 0,
                        "cropY": 0,
                        "src": location.origin + this.dataset.bg,
                        "crossOrigin": null,
                        "filters": []
                    }
                };
                let data = new FormData();
                data.append('category', this.dataset.category);
                data.append('name', this.dataset.name);
                data.append('data', JSON.stringify(obj));
                fetch('/newcanv', {
                        method: "POST",
                        headers: {
                            'X-CSRF-TOKEN': token
                        },
                        body: data
                    })
                    .then((response) => response.text())
                    .then((data) => {
                        if (data) {
                            location.href = location.origin + '/maps/map' + data;
                        }
                    });
                });
        });
    });