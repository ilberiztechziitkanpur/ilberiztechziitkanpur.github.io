document.getElementById('download-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('video-url').value;
    const convertForTelegram = document.getElementById('convert-telegram').checked;
    
    const submitBtn = document.getElementById('download-btn');
    const statusArea = document.getElementById('status-area');
    const resultArea = document.getElementById('result-area');
    const statusText = document.getElementById('status-text');
    
    // UI Updates
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').innerText = 'Processing...';
    statusArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    
    const downloadId = Date.now().toString() + Math.random().toString().substr(2, 5);
    let pollInterval;

    try {
        pollInterval = setInterval(async () => {
            try {
                const res = await fetch(`/progress/${downloadId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === 'downloading') {
                        statusText.innerHTML = `Downloading... <strong style="color: #a78bfa; font-size: 1.1em;">${data.progress}</strong><br><small style="color: #9ca3af; display: block; margin-top: 4px;">Speed: ${data.speed} &bull; ETA: ${data.eta}</small>`;
                    } else if (data.status === 'starting') {
                        statusText.innerHTML = `Starting download... Please wait.`;
                    }
                }
            } catch(e) {}
        }, 1000);

        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                convertForTelegram: convertForTelegram,
                download_id: downloadId
            })
        });

        clearInterval(pollInterval);
        const data = await response.json();

        resultArea.classList.remove('hidden');
        resultArea.className = 'result-area ' + (data.success ? 'success' : 'error');

        if (data.success) {
            resultArea.innerHTML = `
                <h3><span class="material-symbols-outlined">check_circle</span> Download Complete!</h3>
                <p>Saved to your Downloads folder:</p>
                <p style="color: white; margin-top: 8px; font-weight: 500;">${data.filename}</p>
            `;
        } else {
            resultArea.innerHTML = `
                <h3><span class="material-symbols-outlined">error</span> Download Failed</h3>
                <p>${data.error}</p>
            `;
        }
    } catch (error) {
        clearInterval(pollInterval);
        resultArea.classList.remove('hidden');
        resultArea.className = 'result-area error';
        resultArea.innerHTML = `
            <h3><span class="material-symbols-outlined">error</span> Network Error</h3>
            <p>Could not connect to the local server. Is the Python app running?</p>
        `;
    } finally {
        // Reset UI
        if(pollInterval) clearInterval(pollInterval);
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').innerText = 'Download Video';
        statusArea.classList.add('hidden');
        statusText.innerHTML = "Downloading video... This may take a few minutes depending on the size.";
    }
});
