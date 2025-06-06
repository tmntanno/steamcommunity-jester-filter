// ==UserScript==
// @name         Steam Discussion Jester Award & Word Filter Hider
// @namespace    http://tampermonkey.net/
// @version      1.7.2
// @description  Hides Steam discussion posts with Jester awards (ignoring stickied) or matching regex filters, with a toggleable hidden topics counter and multiple regex filters
// @author       tmntanno
// @match        https://steamcommunity.com/app/*/discussions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Edit these regex filters directly to update them
    const filters = [
        'homo|lesbian|lgbt|woke', // Filter 1
        // 'spam|troll',         // Filter 2
        // 'xyz|abc'            // Filter 3
    ];
    let hiddenCount = 0; // Track number of hidden topics
    let isShowingAll = {}; // Per-page toggle state (true = show all, false = hide)
    let processedPosts = new WeakSet(); // Cache processed posts
    let debounceTimeout = null; // Debounce timer

    // Debounce function to limit hidePosts calls
    function debounce(func, wait) {
        return function() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func(), wait);
        };
    }

    function hidePosts() {
        // Find the discussion list container
        const container = document.querySelector('.forum_topics_container');
        if (!container) return;

        const posts = container.querySelectorAll('.forum_topic:not([data-processed])');
        const currentPage = getCurrentPage();
        hiddenCount = 0; // Reset counter

        posts.forEach(post => {
            let isFiltered = false;

            if (!post.classList.contains('sticky')) {
                const tooltip = post.getAttribute('data-tooltip-forum');
                if (tooltip && tooltip.includes('data-reaction="19"')) {
                    isFiltered = true;
                }
            }

            const title = post.querySelector('.forum_topic_name')?.textContent || '';
            const fullText = post.getAttribute('data-tooltip-forum') || '';
            const filterRegexes = filters.map(filter => new RegExp(filter, 'i'));
            filterRegexes.forEach(regex => {
                if (regex.test(title) || regex.test(fullText)) {
                    isFiltered = true;
                }
            });

            if (isFiltered) {
                hiddenCount++; // Increment for each filtered post
                if (!isShowingAll[currentPage]) {
                    post.style.display = 'none'; // Hide the post
                } else {
                    post.style.display = ''; // Show the post
                }
            } else {
                post.style.display = ''; // Ensure non-filtered posts are visible
            }

            // Mark as processed
            post.setAttribute('data-processed', 'true');
            processedPosts.add(post);
        });

        updateHiddenCounter();
    }

    function getCurrentPage() {
        const pagination = document.querySelector('.forum_paging_controls .pagelink.active');
        return pagination ? pagination.textContent.trim() : '1'; // Default to page 1
    }

    function updateHiddenCounter() {
        const summary = document.querySelector('.forum_paging.forum_paging_footer .forum_paging_summary.ellipsis');
        if (!summary) return;

        let counter = document.getElementById('hiddenCounter');
        if (!counter) {
            counter = document.createElement('span');
            counter.id = 'hiddenCounter';
            counter.style.marginLeft = '5px';
            counter.style.fontSize = '14px';
            counter.style.position = 'relative';
            counter.style.bottom = '1px';
            counter.style.left = '-8px';
            counter.style.color = '#56707f';
            counter.style.verticalAlign = 'middle';
            counter.style.cursor = 'pointer';
            counter.addEventListener('click', toggleVisibility);
            summary.appendChild(counter);
        }

        counter.textContent = `, ${hiddenCount} hidden`;
    }

    function toggleVisibility() {
        const currentPage = getCurrentPage();
        isShowingAll[currentPage] = !isShowingAll[currentPage]; // Toggle state
        processedPosts = new WeakSet(); // Clear cache
        document.querySelectorAll('.forum_topic').forEach(post => post.removeAttribute('data-processed')); // Reset processed
        hidePosts(); // Reapply
    }

    // Debounced hidePosts
    const debouncedHidePosts = debounce(hidePosts, 100);

    // Initial run
    hidePosts();

    // Observe changes in the discussion container
    const container = document.querySelector('.forum_topics_container');
    if (container) {
        const observer = new MutationObserver(debouncedHidePosts);
        observer.observe(container, { childList: true, subtree: true });
    }

    // Reset toggle state on tab close/reload
    window.addEventListener('beforeunload', () => {
        isShowingAll = {};
    });
})();
