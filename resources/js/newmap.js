import './bootstrap';
import * as bootstrap from 'bootstrap';

document.addEventListener('DOMContentLoaded', function() {
    let res = prompt('Введите пароль');
    if (res === "etactic") {
        document.body.classList.remove('invisible');
        const form = document.querySelector('#newmap');
        const submit = document.querySelector('#loadmap');
        const bsToast = new bootstrap.Toast('#addToast');
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
        submit.addEventListener('click', function(e) {
            e.preventDefault();
            let data = new FormData(form);            

            fetch(`/createmap`, {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': token
                },
                body: data
            })
            .then((response) => response.text())
            .then((data) => {
                if (data.length > 0) {
                    bsToast.show();
                    form.reset();
                }
            });
        });

        const maps = document.querySelectorAll('.maps a');

        maps.forEach(el => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                const id = this.dataset.id;
                let data = new FormData();
                data.append('id', id);

                fetch(`/removemap`, {
                    method: "POST",
                    headers: {
                        'X-CSRF-TOKEN': token
                    },
                    body: data
                })
                .then((response) => response.text())
                .then((data) => {
                    if (data.length > 0) {
                        el.parentNode.remove();
                    }
                });
            });
        });
    } else {
        window.close();
    }
});