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
    calculateButton.addEventListener('click', function() {
        calculerMoyennes();
        // Optionally, you can call updateCharts() here if needed
    });
});

function calculerMoyennes() {
    const criteres = ['environnement', 'droits_homme', 'gouvernance', 'loyaute_pratiques', 'client_consommateur', 'relations_travail', 'territoire_interet_local'];
    const moyennes = {};

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

    const criteres = ["impact", "conditions", "engagement", "gouvernance", "clients", "fournisseurs", "communautes", "ethique"];

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