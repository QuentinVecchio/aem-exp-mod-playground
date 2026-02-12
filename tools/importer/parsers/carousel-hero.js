/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: carousel
 *
 * Block Structure (from markdown example):
 * Each row = one slide: image | heading + description + CTA
 *
 * Source HTML Pattern:
 * <div class="cmp-carousel">
 *   <div class="cmp-carousel__content">
 *     <div class="cmp-carousel__item">
 *       <div class="cmp-teaser">
 *         <div class="cmp-teaser__content">
 *           <h2 class="cmp-teaser__title">...</h2>
 *           <div class="cmp-teaser__description">...</div>
 *           <div class="cmp-teaser__action-container">
 *             <a class="cmp-teaser__action-link">...</a>
 *           </div>
 *         </div>
 *         <div class="cmp-teaser__image">
 *           <img .../>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all carousel items (slides)
  // VALIDATED: Found .cmp-carousel__item in captured DOM at lines 168, 189, 210
  const slides = element.querySelectorAll('.cmp-carousel__item');

  slides.forEach((slide) => {
    // Extract teaser content from each slide
    // VALIDATED: Found .cmp-teaser inside each carousel item in captured DOM
    const teaser = slide.querySelector('.cmp-teaser');
    if (!teaser) return;

    // Extract image
    // VALIDATED: Found .cmp-teaser__image img in captured DOM
    const image = teaser.querySelector('.cmp-teaser__image img');

    // Extract heading
    // VALIDATED: Found h2.cmp-teaser__title in captured DOM at lines 172, 193, 214
    const heading = teaser.querySelector('.cmp-teaser__title') ||
                    teaser.querySelector('h1, h2, h3');

    // Extract description
    // VALIDATED: Found .cmp-teaser__description in captured DOM at lines 175, 196, 217
    const description = teaser.querySelector('.cmp-teaser__description');

    // Extract CTA link
    // VALIDATED: Found .cmp-teaser__action-link in captured DOM at lines 177, 198, 221
    const ctaLink = teaser.querySelector('.cmp-teaser__action-link');

    // Build image cell
    const imageCell = document.createElement('div');
    if (image) {
      const img = image.cloneNode(true);
      imageCell.appendChild(img);
    }

    // Build content cell: heading + description + CTA
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

    // Each slide = one row with 2 columns: image | content
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Hero', cells });
  element.replaceWith(block);
}
