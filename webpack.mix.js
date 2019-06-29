const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//mix.react('resources/js/app.js', 'public/js')
//   .sass('resources/sass/app.scss', 'public/css');

// index of site
mix.react('resources/js/Index.js' , 'public/js') ;

// manage file react 
mix.react('resources/js/Manage.js', 'public/js') ;

mix.react('resources/js/UserPage.js' , 'public/js') ;


mix.react('resources/js/LoginReg.js' , 'public/js') ;

