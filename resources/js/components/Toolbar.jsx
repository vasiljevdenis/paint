import React from 'react';
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";

export default function Toolbar() {
  const changeColor = e => {
    toolState.setStrokeColor(e.target.value)
    toolState.setFillColor(e.target.value)
}
  return (
    <div className="col-12 col-md-2 d-flex">
      <div className="toolbar m-auto border border-secondary-subtle rounded-2">
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark"><i class="bi bi-cursor-fill"></i></button>
            <button type="button" className="btn btn-dark"><i class="bi bi-pencil-fill"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark rounded-0" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}><i class="bi bi-brush-fill"></i></button>
            <button type="button" className="btn btn-dark rounded-0" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}><i class="bi bi-eraser-fill"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-paint-bucket"></i></button>
            <button type="button" className="btn btn-dark rounded-0" onClick={() => toolState.setTool(new Line(canvasState.canvas))}><i class="bi bi-slash-lg"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-fonts"></i></button>
            <button type="button" className="btn btn-dark rounded-0" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}><i class="bi bi-square-fill"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark"><i class="bi bi-triangle-fill"></i></button>
            <button type="button" className="btn btn-dark" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}><i class="bi bi-circle-fill"></i></button>
        </div>
        <input onChange={e => changeColor(e)} style={{marginLeft:10}} type="color"/>
        </div>
    </div>
  )
}
