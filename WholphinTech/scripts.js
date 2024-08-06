document.getElementById('toggle-button').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');

    // Adjust the main content margin based on sidebar visibility
    const mainContent = document.getElementById('main-content');
    if (sidebar.classList.contains('hidden')) {
        mainContent.style.marginLeft = '0';
    } else {
        mainContent.style.marginLeft = '250px';
    }

});