const elements = document.querySelectorAll(".feature-card, .stat, .hero");


elements.forEach(element => {

    element.classList.add("reveal");

});



const observer = new IntersectionObserver(entries => {


    entries.forEach(entry => {


        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }


    });


});



elements.forEach(element => {

    observer.observe(element);

});
