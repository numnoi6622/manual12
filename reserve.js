document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reserve-form');
    const submitBtn = document.getElementById('submit-btn');
    const modal = document.getElementById('success-modal');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        if(!form.checkValidity()) {
            return;
        }

        // Get values
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        // Button loading state
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "กำลังดำเนินการ...";
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Populate summary
            document.getElementById('summary-name').innerText = name;
            // Format date DD/MM/YYYY
            const d = new Date(date);
            document.getElementById('summary-date').innerText = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
            document.getElementById('summary-time').innerText = time;
            document.getElementById('summary-guests').innerText = guests;

            // Show modal
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);

            // Reset button
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
});
