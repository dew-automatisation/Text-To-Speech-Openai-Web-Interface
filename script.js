document.getElementById('convert-btn').addEventListener('click', function() {
    const apiKey = document.getElementById('api-key-input').value;
    const text = document.getElementById('text-input').value;
    const model = document.getElementById('model-selector').value;
    const voice = document.getElementById('voice-selector').value;
    const format = document.getElementById('format-selector').value;

    if (!apiKey) {
        alert('Please enter your OpenAI API key.');
        return;
    }

    fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            voice: voice,
            input: text,
            response_format: format
        })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        document.getElementById('audio-player').src = url;
        document.getElementById('audio-player').style.display = 'block';

        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.href = url;
        downloadBtn.download = `speech.${format}`;
        downloadBtn.style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
});
