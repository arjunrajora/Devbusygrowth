const fs = require('fs');
const path = require('path');

// Let's create a script that generates a PDF and tests both orientation and cropped QR rendering
const { generateInvoicePDF } = require('./pdf-generator-test');

console.log("Ready to test QR orientation");
