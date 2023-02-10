import React from 'react'

export default function Toolbar() {
  return (
    <div className="col-12 col-md-2 d-flex">
      <div className="toolbar m-auto border border-secondary-subtle rounded-2">
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark"><i class="bi bi-cursor-fill"></i></button>
            <button type="button" className="btn btn-dark"><i class="bi bi-pencil-fill"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-brush-fill"></i></button>
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-eraser-fill"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-paint-bucket"></i></button>
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-slash-lg"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-fonts"></i></button>
            <button type="button" className="btn btn-dark rounded-0"><i class="bi bi-square-fill"></i></button>
        </div><br />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark"><i class="bi bi-triangle-fill"></i></button>
            <button type="button" className="btn btn-dark"><i class="bi bi-circle-fill"></i></button>
        </div>
        </div>
    </div>
  )
}
