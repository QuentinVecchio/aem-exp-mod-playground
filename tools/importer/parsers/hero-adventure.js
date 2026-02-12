/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-adventure block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: hero
 *
 * Block Structure (from markdown example):
 * Row 1: Background image (single column)
 * Row 2: Heading + description + CTA (single column)
 *
 * Source HTML Pattern:
 * <div id="teaser-ef0ce278d1" class="cmp-teaser">
 *   <div class="cmp-teaser__content">
 *     <h2 class="cmp-teaser__title">...</h2>
 *     <div class="cmp-teaser__description">...</div>
 *     <div class="cmp-teaser__action-container">
 *       <a class="cmp-teaser__action-link">...</a>
 *     </div>
 *   </div>
 *   <div class="cmp-teaser__image">
 *     <img .../>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  // Extract image
  // VALIDATED: Found .cmp-teaser__image img in captured DOM at line 375
  const image = element.querySelector('.cmp-teaser__image img');

  // Extract heading
  // VALIDATED: Found h2.cmp-teaser__title in captured DOM at line 367
  const heading = element.querySelector('.cmp-teaser__title') ||
                  element.querySelector('h1, h2, h3');

  // Extract description
  // VALIDATED: Found .cmp-teaser__description in captured DOM at line 370
  const description = element.querySelector('.cmp-teaser__description');

  // Extract CTA link
  // VALIDATED: Found .cmp-teaser__action-link in captured DOM at line 372
  const ctaLink = element.querySelector('.cmp-teaser__action-link');

  const cells = [];

  // Row 1: Background image
  if (image) {
    const imageCell = document.createElement('div');
    const img = image.cloneNode(true);
    imageCell.appendChild(img);
    cells.push([imageCell]);
  }

  // Row 2: Heading + description + CTA
  const contentCell = document.createElement('div');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    contentCell.appendChild(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentCell.appendChild(p);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    p.appendChild(a);
    contentCell.appendChild(p);
  }
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Adventure', cells });
  element.replaceWith(block);
}
