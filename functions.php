<?php
    function theme_scripts() {

        $style_ver = filemtime( get_stylesheet_directory() . '/build/index.css' );
        wp_enqueue_style( 'standard-style', get_stylesheet_directory_uri() . '/build/index.css', '', $style_ver );

        $style_ak = filemtime( get_stylesheet_directory() . '/theme.css' );
        wp_enqueue_style( '', get_stylesheet_directory_uri() . '/theme.css', '', $style_ak );
        
        $scriptsrc = get_stylesheet_directory_uri() . '/js/script.js';
        wp_register_script( 'myScript', $scriptsrc , array('jquery'), '3.7.1',  true );
        wp_enqueue_script( 'myScript' );

    }   
    add_action("wp_enqueue_scripts", "theme_scripts");






