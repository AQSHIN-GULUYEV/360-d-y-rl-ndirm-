function calculate() {
    const scores = Array.from(document.querySelectorAll('.score')).map(s => parseInt(s.value));
    const average = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    
    const person = document.getElementById('personName').value;
    const evaluator = document.getElementById('evaluatorName').value || 'Anonim';
    const role = document.getElementById('evaluatorRole').value;
    const period = document.getElementById('period').value;
    const comments = document.getElementById('generalComments').value;

    const categories = ['Kommunikasiya', 'Liderlik', 'Əməkdaşlıq', 'Peşəkarlıq', 'Nəticələr', 'Adaptasiya', 'Etika'];
    const textareas = document.querySelectorAll('tbody textarea');

    let output = `🏢 360° DƏYƏRLƏNDİRMƏ HESABATİ
═══════════════════════════════════════════════
👤 Dəyərləndirilən: ${person}
🆔 Dəyərləndirən: ${evaluator} (${role})
📅 Dövr: ${period}

📊 ÜMUMİ ORTA BAL: ${average}/5

${'═'.repeat(50)}
KATEQORİYA DƏTALLARI:
${categories.map((cat, i) => `${cat.padEnd(12)}: ${scores[i]}/5 - ${textareas[i].value || 'Şərh yoxdur'}`).join('\n')}

${'═'.repeat(50)}
💡 TÖVSİYƏLƏR: ${comments || 'Əlavə şərh yoxdur'}

Tarix: ${new Date().toLocaleDateString('az-AZ')}
`;

    document.getElementById('output').textContent = output;
    document.getElementById('averageScore').textContent = `${average}/5`;
    document.getElementById('progressBar').style.width = `${average * 20}%`;
    document.getElementById('result').style.display = 'block';
    
    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

function copyResult() {
    const text = document.getElementById('output').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Nəticə kopyalandı! Notepad/Word-ə yapışdırın.');
    });
}

function printResult() {
    const result = document.getElementById('result').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>360° Hesabat</title>
        <style>body{font-family:Arial; padding:20px;}</style></head>
        <body>${result}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function resetForm() {
    document.getElementById('evalForm').reset();
    document.getElementById('result').style.display = 'none';
    alert('🔄 Yeni dəyərləndirmə üçün hazır!');
}
