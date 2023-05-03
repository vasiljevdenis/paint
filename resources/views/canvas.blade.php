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
    <link rel="shortcut icon" href="{{ config('app.url', '') }}/images/{{ config('app.app_favicon', 'favicon.png') }}"
        type="image/x-icon">

    <!-- Styles -->
    @vite(['resources/sass/canvas.scss'])
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(92570829, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
    </script>
    <noscript>
        <div><img src="https://mc.yandex.ru/watch/92570829" style="position:absolute; left:-9999px;" alt="" /></div>
    </noscript>
    <!-- /Yandex.Metrika counter -->
</head>

<body data-uniqid="{{ $uniqid }}">
    <header>
        <nav class="navbar navbar-expand-md bg-body-tertiary header" role="navigation">
            <div class="container-fluid ps-lg-5 pe-lg-5">
                <a class="navbar-brand order-2 order-md-1" href="/"><img src="/images/logo.png" alt="Логотип"
                        class="w-100" style="max-width: 250px;"></a>
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
        <div class="container-fluid main">
            <div class="row h-100 position-relative">
                <div class="col-12 col-md-2 d-flex justify-content-center toolbar-wrapper">
                    <div class="toolbar text-center m-1 m-md-auto">
                        <div class="btn-group mb-2" role="group" aria-label="Basic example">
                            <a class="nav-link btn-custom me-1" style="width: 40px; min-width: auto;" href="/"
                                title="Домой"><i class="bi bi-house-door-fill"></i></a>
                            <a class="nav-link btn-custom" style="width: 40px; min-width: auto;" href=""
                                title="На весь экран" id="fullscreen"><i class="bi bi-arrows-fullscreen"></i></a>
                            <a class="nav-link btn-custom d-none" style="width: 40px; min-width: auto;" href=""
                                title="Выход из полноэкранного режима" id="screen"><i
                                    class="bi bi-fullscreen-exit"></i></a>
                        </div><br>
                        <div class="border border-secosubtle rounded-2 d-inline-block main-tools">
                            <div class="btn-group" role="group" aria-label="Basic example"
                                style="border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
                                <button title="Трансформирование" id="cursor" type="button" class="btn btn-dark active"
                                    style="border-bottom-left-radius: 0;"><i class="bi bi-cursor-fill"></i></button>
                                <button title="Перемещение холста" id="drag" type="button" class="btn btn-dark"
                                    style="border-bottom-right-radius: 0;"><svg style="width: 16px; height: 16px; fill: #fff;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg></button>
                            </div><br>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button title="Карандаш" id="pencil" type="button" class="btn btn-dark rounded-0"><i
                                        class="bi bi-pencil-fill"></i></button>

                                <button title="Кисть" id="brush" type="button" class="btn btn-dark rounded-0"><i
                                        class="bi bi-brush-fill"></i></button>
                            </div><br>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button title="Заливка" id="bucket" type="button" class="btn btn-dark rounded-0"><i
                                        class="bi bi-paint-bucket"></i></button>
                                <button title="Текст" id="text" type="button" class="btn btn-dark rounded-0"><i
                                        class="bi bi-fonts"></i></button>
                            </div><br>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button title="Прямая линия" id="line" type="button" class="btn btn-dark rounded-0"><i
                                        class="bi bi-slash-lg"></i></button>
                                <button title="Звезда" id="star" type="button" class="btn btn-dark rounded-0"><i
                                        class="bi bi-star-fill"></i></button>
                            </div><br>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button title="Шестиугольник" id="hexagon" type="button"
                                    class="btn btn-dark rounded-0"><i class="bi bi-hexagon-fill"></i></button>
                                <button title="Прямоугольник" id="rectangle" type="button"
                                    class="btn btn-dark rounded-0"><i class="bi bi-square-fill"></i></button>
                            </div><br>
                            <div class="btn-group" role="group" aria-label="Basic example"
                                style="border-top-left-radius: 0; border-top-right-radius: 0;">
                                <button title="Треугольник" id="triangle" type="button" class="btn btn-dark"
                                    style="border-top-left-radius: 0;"><i class="bi bi-triangle-fill"></i></button>
                                <button title="Круг" id="circle" type="button" class="btn btn-dark"
                                    style="border-top-right-radius: 0;"><i class="bi bi-circle-fill"></i></button>
                            </div>
                        </div><br>
                        <input class="mt-2" type="color" id="color" value="#4079c2"><br>
                        <label for="zoom" class="form-label mb-0"><i class="bi bi-zoom-out d-md-none me-4"></i><i
                                class="bi bi-zoom-in d-md-none ms-4"></i><small
                                class="d-none d-md-block">Масштаб</small></label><br>
                        <input title="Масштаб" type="range" class="form-range w-100" id="zoom" min="1" max="5" value="1"
                            step="0.1" style="max-width: 122px;">
                        <div class="text-center brush-width d-none">
                            <label for="brush-width" class="form-label mb-0"><i
                                    class="bi bi-brush d-md-none me-4"></i><i
                                    class="bi bi-brush-fill d-md-none ms-4"></i><small class="d-none d-md-block">Ширина
                                    кисти</small></label><br>
                            <input title="Ширина кисти" type="range" class="form-range w-100" id="brush-width" min="5"
                                max="50" value="15" step="1" style="max-width: 122px;">
                        </div>
                        <button title="Удалить объект" class="nav-link btn-custom p-2" type="button" id="remove"><i
                                class="bi bi-x-lg d-md-none"></i><small class="d-none d-md-block">Удалить
                                объект</small></button>
                        <button title="Очистить" class="nav-link btn-custom p-2 mt-2 ms-auto me-auto" type="button"
                            id="clear"><i class="bi bi-trash3-fill d-md-none"></i><small
                                class="d-none d-md-block">Очистить</small></button>
                    </div>
                </div>
                <div class="col-12 col-md-8 d-flex">
                    <canvas id="canvas"></canvas>
                </div>
                <div class="col-12 col-md-2"></div>
                <div class="ps-3 position-absolute top-0 start-0 d-md-none"><a class="nav-link me-1 d-inline-block"
                        href="" title="Панель инструментов" id="toggler"><small>Инструменты <i
                                class="bi bi-caret-down-fill"></i></small></a></div>
            </div>
        </div>
        <div class="toast align-items-center position-fixed end-0" style="top: 10vh;" role="alert" aria-live="assertive"
        aria-atomic="true" id="zoomToast" data-bs-delay="5000">
        <div class="d-flex">
            <div class="toast-body">
                Жми Alt + ЛКМ для перемещения холста
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    </main>
    <footer>
        <div class="container-fluid footer" style="background: rgba(43, 48, 53, 1);">
            <div class="row h-100">
                <div class="col-12 col-md-6 pt-1 pb-1 pt-md-3 pb-md-3 d-flex">
                    <p class='m-auto text-center'><img src="/images/lesgaft.png" alt="Lesgaft" class="me-3"
                            style="width: 8%;"><span>© Copyright Tacticten. All Rights Reserved</span></p>
                </div>
                <div class="col-12 col-md-6 pt-1 pb-1 pt-md-3 pb-md-3 d-flex">
                    <div class='m-auto text-center'>
                        <a href="https://cyberten.ru" target="_blank"><img data-bs-toggle="tooltip"
                                data-bs-title="Тренажеры для киберспортсменов" src="/images/cyberten.png" alt="cyberten"
                                class="h-100 mt-1 mt-md-0" style="max-height: 42px;"></a>
                        <a href="https://warmten.ru" target="_blank"><img data-bs-toggle="tooltip"
                                data-bs-title="Разминка для киберспортсменов" src="/images/warmten.png" alt="warmten"
                                class="h-100 mt-1 mt-md-0" style="max-height: 16px;"></a><br class="d-md-none">
                        <a href="https://vk.com/cyberlesgaft" target="_blank" class="ps-0 ps-md-2"><img
                                data-bs-toggle="tooltip" data-bs-title="Группа Вконтакте" src="/images/vk.png" alt="vk"
                                class="h-100 mt-1 mt-md-0" style="max-height: 32px;"></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="toast align-items-center position-fixed end-0" style="top: 10vh;" role="alert" aria-live="assertive"
        aria-atomic="true" id="copyToast" data-bs-delay="800">
        <div class="d-flex">
            <div class="toast-body">
                Ссылка скопирована!
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>    
    <script type="application/json" id="json">
        {{ $data }}
    </script>
    @vite(['resources/js/canvas.js'])
</body>

</html>