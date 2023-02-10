<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="{{ config('app.description', '') }}">
        <meta name="keywords" content="{{ config('app.keywords', '') }}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="{{ config('app.name', '') }}">
        <meta property="og:url" content="{{ config('app.url', '') }}">
        <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">
        <meta property="og:title" content="{{ config('app.title', '') }}">
        <meta property="og:description" content="{{ config('app.description', '') }}">
        <meta property="og:image" content="{{ config('app.app_logo', '') }}">
        <meta property="og:image:width" content="630">
        <meta property="og:image:height" content="630">
        <title>{{ config('app.title', 'Tacticten') }}</title>

        <link rel="canonical" href="{{ config('app.url', '') }}">
        <link rel="shortcut icon" href="{{ config('app.url', '') }}/images/{{ config('app.app_favicon', 'favicon.png') }}" type="image/x-icon">

        <!-- Styles -->
        @vite(['resources/sass/app.scss'])
    </head>
    <body>
    <header>
        <nav class="navbar navbar-expand-md bg-body-tertiary" role="navigation" style="height: 10vh">
            <div class="container-fluid ps-lg-5 pe-lg-5">
                <a class="navbar-brand order-2 order-md-1" href="/"><img src="images/logo.png" alt="Логотип" class="w-100"
                        style="max-width: 250px;"></a>
                <button class="navbar-toggler order-1 order-md-2 border-0" type="button"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-start order-md-2" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close ps-0" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link btn-custom me-md-2" href="#" id="url">Поделиться</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-custom mt-2 mt-md-0" href="#" id="download">Скачать</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div class="container-fluid" style="height: 80vh;">
            <div class="row h-100">
                <div class="col-12 col-md-2 d-flex justify-content-center">
                    <div class="toolbar text-center m-auto">
                    <div class="border border-secosubtle rounded-2 d-inline-block">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button id="cursor" type="button" class="btn btn-dark"><i class="bi bi-cursor-fill"></i></button>
                            <button id="pencil" type="button" class="btn btn-dark"><i class="bi bi-pencil-fill"></i></button>
                        </div><br>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button id="brush" type="button" class="btn btn-dark rounded-0"><i
                                    class="bi bi-brush-fill"></i></button>
                            <button id="eraser" type="button" class="btn btn-dark rounded-0"><i
                                    class="bi bi-eraser-fill"></i></button>
                        </div><br>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button id="bucket" type="button" class="btn btn-dark rounded-0"><i
                                    class="bi bi-paint-bucket"></i></button>
                            <button id="line" type="button" class="btn btn-dark rounded-0"><i class="bi bi-slash-lg"></i></button>
                        </div><br>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button id="text" type="button" class="btn btn-dark rounded-0"><i class="bi bi-fonts"></i></button>
                            <button id="rectangle" type="button" class="btn btn-dark rounded-0"><i
                                    class="bi bi-square-fill"></i></button>
                        </div><br>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button id="triangle" type="button" class="btn btn-dark"><i class="bi bi-triangle-fill"></i></button>
                            <button id="circle" type="button" class="btn btn-dark"><i class="bi bi-circle-fill"></i></button>
                        </div>
                    </div><br>
                    <input style="margin-left: 10;" type="color" id="color"><br>
                    <button type="button" id="remove">Удалить объект</button>
                    </div>
                </div>
                <div class="col-12 col-md-8 d-flex">
                    <canvas id="canvas" class="m-auto" width="500" height="500">
                </div>
                <div class="modal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Введите ваше имя</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <input type="text">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <div class="container-fluid" style="background: rgba(43, 48, 53, 1); height: 10vh;">
            <div class="row h-100">
                <div class="col-12 pt-3 pb-3 d-flex">
                    <p class='m-auto'>© Copyright Tacticten. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
        @vite(['resources/js/canvas.js'])
    </body>
</html>
