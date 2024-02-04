// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


//
// Place any custom JS here
//

import "../../js/search.js";

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new bootstrap.Popover(popover)
  })
