import { BaseDSOModal } from './BaseDSOModal';
import type { Galaxy } from '../game/Galaxy';
import type { GalaxyFeature } from '../data/galaxies';
import type { AudioManager } from '../audio/AudioManager';
import { shuffleArray } from '../utils/array';

/**
 * GalaxyStructureModal - Galaxy type and structure identification minigame
 *
 * Players study a galaxy for 5 seconds, then:
 * 1. Identify the galaxy type (Spiral/Elliptical/Irregular)
 * 2. Answer 2-3 true/false questions about structural features
 *
 * Educational focus - completion regardless of correctness.
 */
export class GalaxyStructureModal extends BaseDSOModal {
  private galaxy: Galaxy;
  private selectedType: string | null = null;
  private featureStatements: Array<{ feature: GalaxyFeature; answer: boolean | null }> = [];

  constructor(galaxy: Galaxy, onComplete: () => void, audioManager?: AudioManager) {
    super(galaxy, onComplete, 5, audioManager); // 5 second study time
    this.galaxy = galaxy;
  }

  protected getStudyInstruction(): string {
    return 'Observe this galaxy\'s structure...';
  }

  protected getChallengeInstruction(): string {
    return 'Classify and identify features';
  }

  /**
   * Generates feature statements for the challenge.
   */
  private generateFeatureStatements(): Array<{ feature: GalaxyFeature; answer: boolean | null }> {
    const data = this.galaxy.getData();
    const features = data.features || [];

    if (features.length === 0) {
      return [];
    }

    // Take 2-3 random features (mix of true and false)
    const shuffled = shuffleArray([...features]);
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));

    return selected.map(feature => ({ feature, answer: null }));
  }

  /**
   * Creates the challenge UI with galaxy type selection and feature questions.
   */
  protected createChallengeContent(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'galaxy-structure-challenge';

    // Generate feature statements
    this.featureStatements = this.generateFeatureStatements();

    // Section 1: Morphological Classification (Galaxy Type)
    const typeSection = this.createTypeSection();
    container.appendChild(typeSection);

    // Section 2: Structural Features (if features available)
    if (this.featureStatements.length > 0) {
      const featureSection = this.createFeatureSection();
      container.appendChild(featureSection);
    }

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = 'Submit Classification';
    submitBtn.onclick = () => this.handleSubmit();
    container.appendChild(submitBtn);

    return container;
  }

  /**
   * Creates the galaxy type selection section.
   */
  private createTypeSection(): HTMLElement {
    const section = document.createElement('div');
    section.className = 'challenge-section type-section';

    // Section header
    const header = document.createElement('h4');
    header.className = 'section-header';
    header.textContent = 'Morphological Classification';
    section.appendChild(header);

    // Question text
    const question = document.createElement('p');
    question.className = 'section-question';
    question.textContent = 'What type of galaxy is this?';
    section.appendChild(question);

    // Type button group
    const typeOptions = document.createElement('div');
    typeOptions.className = 'type-options';

    const types: Array<{ value: string; label: string }> = [
      { value: 'spiral', label: 'Spiral' },
      { value: 'elliptical', label: 'Elliptical' },
      { value: 'irregular', label: 'Irregular' }
    ];

    types.forEach(type => {
      const btn = document.createElement('button');
      btn.className = 'type-btn';
      btn.textContent = type.label;
      btn.dataset.type = type.value;
      btn.onclick = () => this.handleTypeSelection(type.value, typeOptions);
      typeOptions.appendChild(btn);
    });

    section.appendChild(typeOptions);

    return section;
  }

  /**
   * Creates the structural features section.
   */
  private createFeatureSection(): HTMLElement {
    const section = document.createElement('div');
    section.className = 'challenge-section feature-section';

    // Section header
    const header = document.createElement('h4');
    header.className = 'section-header';
    header.textContent = 'Structural Features';
    section.appendChild(header);

    // Question text
    const question = document.createElement('p');
    question.className = 'section-question';
    question.textContent = 'Which features did you observe?';
    section.appendChild(question);

    // Feature checklist
    const checklist = document.createElement('div');
    checklist.className = 'feature-checklist';

    this.featureStatements.forEach((statement, index) => {
      const item = this.createFeatureItem(statement, index);
      checklist.appendChild(item);
    });

    section.appendChild(checklist);

    return section;
  }

  /**
   * Creates a single feature item with toggle buttons.
   */
  private createFeatureItem(
    statement: { feature: GalaxyFeature; answer: boolean | null },
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
    trueBtn.textContent = 'YES';
    trueBtn.dataset.value = 'true';
    trueBtn.onclick = () => this.handleFeatureToggle(index, true, item);
    toggleGroup.appendChild(trueBtn);

    // FALSE button
    const falseBtn = document.createElement('button');
    falseBtn.className = 'toggle-btn toggle-false';
    falseBtn.textContent = 'NO';
    falseBtn.dataset.value = 'false';
    falseBtn.onclick = () => this.handleFeatureToggle(index, false, item);
    toggleGroup.appendChild(falseBtn);

    item.appendChild(toggleGroup);

    return item;
  }

  /**
   * Handles galaxy type selection.
   */
  private handleTypeSelection(type: string, container: HTMLElement): void {
    this.selectedType = type;

    // Update button states
    const buttons = container.querySelectorAll('.type-btn');
    buttons.forEach(btn => {
      const btnType = (btn as HTMLElement).dataset.type;
      if (btnType === type) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Play audio feedback
    this.playCorrectSound();
  }

  /**
   * Handles feature toggle clicks.
   */
  private handleFeatureToggle(index: number, value: boolean, itemElement: HTMLElement): void {
    // Update answer
    this.featureStatements[index].answer = value;

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

    // Play audio feedback
    this.playCorrectSound();
  }

  /**
   * Handles submission - validates answers and requires correctness.
   */
  private handleSubmit(): void {
    // Check if galaxy type is selected
    if (this.selectedType === null) {
      this.flashTypeSection();
      return;
    }

    // Check if all feature questions are answered (if any)
    if (this.featureStatements.length > 0) {
      const allAnswered = this.featureStatements.every(s => s.answer !== null);
      if (!allAnswered) {
        this.flashUnansweredFeatures();
        return;
      }
    }

    // Validate correctness
    const galaxyData = this.galaxy.getData();
    const typeCorrect = this.selectedType === galaxyData.galaxyType;
    const featuresCorrect = this.featureStatements.every(
      s => s.answer === s.feature.isPresent
    );

    if (typeCorrect && featuresCorrect) {
      // All answers correct - complete the challenge
      this.playCorrectSound();
      setTimeout(() => {
        this.completeChallenge();
      }, 600);
    } else {
      // Some answers incorrect - show feedback and allow retry
      this.flashIncorrectAnswers(typeCorrect);
    }
  }

  /**
   * Visual feedback for missing type selection.
   */
  private flashTypeSection(): void {
    const typeSection = this.modalElement.querySelector('.type-section');
    if (typeSection) {
      typeSection.classList.add('unanswered-flash');
      setTimeout(() => {
        typeSection.classList.remove('unanswered-flash');
      }, 400);
    }
    this.playErrorTone();
  }

  /**
   * Visual feedback for unanswered feature items.
   */
  private flashUnansweredFeatures(): void {
    const items = this.modalElement.querySelectorAll('.feature-item');
    items.forEach((item, index) => {
      if (this.featureStatements[index].answer === null) {
        item.classList.add('unanswered-flash');
        setTimeout(() => {
          item.classList.remove('unanswered-flash');
        }, 400);
      }
    });
    this.playErrorTone();
  }

  /**
   * Visual feedback for incorrect answers.
   */
  private flashIncorrectAnswers(typeCorrect: boolean): void {
    // Flash type section if incorrect
    if (!typeCorrect) {
      const typeSection = this.modalElement.querySelector('.type-section');
      if (typeSection) {
        typeSection.classList.add('incorrect-flash');
        setTimeout(() => {
          typeSection.classList.remove('incorrect-flash');
        }, 800);
      }
    }

    // Flash incorrect feature answers
    const items = this.modalElement.querySelectorAll('.feature-item');
    items.forEach((item, index) => {
      const statement = this.featureStatements[index];
      if (statement.answer !== null && statement.answer !== statement.feature.isPresent) {
        item.classList.add('incorrect-flash');
        setTimeout(() => {
          item.classList.remove('incorrect-flash');
        }, 800);
      }
    });

    this.playErrorTone();
  }

}
