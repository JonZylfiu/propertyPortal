
fetch('../html/Navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    initNavbar();
});


function initNavbar() {
    
    const openBtn = document.querySelector('#openMenu-btn');
    const closeBtn = document.querySelector('#closeMenu-btn');
    
    const slidebar = document.querySelector('.slidebar');
    const links = document.querySelectorAll(".link");
    const title = document.getElementById("casafindname");

    
    if(location.pathname.split("/")[2] != "homePage.html") {
        title.classList.add("active");
        links.forEach((link) => {
            link.classList.add("active");
        })
        openBtn.classList.add("active")
        closeBtn.classList.add("active")
    }

    if (openBtn && slidebar) {
        openBtn.addEventListener('click', () => {
            slidebar.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            slidebar.style.display = 'none';
        })
    }
}