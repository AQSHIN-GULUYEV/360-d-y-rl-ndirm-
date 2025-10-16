function calculate() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const scores = document.querySelectorAll('.score');
    const comments = document.querySelectorAll('textarea');
    let totalScore = 0;
    let commentText = '';

    scores.forEach((score, index) => {
        totalScore += parseInt(score.value);
        commentText += `${score.parentElement.previousElementSibling.textContent.trim()}: ${comments[index].value}\n`;
    });

    const averageScore = totalScore / scores.length;
    const progress = (averageScore / 5) * 100;
    const resultSection = document.getElementById('resultSection');
    const resultText = document.getElementById('resultText');
    const progressBar = document.getElementById('progressBar');

    resultText.innerHTML = `${name} (${role}): Ortalama bal - ${averageScore.toFixed(2)}/5<br>Şərhlər:<br>${commentText}`;
    progressBar.innerHTML = `<div class="progress" style="width: ${progress}%">${averageScore.toFixed(2)}/5</div>`;
    resultSection.style.display = 'block';
}

function copyResult() {
    const resultText = document.getElementById('resultText').innerText;
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Nəticə kopyalandı!');
    });
}

function printResult() {
    const resultSection = document.getElementById('resultSection');
    const originalDisplay = resultSection.style.display;
    resultSection.style.display = 'block';
    window.print();
    resultSection.style.display = originalDisplay;
}
