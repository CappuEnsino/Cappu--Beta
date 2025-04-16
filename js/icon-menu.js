// icon menu

document.getElementById('userIcon').addEventListener('click', function() {
    var menu = document.getElementById('userConfig');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});


document.addEventListener('click', function(event) {
    var menu = document.getElementById('userConfig');
    var icon = document.getElementById('userIcon');
    if (event.target !== icon && !icon.contains(event.target) && event.target !== menu && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});


// menu hamburguer

document.getElementById('menuHamburguer').addEventListener('click', function() {
    var menu = document.getElementById('userMenu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});


document.addEventListener('click', function(event) {
    var menu = document.getElementById('userMenu');
    var icon = document.getElementById('menuHamburguer');
    if (event.target !== icon && !icon.contains(event.target) && event.target !== menu && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});