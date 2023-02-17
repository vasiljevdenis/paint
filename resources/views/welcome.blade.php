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
        <nav class="navbar navbar-expand-md bg-body-tertiary" role="navigation" style="height: 10vh;">
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
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" id="maps">
                            <li class="nav-item">
                                <a class="nav-link btn-custom me-md-2" href="" data-category="dota2" data-name="dota2" data-bg="/images/maps/dota2/dota2.jpg">Dota 2</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle btn-custom mt-2 mt-md-0" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">CS:GO</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="" data-category="cs-go" data-name="de_inferno" data-bg="/images/maps/CS/inferno.jpg">de_inferno</a></li>
                                    <li><a class="dropdown-item" href="" data-category="cs-go" data-name="de_nuke" data-bg="/images/maps/CS/nuke.jpg">de_nuke</a></li>
                                    <li><a class="dropdown-item" href="" data-category="cs-go" data-name="de_mirage" data-bg="/images/maps/CS/mirage.jpg">de_mirage</a></li>
                                </ul>
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
            <div class="col-12 col-md-6 d-flex p-2">
                <h1 class="m-auto">Тактические доски <br> для компьютерного спорта</h1>
            </div>
            <div class="col-12 col-md-6 d-flex p-2">
                <img src="images/preview.jpg" alt="Dota" class="w-100 m-auto rounded" style="max-width: 500px;" />
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

    @vite(['resources/js/home.js'])
    </body>
</html>
