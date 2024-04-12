var slideIndex = 0;
    var slides = document.getElementsByClassName("mySlides");
    var timer = null;

    function showSlides() {
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex-1].style.display = "block";
        timer = setTimeout(showSlides, 3000); 
    }

    function plusSlides(n) {
        clearTimeout(timer); 
        slideIndex += n - 1;
        showSlides();
    }

    showSlides(); 