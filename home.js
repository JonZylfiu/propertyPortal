    function showSlideBar(){
const slidebar=document.querySelector('.slidebar')
slidebar.style.display='flex';
        }
        function closeSlideBar(){
            const slidebar=document.querySelector('.slidebar')
            slidebar.style.display='none';
        }


  $(window).scroll(function(){
            $("#animationp").fadeIn(1000);

            
        }) 




   $(window).scroll(function(){
            $(".item").fadeIn(1000);
        })        

  
     $(window).scroll(function(){
            $(".aboutUs-img ").fadeIn(1000);
              $(".aboutUscontent").fadeIn(1000);

        })        

          
        
       