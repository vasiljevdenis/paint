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
    <body class="invisible">
    <header>
        <nav class="navbar navbar-expand-md bg-body-tertiary" role="navigation" style="height: 10vh;">
            <div class="container-fluid ps-lg-5 pe-lg-5">
                <a class="navbar-brand order-2 order-md-1" href="/"><img src="images/logo.png" alt="Логотип" class="w-100"
                        style="max-width: 250px;"></a>
            </div>
        </nav>
    </header>        
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <form class="mt-5 mb-5" id="newmap">
                        <div class="mb-3">
                            <label for="map-category" class="form-label">Название игры</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon3">/images/maps/</span>
                                <input type="text" class="form-control" name="category" id="map-category" aria-describedby="basic-addon3"
                                    placeholder="Например: Dota 2">
                            </div>
                            <div class="form-text">Используйте только латинские буквы.</div>
                        </div>
                        <div class="mb-3">
                            <label for="map-name" class="form-label">Название карты</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon3">/images/maps/GAME/</span>
                                <input type="text" class="form-control" name="name" id="map-name" aria-describedby="basic-addon3"
                                    placeholder="Например: de_train">
                            </div>
                            <div class="form-text">Используйте только латинские буквы.</div>
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="bgImage"><i class="bi bi-image-fill"></i></label>
                            <input type="file" name="bg" class="form-control" id="bgImage" accept=".jpg, .jpeg, .png">
                        </div>
                        <a class="nav-link btn-custom p-2" href="" id="loadmap" style="min-width: auto; width: 100px;">Загрузить</a>
                    </form>
                </div>
            </div>
        </div>
        <div class="container-fluid mt-5 mb-5">
            <div class="row maps">
                @foreach ($data as $el)
                    <div class="col-12 col-md-6 col-lg-4 text-center p-1 p-md-2" data-id="{{ $el->id }}">
                        <img src="{{ $el->bg }}" alt="{{ $el->name }}" class="w-100 mt-1 mb-1" style="max-width: 400px;">
                        <h5>{{ $el->category }}</h5>
                        <p>{{ $el->name }}</p>
                        <p class="text-muted">{{ $el->created }}</p>
                        <a href="" data-id="{{ $el->id }}">Удалить</a>
                    </div>
                @endforeach
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
    <div class="toast align-items-center position-fixed end-0" style="top: 10vh;" role="alert" aria-live="assertive" aria-atomic="true" id="addToast" data-bs-delay="3000">
  <div class="d-flex">
    <div class="toast-body">
      Успешно добавлено!
    </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>

    @vite(['resources/js/newmap.js'])
    </body>
</html>