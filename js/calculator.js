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

// Fonction pour calculer le score par critère
function calculerScoreParCritere(critere) {
    // Sélectionner tous les boutons radio pour ce critère
    const radios = document.querySelectorAll(`#${critere} input[type="radio"]:checked`);

    // Déterminer le nombre total de questions dans ce critère (nombre de boutons radio par question)
    const totalQuestions = document.querySelectorAll(`#${critere} input[type="radio"]`).length / 2; // 2 options (Oui/Non) par question
    let score = 0;

    // Parcourir les radios sélectionnées et compter le nombre de "Oui"
    radios.forEach(radio => {
        if (radio.value === "1") {
            score += 1;  // Ajoute 1 pour chaque réponse "Oui"
        }
    });

    // Calculer le score en pourcentage
    const scorePercentage = (score / totalQuestions) * 100;

    // Afficher le résultat
    document.getElementById(`result_${critere}`).style.display = 'block';
    document.getElementById(`result_${critere}`).textContent = `${critere.charAt(0).toUpperCase() + critere.slice(1)} : ${scorePercentage.toFixed(2)}/100`;
}

// Fonction pour calculer le score global
function calculerScoreGlobal() {
    let scoreTotal = 0;
    let count = 0;

    const criteres = ["impact", "conditions", "engagement", "gouvernance", "relations", "fournisseurs", "communautes", "ethique"];

    for (const critere of criteres) {
        const moyenne = calculerMoyenne(critere);
        scoreTotal += moyenne * 100;  // Pondération du critère
        count++;
    }

    const scoreGlobal = scoreTotal / count;
    document.getElementById('result_global').style.display = 'block';
    document.getElementById('result_global').textContent = `Score global RSE : ${scoreGlobal.toFixed(2)} /100`;
}

document.querySelector('.navbar-toggler').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('mobile');
});