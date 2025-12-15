// Drag-to-resize functionality for canvas
(function() {
    const canvas = document.querySelector('.canvas');
    const handles = document.querySelectorAll('.resize-handle');
    
    let isResizing = false;
    let currentHandle = null;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startLeft = 0;
    let startTop = 0;
    
    handles.forEach(handle => {
        handle.addEventListener('mousedown', initResize);
    });
    
    function initResize(e) {
        isResizing = true;
        currentHandle = e.target;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = canvas.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
        
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        
        e.preventDefault();
    }
    
    function resize(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        if (currentHandle.classList.contains('resize-right')) {
            canvas.style.width = `${startWidth + deltaX}px`;
        } else if (currentHandle.classList.contains('resize-left')) {
            canvas.style.width = `${startWidth - deltaX}px`;
        }
        
        if (currentHandle.classList.contains('resize-bottom')) {
            canvas.style.height = `${startHeight + deltaY}px`;
        } else if (currentHandle.classList.contains('resize-top')) {
            canvas.style.height = `${startHeight - deltaY}px`;
        }
    }
    
    function stopResize() {
        isResizing = false;
        currentHandle = null;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
})();


