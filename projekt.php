<?php
    /* Template Name: Projekt */
    get_header()?>
    <main class="contain h-[50vh] flex justify-center min-h-[340px] mx-auto">
        <section class="text-center flex flex-col items-center w-1/1 h-1/1">
            <h2 class="subPageTitle">Projekt</h2>
            <div id="projektContainer" class=" gap-4 w-1/1 h-1/1">
                <article class="flex flex-col items-center projektCard">
                    <div class="w-[100px] h-[100px] flex items-center justify-center relative projektImgContainer">
                        <svg class="absolute" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="50" fill="url(#paint0_radial_86_653)"/>
                            <defs>
                            <radialGradient id="paint0_radial_86_653" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(73.6184) scale(50)">
                            <stop stop-color="#F5F3E7" stop-opacity="0.9"/>
                            <stop offset="1" stop-color="#F5F3E7" stop-opacity="0"/>
                            </radialGradient>
                            </defs>
                        </svg>
                        <img class="w-[80px] h-[80px] opacity-0" src="<?php echo get_template_directory_uri();?>/assets/images/flapocalypse.png" alt="">
                    </div>

                    <div>
                        <h3 class="projektCardTitle">Flapocaplyse</h3>
                        <p class="projektCardText opacity-0">Socket.IO · Prisma · Vite</p>
                    </div>
                </article>

                <article class=" flex flex-col items-center projektCard">
                    <div class="w-[100px] h-[100px] flex items-center justify-center relative pb-2 projektImgContainer">
                        <svg class="absolute" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="50" fill="url(#paint0_radial_86_653)"/>
                            <defs>
                            <radialGradient id="paint0_radial_86_653" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(73.6184) scale(50)">
                            <stop stop-color="#F5F3E7" stop-opacity="0.9"/>
                            <stop offset="1" stop-color="#F5F3E7" stop-opacity="0"/>
                            </radialGradient>
                            </defs>
                        </svg>
                        <img class="w-[80px] h-[80px] opacity-0" src="<?php echo get_template_directory_uri();?>/assets/images/flapocalypse.png" alt="">
                    </div>

                    <div>
                        <h3 class="projektCardTitle">Flapocaplyse</h3>
                        <p class="projektCardText opacity-0">Socket.IO · Prisma · Vite</p>
                    </div>
                </article>

            </div>
        </section>

    </main>

<?php get_footer()?>