<!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <?php wp_head() ?>
</head>
<body <?php body_class("bg-bg text-text h-[100dvh] min-h-[580px]"); ?> >
<?php wp_body_open(); ?>


<header id="preload" class="flex items-center contain py-[2rem] h-[150px] mx-auto">
    <div class="moon-wrapper">
        <svg class="moon" width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="75" cy="75" r="75" fill="url(#paint0_radial_16_3263)" />
            <defs>
                <radialGradient id="paint0_radial_16_3263" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(75 75) rotate(73.6184) scale(75)">
                <stop stop-color="#F5F3E7" stop-opacity="0.9" />
                <stop offset="1" stop-color="#F5F3E7" stop-opacity="0" />
                </radialGradient>
            </defs>
        </svg>
    </div>

    <div class="headerLink flex flex-col  md:flex-row gap-4 opacity-70">
        <a href="">+46-733 62 73 81</a>
        <a href="">gustav.zimmer@hotmail.com</a>
    </div>
</header>