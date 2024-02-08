$(document).ready(function () {
   
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });
    $(window).on("scroll load", function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
         
       if (window.scrollY > 60) {
        document.querySelector("#scroll-top").classList.add('active');
        } else {
            document.querySelector("#scroll-top").classList.remove('active');
        }
        
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $(".navbar").find(`[href="#${id}"]`).addClass('active');
            }
        });

    });

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

});

const srtop = ScrollReveal({
    origin:'top',
    distance:'80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3', {delay:200 });
srtop.reveal('.home .content p', {delay:200 });
srtop.reveal('.home .content btn', { delay:200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });

srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

srtop.reveal('.education .box', { interval: 200 });

srtop.reveal('.work .box', { interval: 200 });

srtop.reveal('.experience .timeline',{ delay: 400});
srtop.reveal('.experience .timeline .container',{ interval: 400});

srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });




document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Urja Joshi";
            $("#favicon").attr("href", "");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    }
    );

 var typed = new Typed(".typing-text", {
        strings: ["Professor", "Researcher"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 100,
        
 });

 $("#contact-form").submit(function (event) {
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

    emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
        .then(function (respone) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById("contact-form").reset();
            alert("Form Submitted Successfully");
        }, function (error) {
            console.log("FAILED...", error);
            alert("Form Submission Failed! Try Again");
        }
        );
     event.preventDefault();   
 });

 function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";

    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
        <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
        <div class="content">
           <div class="tag">
           <h3>${project.name}</h3>
           </div>
            <div class="desc">
            <p>${project.desc}</p>
            <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View </a>
                </div>
                </div>
                </div>
                </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

   

    
 }

 fetchData().then(data => {
    showSkills(data);
 });

 fetchData("projects").then(data => {
    showProjects(data);
 });

 VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects.json")
    const data = await response.json();
    return data;
}

