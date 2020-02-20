$(document).ready(function() {

    //SCROLL
    $('a[data-target^="anchor"]').on('click.smoothscroll', function() {
        var target = $(this).attr('href');
        var bl_top = $(target).offset().top - 50;
        $('body, html').animate({ scrollTop: bl_top }, 500)
        return false;

    });


    //FIXED HEADER
    let header = $('.header');
    header.removeClass('defoult');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 90) {
            header.addClass('defoult');
        } else {
            header.removeClass('defoult');
        }

    })


});


//CARD ROTATE
var cards = document.querySelectorAll('.portfolio__cards');

for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
}

function startRotate(event) {
    var cardItem = this.querySelector('.portfolio__card');
    var halfHeight = cardItem.offsetHeight / 2;
    var halfWidth = cardItem.offsetWidth / 2;
    cardItem.style.transform = 'rotateX(' + -(event.offsetY - halfHeight) / 5 + 'deg) rotateY(' + (event.offsetX - halfWidth) / 30 + 'deg)';
}

function stopRotate(event) {
    var cardItem = this.querySelector('.portfolio__card');
    cardItem.style.transform = 'rotateX(0)';
};


//PROGRESS BAR

var canvas = document.getElementsByTagName('canvas');

// load the canvas
function progressBar(canvasId) {
    var degreesCall;

    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    // declare some variables
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    var progressColor = 'white';
    var circleColor = 'transparent';
    var rawPerc = canvas.getAttribute('data-perc');
    var definition = canvas.getAttribute('data-text');
    var perc = parseInt(rawPerc);
    var degrees = 0;
    var endDegrees = 360 * perc / 100;

    var lineWidth = 2; // The 'brush' size

    // console.log(canvasId+' '+perc);

    function getDegrees() {
        if (degrees < endDegrees) {
            degrees++;
        } else {
            clearInterval(degreesCall);
        }

        drawProgressBar();
    }

    function drawProgressBar() {
        //clear the canvas after every instance
        ctx.clearRect(0, 0, cWidth, cHeight);

        // let's draw the background circle
        ctx.beginPath();
        ctx.strokeStyle = circleColor;
        ctx.lineWidth = lineWidth - 6;
        ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0, Math.PI * 2, false);
        ctx.stroke();
        var radians = 0; // We need to convert the degrees to radians

        radians = degrees * Math.PI / 180;
        // let's draw the actual progressBar
        ctx.beginPath();
        ctx.strokeStyle = progressColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
        ctx.stroke();

        // let's get the text
        ctx.fillStyle = progressColor;
        ctx.font = '18px Thasadith';
        var outputTextPerc = Math.floor(degrees / 360 * 100) + '%';
        var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
        var outputTextDefinitionWidth = ctx.measureText(definition).width;
        ctx.fillText(outputTextPerc, cWidth / 2 - outputTextPercWidth / 2, cHeight / 2 + 5);
        // ctx.fillText(definition, cWidth/2 - outputTextDefinitionWidth/2, cHeight/2 + 15);
    }

    degreesCall = setInterval(getDegrees, 10 / (degrees - endDegrees));
}

//PROGRESSBAR START

$(window).on('load scroll', function() {
    var st = $(this).scrollTop();
    var portfolio = $('#skills');
    var portfolioSt = portfolio.offset().top - 200;
    if (!portfolio.hasClass('portfolio--done') && st >= portfolioSt) {
        portfolio.addClass('portfolio--done');
        for (var i = 0; i < canvas.length; i++) {
            progressBar(canvas[i].id);
        }
    }
});