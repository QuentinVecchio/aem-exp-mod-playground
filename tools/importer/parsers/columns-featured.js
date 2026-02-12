/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-featured block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: columns
 *
 * Block Structure (from markdown example):
 * Single row with 2 columns: image | pretitle + heading + description + CTA
 *
 * Source HTML Pattern:
 * <div id="featured-teaser-home" class="cmp-teaser">
 *   <div class="cmp-teaser__content">
 *     <p class="cmp-teaser__pretitle">Featured Article</p>
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
  // VALIDATED: Found .cmp-teaser__image img in captured DOM at line 268
  const image = element.querySelector('.cmp-teaser__image img');

  // Extract pretitle
  // VALIDATED: Found p.cmp-teaser__pretitle in captured DOM at line 259
  const pretitle = element.querySelector('.cmp-teaser__pretitle');

  // Extract heading
  // VALIDATED: Found h2.cmp-teaser__title in captured DOM at line 260
  const heading = element.querySelector('.cmp-teaser__title') ||
                  element.querySelector('h1, h2, h3');

  // Extract description
  // VALIDATED: Found .cmp-teaser__description in captured DOM at line 263
  const description = element.querySelector('.cmp-teaser__description');

  // Extract CTA link
  // VALIDATED: Found .cmp-teaser__action-link in captured DOM at line 265
  const ctaLink = element.querySelector('.cmp-teaser__action-link');

  // Build image cell
  const imageCell = document.createElement('div');
  if (image) {
    const img = image.cloneNode(true);
    imageCell.appendChild(img);
  }

  // Build content cell: pretitle + heading + description + CTA
  const contentCell = document.createElement('div');
  if (pretitle) {
    const p = document.createElement('p');
    p.textContent = pretitle.textContent.trim();
    contentCell.appendChild(p);
  }
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

  // Single row with 2 columns: image | content
  const cells = [
    [imageCell, contentCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Featured', cells });
  element.replaceWith(block);
}
