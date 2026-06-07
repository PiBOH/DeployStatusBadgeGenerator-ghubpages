/**
 * Script di reindirizzamento con countdown di 3 secondi
 * Indirizza l'utente verso l'URL di destinazione dopo un breve conto alla rovescia.
 */

(function () {
    'use strict';

    // URL di destinazione del reindirizzamento
    const TARGET_URL = 'https://deploy-status-badge-generator.vercel.app/';

    // Durata del conto alla rovescia in secondi
    const REDIRECT_SECONDS = 3;

    // Riferimento all'elemento timer nella pagina
    const timerElement = document.getElementById('timer');

    let secondsLeft = REDIRECT_SECONDS;

    /**
     * Esegue il reindirizzamento verso l'URL di destinazione.
     * Usa 'replace' per non lasciare la pagina corrente nella cronologia.
     */
    function performRedirect() {
        window.location.replace(TARGET_URL);
    }

    /**
     * Aggiorna il timer visibile sulla pagina.
     */
    function updateTimer() {
        if (timerElement) {
            timerElement.textContent = secondsLeft;
        }
    }

    /**
     * Avvia il conto alla rovescia e poi esegue il redirect.
     */
    function startCountdown() {
        updateTimer();

        const intervalId = setInterval(function () {
            secondsLeft--;
            updateTimer();

            if (secondsLeft <= 0) {
                clearInterval(intervalId);
                performRedirect();
            }
        }, 1000);
    }

    // Avvia il processo non appena il DOM è pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startCountdown);
    } else {
        startCountdown();
    }

    // Fallback di sicurezza: se qualcosa va storto, reindirizza comunque
    // dopo REDIRECT_SECONDS + 1 secondo
    setTimeout(function () {
        performRedirect();
    }, (REDIRECT_SECONDS + 1) * 1000);
})();
