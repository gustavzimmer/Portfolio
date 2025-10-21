<?php
    /* Template Name: Kontakt */
    get_header()?>
    <main class="contain flex items-center justify-center min-h-[340px] pt-[2rem] mx-auto">
        <section class="w-1/1">
            <div class="flex lg:justify-center">
                <h2 class="w-[13ch] subPageTitle lg:text-center lg:w-auto">Låt oss <br class="hidden lg:inline"> arbeta tillsammans!</h2>
            </div>
            
            <div class="flex justify-between items-center">
                <?php echo do_shortcode('[contact-form-7 id="123" title="Kontaktformulär 1"]'); ?>

                <div class="kontaktLinks flex flex-col items-end">
                    <h3 class="kontaktLinksHeader">Direkt kontakt</h3>
                    <p>+46 733-62 73 81</p>
                    <p>gustav.zimmer@hotmail.com</p>
                </div>
            </div>
        </section>

    </main>

<?php get_footer()?>