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
        <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
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
<noscript><div><img src="https://mc.yandex.ru/watch/92570829" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
    </head>
    <body>
    <header>
        <nav class="navbar navbar-expand-md bg-body-tertiary header" role="navigation">
            <div class="container-fluid ps-lg-5 pe-lg-5">
                <a class="navbar-brand order-2 order-md-1 me-0" href="/"><img src="images/logo.png" alt="Логотип" class="w-100"
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
                        @php
                            $counter = 0;
                        @endphp    
                        @foreach ($count as $key => $el)
                        @php
                            $counter++;
                            $index = array_column($data, 'category');
                            $index = array_search($key, $index);
                        @endphp    
                            @if ($el === 1 && $counter < 7)                        
                            <li class="nav-item">
                                <a class="nav-link btn-custom mt-2 me-md-2 mt-md-0" href="" data-category="{{ $data[$index]->category }}" data-name="{{ $data[$index]->name }}" data-bg="{{ $data[$index]->bg }}" data-width="{{ $data[$index]->width }}" data-height="{{ $data[$index]->height }}">{{ $data[$index]->category }}</a>
                            </li>
                            @elseif ($el > 1 && $counter < 7)
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle btn-custom mt-2 me-md-2 mt-md-0" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ $key }}</a>
                                <ul class="dropdown-menu">
                                @foreach ($data as $dropdown)
                                    @if ($dropdown->category === $key)
                                    <li><a class="dropdown-item" href="" data-category="{{ $dropdown->category }}" data-name="{{ $dropdown->name }}" data-bg="{{ $dropdown->bg }}" data-width="{{ $dropdown->width }}" data-height="{{ $dropdown->height }}">{{ $dropdown->name }}</a></li>
                                    @endif
                                @endforeach
                                </ul>
                            </li>
                            @elseif ($counter > 2)
                                @if ($counter === 3)
                            <li class="nav-item dropdown dropstart d-flex">
                                <a class="nav-link dropdown-toggle p-0 m-auto" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical fs-4"></i></a>
                                <ul class="dropdown-menu">
                                 @endif                               
                                @if ($el === 1)
                                    <li><a class="dropdown-item" href="" data-category="{{ $data[$index]->category }}" data-name="{{ $data[$index]->name }}" data-bg="{{ $data[$index]->bg }}" data-width="{{ $data[$index]->width }}" data-height="{{ $data[$index]->height }}">{{ $data[$index]->category }}</a></li>
                                @elseif ($el > 1)
                                <li class="dropdown-item dropdown">
                                    <a class="nav-link dropdown-toggle mt-2 mt-md-0" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ $key }}</a>
                                    <ul class="dropdown-menu submenu">
                                    @foreach ($data as $dropdown)
                                        @if ($dropdown->category === $key)
                                        <li><a class="dropdown-item" href="" data-category="{{ $dropdown->category }}" data-name="{{ $dropdown->name }}" data-bg="{{ $dropdown->bg }}" data-width="{{ $dropdown->width }}" data-height="{{ $dropdown->height }}">{{ $dropdown->name }}</a></li>
                                        @endif
                                    @endforeach
                                    </ul>
                                </li>              
                                @endif                  
                            @elseif ($counter === count($count))
                                </ul>
                                </li>
                            @endif
                        @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>        
    <main>
    <div class="container-fluid main">
        <div class="row h-100 pt-5 pb-5 pt-md-0 pb-md-0">
            <div class="col-12 col-md-6 d-flex p-2">
                <div class="m-auto">
                    <h1 class="text-center text-md-start">Тактические доски <br> для компьютерного спорта</h1>
                    <p class="text-center text-md-start">(работай с командой в режиме реального времени)</p>
                </div>
            </div>
            <div class="col-12 col-md-6 d-flex p-2">
                <img src="images/preview.jpg" alt="Dota" class="w-100 m-auto rounded" style="max-width: 500px;" />
            </div>
        </div>
    </div>
    </main>
    <footer>
        <div class="container-fluid footer" style="background: rgba(43, 48, 53, 1);">
            <div class="row h-100">
                <div class="col-12 col-md-6 pt-1 pb-1 pt-md-3 pb-md-3 d-flex">
                    <p class='m-auto text-center'><img src="/images/lesgaft.png" alt="Lesgaft" class="me-3" style="width: 8%;"><span>© Copyright Tacticten. All Rights Reserved</span></p>
                </div>
                <div class="col-12 col-md-6 pt-1 pb-1 pt-md-3 pb-md-3 d-flex">
                    <div class='m-auto text-center'>
                        <a href="https://cyberten.ru" target="_blank"><img data-bs-toggle="tooltip" data-bs-title="Тренажеры для киберспортсменов" src="/images/cyberten.png" alt="cyberten" class="h-100 mt-1 mt-md-0" style="max-height: 42px;"></a>
                        <a href="https://warmten.ru" target="_blank"><img data-bs-toggle="tooltip" data-bs-title="Разминка для киберспортсменов" src="/images/warmten.png" alt="warmten" class="h-100 mt-1 mt-md-0" style="max-height: 16px;"></a><br class="d-md-none">
                        <a href="https://vk.com/cyberlesgaft" target="_blank" class="ps-0 ps-md-2"><img data-bs-toggle="tooltip" data-bs-title="Группа Вконтакте" src="/images/vk.png" alt="vk" class="h-100 mt-1 mt-md-0" style="max-height: 32px;"></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    @vite(['resources/js/home.js'])
    </body>
</html>
