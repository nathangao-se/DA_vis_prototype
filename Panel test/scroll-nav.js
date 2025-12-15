// Intersection-based navigation buttons for panel 3
(function() {
    const panel3 = document.getElementById('visualization');
    const vizCard = document.getElementById('visualization-card');
    const tableCard = document.getElementById('table-card');
    const vizButton = document.getElementById('scroll-to-viz');
    const tableButton = document.getElementById('scroll-to-table');
    
    let vizVisible = true;
    let tableVisible = true;
    
    // Scroll to visualization card
    vizButton.addEventListener('click', () => {
        vizCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Scroll to table card
    tableButton.addEventListener('click', () => {
        tableCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Update button visibility based on card visibility
    function updateButtons() {
        // Show viz button when viz card is not fully visible
        vizButton.style.display = !vizVisible ? 'block' : 'none';
        
        // Show table button when table card is not fully visible
        tableButton.style.display = !tableVisible ? 'block' : 'none';
    }
    
    // IntersectionObserver to detect when cards are fully visible in panel 3
    const observerOptions = {
        root: panel3,
        threshold: [0, 0.05, 0.95, 1],
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Card is considered obscured if 95% or more is out of view (only 5% visible)
            const isMostlyObscured = entry.intersectionRatio < 0.05;
            
            if (entry.target === vizCard) {
                // Viz button shows when viz card is mostly obscured
                vizVisible = !isMostlyObscured;
            } else if (entry.target === tableCard) {
                // Table button shows when table card is mostly obscured
                tableVisible = !isMostlyObscured;
            }
        });
        
        updateButtons();
    }, observerOptions);
    
    observer.observe(vizCard);
    observer.observe(tableCard);
    
    // ResizeObserver to re-check visibility when container resizes
    const resizeObserver = new ResizeObserver(() => {
        // Force intersection observer to re-evaluate
        observer.disconnect();
        observer.observe(vizCard);
        observer.observe(tableCard);
    });
    
    resizeObserver.observe(panel3);
    
    // Initial check
    updateButtons();
})();

