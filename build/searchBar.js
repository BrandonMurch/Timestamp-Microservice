/*
@description - Takes the input from the search bar, and automaically returns
  the local site appended with /input
@author - Brandon - Brandon.Murch@protonmail.com
*/

window.onload = function() {
                  //reset form on reload
  document.getElementsByClassName("searchBar--form")[0].reset();
  document.getElementsByClassName('btn--submit')[0].onclick = () => {
    window.location  = document.getElementsByClassName('searchBar')[0].value;
  };
  document.onkeydown = function(event){
                  //when enter is pressed, it submits
    if (event.keyCode == 13) {
      event.preventDefault()
      document.getElementsByClassName('btn--submit')[0].click();
    }
  };
};
