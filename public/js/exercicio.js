document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    const completionButton = document.getElementById('completionButton');
    const totalQuestions = document.querySelectorAll('.question-container').length;
    let answeredQuestions = 0;
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            const questionContainer = this.closest('.question-container');
            
            this.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            if (isCorrect) {
                questionContainer.querySelectorAll('.option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                    if (opt.getAttribute('data-correct') === 'true') {
                        opt.classList.add('correct');
                    }
                });
                
                const feedback = questionContainer.querySelector('.correct-feedback');
                feedback.classList.add('show');
                
                answeredQuestions++;
                
                // Verifica se todas as perguntas foram respondidas
                if (answeredQuestions === totalQuestions) {
                    setTimeout(() => {
                        completionButton.classList.add('show');
                        completionButton.scrollIntoView({ behavior: 'smooth' });
                    }, 1500);
                } else {
                    setTimeout(() => {
                        const nextQuestion = questionContainer.nextElementSibling;
                        if (nextQuestion && nextQuestion.classList.contains('question-container')) {
                            nextQuestion.classList.add('active');
                            nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 1500);
                }
            } else {
                this.style.pointerEvents = 'none';
            }
        });
    });
    
    
    completionButton.addEventListener('click', function() {
        window.location.href = '../aluno/aula-card.html';
    });
});