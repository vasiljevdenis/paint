import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import axios from 'axios'

  const Canvas = observer(() => {
    var canvas = new fabric.Canvas('canvas');

    canvas.setBackgroundImage('/images/dota.jpg', canvas.renderAll.bind(canvas));
    $("#text").on("click", function(e) {
    text = new fabric.Text($("#text").val(), { left: 100, top: 100 });
        canvas.add(text);
    });
    $("#rect").on("click", function(e) {
        rect = new fabric.Rect({
        left: 40,
        top: 40,
        width: 50,
        height: 50,      
        fill: 'transparent',
        stroke: 'green',
        strokeWidth: 5,
            });  
      canvas.add(rect);
    });
    
    $("#circ").on("click", function(e) {
        rect = new fabric.Circle({
        left: 40,
        top: 40,
        radius: 50,     
        fill: 'transparent',
        stroke: 'green',
        strokeWidth: 5,
            });  
      canvas.add(rect);
    });
    
    $("#save").on("click", function(e) {
        $(".save").html(canvas.toSVG());
    });
    const canvasRef = useRef()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = new fabric.Canvas('canvas');
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id:params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }


    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data))
    }

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }
  return (
    <>
    <div className="col-12 col-md-8 d-flex">
      <canvas id="canvas" className='m-auto' onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={600}/>
    </div>
    <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Введите ваше имя</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" ref={usernameRef}/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" onClick={() => connectHandler()}>Сохранить</button>
        </div>
      </div>
    </div>
  </div>
  </>
  )
})
export default Canvas;