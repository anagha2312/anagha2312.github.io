/**
 * Text analyzer script to process input text and display various statistics
 * Handles the requirements for Question 3 of the assignment
 */

document.addEventListener('DOMContentLoaded', () => {
    const analyzeButton = document.getElementById('analyze-btn');
    const textInput = document.getElementById('text-input');
    
    // Result containers
    const basicStatsContainer = document.getElementById('basic-stats');
    const pronounsContainer = document.getElementById('pronouns-count');
    const prepositionsContainer = document.getElementById('prepositions-count');
    const articlesContainer = document.getElementById('articles-count');
    
    // Lists for tokenization
    const pronouns = [
        'i', 'me', 'my', 'mine', 'myself', 
        'you', 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself', 
        'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves',
        'who', 'whom', 'whose',
        'this', 'that', 'these', 'those',
        'what', 'which'
    ];
    
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 
        'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
        'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
        'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off',
        'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 'round', 'since',
        'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'unto',
        'up', 'upon', 'with', 'within', 'without'
    ];
    
    const indefiniteArticles = ['a', 'an'];
    
    analyzeButton.addEventListener('click', () => {
        const text = textInput.value;
        
        if (!text.trim()) {
            alert('Please enter text to analyze');
            return;
        }
        
        if (text.split(/\s+/).length < 10000) {
            alert('Please enter at least 10,000 words for analysis');
            return;
        }
        
        analyzeText(text);
    });
    
    /**
     * Analyzes the input text and displays statistics
     * @param {string} text - The text to analyze
     */
    function analyzeText(text) {
        // 1. Calculate basic statistics
        const stats = calculateBasicStats(text);
        displayBasicStats(stats);
        
        // 2. Tokenize and count pronouns
        const pronounCounts = countTokens(text, pronouns);
        displayTokenCounts(pronounCounts, pronounsContainer);
        
        // 3. Tokenize and count prepositions
        const prepositionCounts = countTokens(text, prepositions);
        displayTokenCounts(prepositionCounts, prepositionsContainer);
        
        // 4. Tokenize and count indefinite articles
        const articleCounts = countTokens(text, indefiniteArticles);
        displayTokenCounts(articleCounts, articlesContainer);
    }
    
    /**
     * Calculates basic statistics about the text
     * @param {string} text - The text to analyze
     * @return {Object} Object containing the statistics
     */
    function calculateBasicStats(text) {
        const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        const specialSymbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
        
        return {
            letterCount,
            wordCount,
            spaceCount,
            newlineCount,
            specialSymbolCount
        };
    }
    
    /**
     * Displays the basic statistics in the container
     * @param {Object} stats - The statistics to display
     */
    function displayBasicStats(stats) {
        basicStatsContainer.innerHTML = `
            <table class="stats-table">
                <tr>
                    <td>Letters:</td>
                    <td>${stats.letterCount}</td>
                </tr>
                <tr>
                    <td>Words:</td>
                    <td>${stats.wordCount}</td>
                </tr>
                <tr>
                    <td>Spaces:</td>
                    <td>${stats.spaceCount}</td>
                </tr>
                <tr>
                    <td>Newlines:</td>
                    <td>${stats.newlineCount}</td>
                </tr>
                <tr>
                    <td>Special Symbols:</td>
                    <td>${stats.specialSymbolCount}</td>
                </tr>
            </table>
        `;
    }
    
    /**
     * Tokenizes the text and counts occurrences of specified tokens
     * @param {string} text - The text to tokenize
     * @param {Array} tokenList - List of tokens to count
     * @return {Object} Object with tokens as keys and counts as values
     */
    function countTokens(text, tokenList) {
        // Convert text to lowercase for case-insensitive matching
        const lowerText = text.toLowerCase();
        
        // Extract all words using a regular expression
        const words = lowerText.match(/\b\w+\b/g) || [];
        
        // Initialize counts object
        const counts = {};
        tokenList.forEach(token => {
            counts[token] = 0;
        });
        
        // Count occurrences of each token
        words.forEach(word => {
            if (tokenList.includes(word)) {
                counts[word]++;
            }
        });
        
        return counts;
    }
    
    /**
     * Displays token counts in the specified container
     * @param {Object} counts - Object with tokens and their counts
     * @param {HTMLElement} container - Container to display the counts
     */
    function displayTokenCounts(counts, container) {
        // Convert counts object to array and sort by count (descending)
        const sortedCounts = Object.entries(counts)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1]);
        
        if (sortedCounts.length === 0) {
            container.innerHTML = '<p>No matches found</p>';
            return;
        }
        
        // Create HTML table to display counts
        let tableHTML = '<table class="stats-table">';
        tableHTML += '<tr><th>Token</th><th>Count</th></tr>';
        
        sortedCounts.forEach(([token, count]) => {
            tableHTML += `<tr><td>${token}</td><td>${count}</td></tr>`;
        });
        
        tableHTML += '</table>';
        container.innerHTML = tableHTML;
    }
});