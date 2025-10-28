<?php
    add_action('wp_enqueue_scripts', function () {
        wp_dequeue_script('scrolltrigger');
        wp_deregister_script('scrolltrigger');
        wp_dequeue_script('gsap-scrolltrigger');
        wp_deregister_script('gsap-scrolltrigger');
    }, 5);

    add_action('after_setup_theme', function () {
        register_nav_menus(array(
            'footer_navigation' => __('Footer navigation', 'portfolio'),
        ));
    });

    function portfolio_footer_menu_fallback() {
        echo '<ul class="nav nav__list">';
        echo '<li class="menu-item"><a class="nav-hover-effekt" href="/om-mig">' . esc_html__('Om mig', 'portfolio') . '</a></li>';
        echo '<li class="menu-item"><a class="nav-hover-effekt" href="/projekt">' . esc_html__('Projekt', 'portfolio') . '</a></li>';
        echo '<li class="menu-item"><a class="nav-hover-effekt" href="/kontakt">' . esc_html__('Kontakt', 'portfolio') . '</a></li>';
        echo '</ul>';
    }

    add_filter('nav_menu_link_attributes', function ($atts, $item, $args) {
        if (isset($args->theme_location) && 'footer_navigation' === $args->theme_location) {
            $existing = isset($atts['class']) ? $atts['class'] . ' ' : '';
            $atts['class'] = $existing . 'nav-hover-effekt';
        }
        return $atts;
    }, 10, 3);
    
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

        wp_enqueue_script('gsap-js',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
        [], '3.13.0', true);
    
      // Plugins (alla är gratis i 3.13)
      wp_enqueue_script('gsap-draggable',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js',
        ['gsap-js'], '3.13.0', true);
    
      wp_enqueue_script('gsap-inertia',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js',
        ['gsap-js'], '3.13.0', true);
    
      wp_enqueue_script('gsap-scramble',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js',
        ['gsap-js'], '3.13.0', true);
    
      // ditt app.js – beroende på pluginsen:
      $app_path = get_stylesheet_directory() . '/js/app.js';
      wp_enqueue_script('gsap-app',
        get_stylesheet_directory_uri() . '/js/app.js',
        ['gsap-js','gsap-draggable','gsap-inertia','gsap-scramble'],
        filemtime($app_path), true);
    }
    add_action('wp_enqueue_scripts', 'theme_scripts', 50);


