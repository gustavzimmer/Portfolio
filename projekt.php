<?php
    /* Template Name: Projekt */
    get_header()?>
    <main class="contain h-[50vh] flex justify-center min-h-[340px] mx-auto">
    <section id="projects-sky" class="projects-sky" aria-labelledby="projects-sky-title">
        <h2 id="projects-sky-title" class="sr-only">Mina projekt – stjärnkarta</h2>
        <canvas id="sky-canvas" aria-hidden="true"></canvas>
        <div id="stars-layer" class="stars-layer" role="list"></div>

        <!-- Tooltip (visas vid hover/fokus) -->
        <div id="star-tooltip" class="star-tooltip" role="status" aria-live="polite"></div>

        <!-- Modal för projekt -->
        <div id="project-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
            
            <div class="modal-card" role="document">
            <button class="modal-close" aria-label="Stäng" data-close>&times;</button>
            <div class="modal-header">
                <h3 id="modal-title"></h3>
                <p id="modal-subtitle" class="modal-subtitle"></p>
            </div>
            <div id="modal-body" class="modal-body"></div>
            <div class="modal-actions">
                <a id="modal-link" class="btn" target="_blank" rel="noopener">Besök projekt</a>
            </div>
            </div>
        </div>
        </section>

    </main>

<?php get_footer()?>