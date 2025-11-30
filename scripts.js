/**
 * FourthLayer Games - Core Script
 * Handles game data loading and dynamic rendering.
 */

// --- Game Data Configuration ---
// Add new games here. No HTML editing required!
const gamesData = [
    {
        id: "game-one",
        title: "Mystic Valley",
        description: "An enchanting adventure through a world of floating islands and ancient magic. Solve puzzles and uncover the secrets of the valley.",
        image: "https://via.placeholder.com/600x400/FFB74D/5D4037?text=Mystic+Valley", // Warm placeholder
        link: "#",
        tags: ["Adventure", "Puzzle"]
    },
    {
        id: "game-two",
        title: "Cyber Warmth",
        description: "A cozy strategy game where you build safe havens in a futuristic world. Focus on community and resource management.",
        image: "https://via.placeholder.com/600x400/FF8A65/3E2723?text=Cyber+Warmth",
        link: "#",
        tags: ["Strategy", "Cozy"]
    },
    {
        id: "game-three",
        title: "Paws & Paths",
        description: "Guide a group of lost animals home through a whimsical forest. A relaxing journey for players of all ages.",
        image: "https://via.placeholder.com/600x400/AED581/33691E?text=Paws+%26+Paths",
        link: "#",
        tags: ["Casual", "Family"]
    }
];

// --- DOM Rendering Logic ---

document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    renderFeaturedGames();
});

/**
 * Renders the full list of games into the #games-container element.
 * Used on games.html
 */
function renderGames() {
    const container = document.getElementById('games-container');
    if (!container) return; // Not on games page

    container.innerHTML = ''; // Clear loading state

    gamesData.forEach(game => {
        const card = document.createElement('article');
        card.className = 'game-card';
        
        card.innerHTML = `
            <div class="game-image-wrapper">
                <img src="${game.image}" alt="${game.title}" loading="lazy">
                <div class="game-tags">
                    ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="game-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <a href="${game.link}" class="btn btn-primary">Play Now</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

/**
 * Renders a subset of games into the #featured-games element.
 * Used on index.html
 */
function renderFeaturedGames() {
    const container = document.getElementById('featured-games');
    if (!container) return; // Not on home page

    container.innerHTML = '';
    
    // Show first 2 games as featured
    const featured = gamesData.slice(0, 2);

    featured.forEach(game => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}" class="featured-bg">
            <div class="featured-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <a href="${game.link}" class="btn btn-outline">Learn More</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}
