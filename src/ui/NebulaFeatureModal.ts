import { BaseDSOModal } from './BaseDSOModal';
import type { Nebula } from '../game/Nebula';
import type { NebulaFeature } from '../data/nebulae';
import type { AudioManager } from '../audio/AudioManager';
import { shuffleArray } from '../utils/array';

/**
 * NebulaFeatureModal - True/False feature identification minigame
 *
 * Players study a nebula for 5 seconds, then identify which features
 * they observed from a checklist of true/false statements.
 *
 * Educational focus - completion regardless of correctness.
 */
export class NebulaFeatureModal extends BaseDSOModal {
  private nebula: Nebula;
  private challengeStatements: Array<{ feature: NebulaFeature; answer: boolean | null }> = [];

  constructor(nebula: Nebula, onComplete: () => void, audioManager?: AudioManager) {
    super(nebula, onComplete, 5, audioManager); // 5 second study time
    this.nebula = nebula;
  }

  protected getStudyInstruction(): string {
    return 'Study this nebula carefully...';
  }

  protected getChallengeInstruction(): string {
    return 'Which features did you observe?';
  }

  /**
   * Generates 4-5 challenge statements (3 true, 2 false) in random order.
   */
  private generateChallengeStatements(): Array<{ feature: NebulaFeature; answer: boolean | null }> {
    const data = this.nebula.getData();
    const features = data.features || [];

    if (features.length === 0) {
      // Fallback: if no features defined, skip to completion
      setTimeout(() => this.completeChallenge(), 100);
      return [];
    }

    // Separate true and false features
    const trueFeatures = features.filter(f => f.isPresent);
    const falseFeatures = features.filter(f => !f.isPresent);

    // Randomly select 3 true features (or all if less than 3)
    const selectedTrue = shuffleArray([...trueFeatures])
      .slice(0, Math.min(3, trueFeatures.length));

    // Randomly select 2 false features (or all if less than 2)
    const selectedFalse = shuffleArray([...falseFeatures])
      .slice(0, Math.min(2, falseFeatures.length));

    // Combine and shuffle
    const combined = [...selectedTrue, ...selectedFalse];
    const shuffled = shuffleArray(combined);

    // Return with null answers (not yet answered)
    return shuffled.map(feature => ({ feature, answer: null }));
  }

  /**
   * Creates the challenge UI with feature checklist and toggle buttons.
   */
  protected createChallengeContent(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'nebula-feature-challenge';

    // Generate challenge statements
    this.challengeStatements = this.generateChallengeStatements();

    if (this.challengeStatements.length === 0) {
      container.innerHTML = '<p class="no-features">Processing discovery...</p>';
      return container;
    }

    // Create instruction subheading
    const subheading = document.createElement('p');
    subheading.className = 'challenge-subheading';
    subheading.textContent = 'Mark each observation as present or absent:';
    container.appendChild(subheading);

    // Create feature checklist
    const checklist = document.createElement('div');
    checklist.className = 'feature-checklist';

    this.challengeStatements.forEach((statement, index) => {
      const item = this.createFeatureItem(statement, index);
      checklist.appendChild(item);
    });

    container.appendChild(checklist);

    // Create submit button
    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = 'Submit Observations';
    submitBtn.onclick = () => this.handleSubmit();
    container.appendChild(submitBtn);

    return container;
  }

  /**
   * Creates a single feature item with true/false toggle buttons.
   */
  private createFeatureItem(
    statement: { feature: NebulaFeature; answer: boolean | null },
    index: number
  ): HTMLElement {
    const item = document.createElement('div');
    item.className = 'feature-item';
    item.dataset.index = index.toString();

    // Feature description
    const description = document.createElement('span');
    description.className = 'feature-text';
    description.textContent = statement.feature.description;
    item.appendChild(description);

    // Toggle button group
    const toggleGroup = document.createElement('div');
    toggleGroup.className = 'toggle-group';

    // TRUE button
    const trueBtn = document.createElement('button');
    trueBtn.className = 'toggle-btn toggle-true';
    trueBtn.textContent = 'PRESENT';
    trueBtn.dataset.value = 'true';
    trueBtn.onclick = () => this.handleToggle(index, true, item);
    toggleGroup.appendChild(trueBtn);

    // FALSE button
    const falseBtn = document.createElement('button');
    falseBtn.className = 'toggle-btn toggle-false';
    falseBtn.textContent = 'ABSENT';
    falseBtn.dataset.value = 'false';
    falseBtn.onclick = () => this.handleToggle(index, false, item);
    toggleGroup.appendChild(falseBtn);

    item.appendChild(toggleGroup);

    return item;
  }

  /**
   * Handles toggle button clicks.
   */
  private handleToggle(index: number, value: boolean, itemElement: HTMLElement): void {
    // Update answer
    this.challengeStatements[index].answer = value;

    // Update button states
    const buttons = itemElement.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => {
      const btnValue = (btn as HTMLElement).dataset.value === 'true';
      if (btnValue === value) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Play subtle audio feedback
    this.playCorrectSound();
  }

  /**
   * Handles submission - validates answers and requires correctness.
   */
  private handleSubmit(): void {
    // Check if all questions are answered
    const allAnswered = this.challengeStatements.every(s => s.answer !== null);

    if (!allAnswered) {
      // Flash unanswered items
      this.flashUnansweredItems();
      return;
    }

    // Validate correctness: user answer must match feature.isPresent
    const allCorrect = this.challengeStatements.every(
      s => s.answer === s.feature.isPresent
    );

    if (allCorrect) {
      // All answers correct - complete the challenge
      this.playCorrectSound();
      setTimeout(() => {
        this.completeChallenge();
      }, 600);
    } else {
      // Some answers incorrect - show feedback and allow retry
      this.flashIncorrectAnswers();
    }
  }

  /**
   * Visual feedback for unanswered items.
   */
  private flashUnansweredItems(): void {
    const items = this.modalElement.querySelectorAll('.feature-item');
    items.forEach((item, index) => {
      if (this.challengeStatements[index].answer === null) {
        item.classList.add('unanswered-flash');
        setTimeout(() => {
          item.classList.remove('unanswered-flash');
        }, 400);
      }
    });

    // Play error tone
    this.playErrorTone();
  }

  /**
   * Visual feedback for incorrect answers.
   */
  private flashIncorrectAnswers(): void {
    const items = this.modalElement.querySelectorAll('.feature-item');
    items.forEach((item, index) => {
      const statement = this.challengeStatements[index];
      // Highlight incorrect answers
      if (statement.answer !== null && statement.answer !== statement.feature.isPresent) {
        item.classList.add('incorrect-flash');
        setTimeout(() => {
          item.classList.remove('incorrect-flash');
        }, 800);
      }
    });

    // Play error tone
    this.playErrorTone();
  }

}
