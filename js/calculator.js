const criteres = {
    "Impact environnemental": 4,
    "Conditions de travail": 3,
    "Engagement sociétal": 2,
    "Gouvernance": 1
};

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

// Fonction pour calculer le score par thème
function calculerScoreParTheme(theme) {
    const moyenne = calculerMoyenne(theme);
    let score = moyenne;

    if (theme === 'impact') {
        document.getElementById("result_impact").style.display = 'block';
        document.getElementById("result_impact").textContent = `Score Impact Environnemental: ${(score * 100).toFixed(2)} / 100`;
    } else if (theme === 'conditions') {
        document.getElementById("result_conditions").style.display = 'block';
        document.getElementById("result_conditions").textContent = `Score Conditions de Travail: ${(score * 100).toFixed(2)} / 100`;
    } else if (theme === 'engagement') {
        document.getElementById("result_engagement").style.display = 'block';
        document.getElementById("result_engagement").textContent = `Score Engagement Sociétal: ${(score * 100).toFixed(2)} / 100`;
    } else if (theme === 'gouvernance') {
        document.getElementById("result_gouvernance").style.display = 'block';
        document.getElementById("result_gouvernance").textContent = `Score Gouvernance: ${(score * 100).toFixed(2)} / 100`;
    }
}

// Fonction pour calculer le score global
function calculerScoreGlobal() {
    let scoreTotal = 0;

    // Calculer les scores par thème
    scoreTotal += calculerMoyenne('impact') * criteres["Impact environnemental"] * 10;
    scoreTotal += calculerMoyenne('conditions') * criteres["Conditions de travail"] * 10;
    scoreTotal += calculerMoyenne('engagement') * criteres["Engagement sociétal"] * 10;
    scoreTotal += calculerMoyenne('gouvernance') * criteres["Gouvernance"] * 10;

    // Afficher le score global
    const resultDiv = document.getElementById("result_global");
    resultDiv.style.display = 'block';
    resultDiv.textContent = `Votre score global RSE est de : ${scoreTotal.toFixed(2)} / 100`;
}