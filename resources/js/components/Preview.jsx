import React from 'react'

export default function Preview() {
  return (
    <div className="container-fluid" style={{height: '80vh'}}>
        <div className="row h-100">
            <div className="col-12 col-md-6 d-flex p-2">
                <h1 className="m-auto">Создай свою уникальную карту</h1>
            </div>
            <div className="col-12 col-md-6 d-flex p-2">
                <img src="images/dota.jpg" alt="Dota" className="w-100 m-auto" style={{maxWidth: '500px'}} />
            </div>
        </div>
    </div>
  )
}
