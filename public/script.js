document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/words');
    const data = await response.json();

    const contentDiv = document.getElementById('content');
    data.forEach(section => {
        const languageDiv = document.createElement('div');
        languageDiv.className = 'language-section';

        const languageTitle = document.createElement('h2');
        languageTitle.textContent = section.language;
        languageDiv.appendChild(languageTitle);

        const wordList = document.createElement('ul');
        wordList.className = 'word-list';
        section.words.forEach(word => {
            const listItem = document.createElement('li');
            listItem.textContent = word;
            wordList.appendChild(listItem);
        });
        languageDiv.appendChild(wordList);

        contentDiv.appendChild(languageDiv);
    });
});
