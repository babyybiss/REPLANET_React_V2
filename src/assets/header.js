/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function responsiveHeader() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function toggleMenu() {

    let NavBar = document.querySelector(".navbar");
    
    NavBar.classList.toggle("open");
  }

  // JavaScript for comment toggle

// JavaScript for comment toggle

function toggleComments() {
  var menu = document.querySelector('.menu');
  var comments = document.getElementById("comments");
  var commentToggle = document.querySelector(".icon i");

  if (comments.style.display === "none" || comments.style.display === "") {
    comments.style.display = "block";
    commentToggle.className = "fa fa-comment-open";
  } else {
    comments.style.display = "none";
    commentToggle.className = "fa fa-comment";
  }
}


