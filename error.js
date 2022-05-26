'use strict';
function error(request, response) {
  response.status(404).send('error found');
}


module.exports = error;
