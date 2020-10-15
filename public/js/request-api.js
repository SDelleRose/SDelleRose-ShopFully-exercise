
let flyersGrid = document.getElementById('flyersGrid');


// function to shorten titles
function title_reducer(title) {
    if (title.length >= 15) {
        return title.substr(0, 14) + "...";
    } else {
        return title;
    }
}



// dates from 2020-12-05 to 05/12
function rephrase_date(date) {
    let arr = date.split('-');
    return arr[2] + '/' + arr[1]
}


// generate flyer skeletons
for (let i = 0; i < 100; i++) {
    flyersGrid.innerHTML +=
        '<div class="skeleton"></div>'
}
let skeletonsArr = document.getElementsByClassName('skeleton')



// data request for flyers
function request_api(page) {

    // blocks the function if you click on the left arrow of the first page
    if (page == 0) {
        return;
    }

    // replace deleted flyer skeletons
    for (let i = 0; i < skeletonsArr.length; i++) {
        if (skeletonsArr[i].style.display == 'none') {
            skeletonsArr[i].style.display = 'initial'
        }
    }

    // request api
    let url = "http://localhost:3100/api/flyers?page=" + (page || 1) + "&limit=100"
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function () {
        let FlyersData = JSON.parse(request.response)

        let number_pages = FlyersData.pages;
        if (page > number_pages) {
            return;
        }

        let current_page = +page || 1;
        pagination(current_page, number_pages)


        for (let i = 0; i < FlyersData.items; i++) {
            skeletonsArr[i].innerHTML =
                '<div class="flyersGrid__item">' +

                '<div class="flyer_image" data-content="' + FlyersData.data[i].retailer + '">' +
                '</div>' +
                '<p class="flyer_title">' + title_reducer(FlyersData.data[i].title) + '</p>' +
                '<p class="retailer_name">' + FlyersData.data[i].retailer + '</p>' +

                '<p class="end_date">Scade il ' + rephrase_date(FlyersData.data[i].end_date) + '</p>' +
                '<input type="image" src="/static/img/heart-off.svg" id="flyers-' + FlyersData.data[i].id + '" value="' + FlyersData.data[i].id + '"' +
                'onclick="change_preference(\'flyers-' + FlyersData.data[i].id + '\', ' + FlyersData.data[i].id + ', \'' + FlyersData.data[i].title + '\', \'' + FlyersData.data[i].start_date + '\', \'' + FlyersData.data[i].end_date + '\', \'' + FlyersData.data[i].retailer + '\', \'' + FlyersData.data[i].category + '\')"' +
                ' alt="not favorite" class="heart">' +
                '<p class="category_name">' + FlyersData.data[i].category + '</p>' +

                '</div>'
        }

        // delete extra flyer skeletons
        if (FlyersData.items < skeletonsArr.length) {
            for (let i = FlyersData.items; i < skeletonsArr.length; i++) {
                skeletonsArr[i].innerHTML = '';
                skeletonsArr[i].style.display = 'none';
            }
        }

        window_hearts_state();

        // add flyer images only at the end
        let arr_flyer_images = document.getElementsByClassName('flyer_image');
        setTimeout(function () {
            for (let i = 0; i < arr_flyer_images.length; i++) {

                arr_flyer_images[i].innerHTML =
                    '<img class="blur" src="/static/img/front-flyers/' + arr_flyer_images[i].dataset.content + '.jpg">' +
                    '<img class="img" src="/static/img/front-flyers/' + arr_flyer_images[i].dataset.content + '.jpg" alt="' + arr_flyer_images[i].dataset.content + '">'

            }
        }, 800)
    }

}

request_api()




