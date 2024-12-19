// Fonction pour calculer la moyenne d'un groupe de réponses (Oui = 1, Non = 0)
function calculerMoyenne(criteriaName) {
    const answers = document.querySelectorAll(`input[name^="${criteriaName}"]`);
    let total = 0;
    let count = 0;

    answers.forEach(answer => {
        if (answer.checked) {
            total += parseInt(answer.value);
            count++;
        }
    });

    return count > 0 ? total / count : 0;  // Si aucune réponse n'est sélectionnée, on retourne 0
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            const moyennes = calculerMoyennes();
            sessionStorage.setItem('moyennes', JSON.stringify(moyennes));
            // Optionally, you can call updateCharts() here if needed
        });
    } else {
        console.error('calculateButton not found');
    }
});

function calculerMoyennes() {
    const criteres = ["impact", "conditions", "loyaute", "gouvernance", "clients", "relations", "territoire"];    const moyennes = {};

    criteres.forEach(critere => {
        const inputs = document.querySelectorAll(`input[name^="${critere}"]:checked`);
        const total = Array.from(inputs).reduce((sum, input) => sum + parseInt(input.value), 0);
        moyennes[critere] = inputs.length > 0 ? (total / inputs.length) * 100 : 0; // Convert to percentage
    });

    // Save the data to sessionStorage
    sessionStorage.setItem('moyennes', JSON.stringify(moyennes));

    return moyennes;
}
// Fonction pour calculer le score par critère
function calculerScoreParCritere(critere) {
    const radios = document.querySelectorAll(`#${critere} input[type="radio"]:checked`);
    const totalQuestions = document.querySelectorAll(`#${critere} input[type="radio"]`).length / 2;
    let score = 0;

    radios.forEach(radio => {
        if (radio.value === "1") {
            score += 1;
        }
    });

    const scorePercentage = (score / totalQuestions) * 100;
    document.getElementById(`result_${critere}`).style.display = 'block';
    document.getElementById(`result_${critere}`).textContent = `${critere.charAt(0).toUpperCase() + critere.slice(1)} : ${scorePercentage.toFixed(2)}/100`;

    // Store the result in sessionStorage
    const moyennes = JSON.parse(sessionStorage.getItem('moyennes')) || {};
    moyennes[critere] = scorePercentage;
    sessionStorage.setItem('moyennes', JSON.stringify(moyennes));
}

// Fonction pour calculer le score global
function calculerScoreGlobal() {
    let scoreTotal = 0;
    let count = 0;

    const criteres = ["impact", "conditions", "loyaute", "gouvernance", "clients", "relations", "territoire"];
    for (const critere of criteres) {
        const moyenne = calculerMoyenne(critere);
        scoreTotal += moyenne * 100;  // Pondération du critère
        count++;
    }

    const scoreGlobal = scoreTotal / count;
    document.getElementById('result_global').style.display = 'block';
    document.getElementById('result_global').textContent = `Score global RSE : ${scoreGlobal.toFixed(2)} /100`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add your event listeners or other initialization code here
});