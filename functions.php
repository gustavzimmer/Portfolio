<?php
    function theme_scripts() {

        $style_ver = filemtime( get_stylesheet_directory() . '/build/index.css' );
        wp_enqueue_style( 'standard-style', get_stylesheet_directory_uri() . '/build/index.css', '', $style_ver );

        $style_ak = filemtime( get_stylesheet_directory() . '/assets/styles/theme.css' );
        wp_enqueue_style( 'theme-style', get_stylesheet_directory_uri() . '/assets/styles/theme.css', '', $style_ak );

        $style_kontakt = filemtime( get_stylesheet_directory() . '/assets/styles/kontakt.css' );
        wp_enqueue_style( 'kontakt-style', get_stylesheet_directory_uri() . '/assets/styles/kontakt.css', '', $style_kontakt );
        
        $style_projekt = filemtime( get_stylesheet_directory() . '/assets/styles/projekt.css' );
        wp_enqueue_style( 'projekt-style', get_stylesheet_directory_uri() . '/assets/styles/projekt.css', '', $style_projekt );

        $style_om = filemtime( get_stylesheet_directory() . '/assets/styles/om-mig.css' );
        wp_enqueue_style( 'om-mig-style', get_stylesheet_directory_uri() . '/assets/styles/om-mig.css', '', $style_om );

        $scriptsrc = get_stylesheet_directory_uri() . '/js/script.js';
        wp_register_script( 'myScript', $scriptsrc , array('jquery'), '3.7.1',  true );
        wp_enqueue_script( 'myScript' );

        $scriptsrc = get_stylesheet_directory_uri() . '/js/projekt.js';
        wp_register_script( 'ProjektScript', $scriptsrc , array('jquery'), '3.7.1',  true );
        wp_enqueue_script( 'ProjektScript' );

    }   
    add_action("wp_enqueue_scripts", "theme_scripts");






