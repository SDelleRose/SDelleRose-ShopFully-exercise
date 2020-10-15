let input_page_left = document.getElementById('input_page_left');
let input_page_first = document.getElementById('input_page_first');
let input_page_first_dots = document.getElementById('input_page_first_dots');
let input_page_a = document.getElementById('input_page_a');
let input_page_b = document.getElementById('input_page_b');
let input_page_c = document.getElementById('input_page_c');
let input_page_d = document.getElementById('input_page_d');
let input_page_e = document.getElementById('input_page_e');
let input_page_f = document.getElementById('input_page_f');
let input_page_last_dots = document.getElementById('input_page_last_dots');
let input_page_last = document.getElementById('input_page_last');
let input_page_right = document.getElementById('input_page_right');


// function to create pagination
function pagination(current_page, number_pages) {

    input_page_left.value = current_page - 1;
    input_page_right.value = current_page + 1;
    input_page_last.value = number_pages;

   
    if (current_page >= 3) {
        input_page_a.value = current_page - 2;
        input_page_b.value = current_page - 1;
        input_page_c.value = current_page;
        if (input_page_c.value != number_pages) {
            input_page_d.style.display = 'initial'
            input_page_d.value = current_page + 1;
        } else {
            input_page_d.style.display = 'none'
        }
    } else {
        input_page_a.value = 1;
        input_page_b.value = 2;
        input_page_c.value = 3;
        input_page_d.style.display = 'none'
    }


    if (current_page > 4) {
        input_page_first.style.display = 'initial'
        input_page_first_dots.style.display = 'initial'
    } else {
        input_page_first.style.display = 'none'
        input_page_first_dots.style.display = 'none'
    }


    if (current_page > number_pages - 3) {
        input_page_last_dots.style.display = 'none'
    } else {
        input_page_last_dots.style.display = 'initial'
    }


    if ((current_page > number_pages - 2) || (number_pages<=3)) {
        input_page_last.style.display = 'none'
    } else {
        input_page_last.style.display = 'initial'
    }


    // select current page
    let array_inputs_page = document.getElementsByClassName('page_input')
    for (let i = 0; i < array_inputs_page.length; i++) {
        if ((array_inputs_page[i].value == current_page)) {
            array_inputs_page[i].classList.add('current');
        } else {
            array_inputs_page[i].classList.remove('current');
        }

    }
}