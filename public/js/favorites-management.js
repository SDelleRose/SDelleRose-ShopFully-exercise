let preferred_flyers_list = document.getElementById('preferred_flyers_list');
let open_side_menu = document.getElementById('open_side_menu');
let side_menu = document.getElementById('side_menu');
let shadow_side_menu = document.getElementById('shadow_side_menu');
let close_side_menu = document.getElementById('close_side_menu');


// constructor for save favorite flyers
function Favorite(id, title, start_date, end_date, is_published, retailer, category) {
    this.id = id;
    this.title = title;
    this.start_date = start_date;
    this.end_date = end_date;
    this.is_published = is_published;
    this.retailer = retailer;
    this.category = category;
}

// create 'favorites' in localStorage
if (localStorage.favorites == undefined) {
    let favorites = [];
    localStorage.favorites = JSON.stringify(favorites);
}



open_side_menu.onclick = function () {
    side_menu.classList.remove('side_menu_exit')
    side_menu.style.display = 'initial';
    // add animation
    side_menu.classList.add('side_menu_entry')


    let array_favorites = JSON.parse(localStorage.getItem("favorites"));
    preferred_flyers_list.innerHTML = '';

    // show favorites
    array_favorites.forEach(function (element) {
        preferred_flyers_list.innerHTML += '<li class="flyer_title" id="li-' + element.id + '">' +

            '<input type="image" src="/static/img/heart-on.svg" id="flyers-favorite-' + element.id + '"' +
            ' onclick="remove_favorite(document.getElementById(\'flyers-' + element.id + '\'), ' + element.id + ',\'li-' + element.id + '\')"' +
            'alt="favorite" class="heart">' +

            element.title +
            '</li>'
        // corrects animation times                          
        setTimeout(function () {
            shadow_side_menu.style.display = 'initial';
        }, 500)
    });



}


function closeMenu() {
    side_menu.classList.remove('side_menu_entry')
    side_menu.classList.add('side_menu_exit')

    // corrects animation times 
    setTimeout(function () {
        side_menu.style.display = 'none';
        shadow_side_menu.style.display = 'none';
    }, 700)
}

close_side_menu.onclick = function () {
    closeMenu()
}
shadow_side_menu.onclick =function () {
    closeMenu()
}


// click heart-off function (add flyer in localStorage)
function add_favorite(input, id, title, start_date, end_date, is_published, retailer, category) {

    let favorites_list = JSON.parse(localStorage.getItem("favorites"));
    favorites_list.push(new Favorite(id, title, start_date, end_date, is_published, retailer, category));

    localStorage.setItem("favorites", JSON.stringify(favorites_list));

    // changes the appearance of the heart
    input.src = "/static/img/heart-on.svg";
    input.alt = "favorite";
}

// click heart-on function (remove flyer from localStorage)
function remove_favorite(input, id, forList) {
    let favorites_list = JSON.parse(localStorage.getItem("favorites"));

    let id_position
    for (let i = 0; i < favorites_list.length; i++) {
        if (favorites_list[i].id == id) {
            id_position = i;
            break
        }
    }
    favorites_list.splice(id_position, 1)
    localStorage.setItem("favorites", JSON.stringify(favorites_list));

    // if input is on the current page
    if (input != null) {
        input.src = "/static/img/heart-off.svg";
        input.alt = "not favorite";
    }

    // for hearts in side-menu
    if (forList != undefined) {
        document.getElementById(forList).style.display = 'none';
    }
}

// heart onclick
function change_preference(input_id, id, title, start_date, end_date, retailer, category) {
    let input = document.getElementById(input_id)

    if (input.alt == 'not favorite') {
        add_favorite(input, id, title, start_date, end_date, retailer, category)
    } else {
        remove_favorite(input, id)
    }
}

// in page show preferred flyers
function window_hearts_state() {
    let array_favorites = JSON.parse(localStorage.getItem("favorites"));
    let array_hearts = document.getElementsByClassName("heart");

    for (let i = 0; i < array_favorites.length; i++) {
        for (let e = 0; e < array_hearts.length; e++) {
            if (array_favorites[i].id == array_hearts[e].value) {
                array_hearts[e].src = "/static/img/heart-on.svg";
                array_hearts[e].alt = "favorite";
            }
        }
    }
}