export class ModalManager {
  private activeModal: HTMLElement | null = null;
  private backdrop: HTMLElement;
  private container: HTMLElement;

  constructor() {
    // Get or create backdrop
    let backdrop = document.getElementById('modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'modal-backdrop';
      backdrop.className = 'hidden';
      document.body.appendChild(backdrop);
    }
    this.backdrop = backdrop;

    // Get or create container
    let container = document.getElementById('modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-container';
      document.body.appendChild(container);
    }
    this.container = container;

    // Click backdrop to close modal
    this.backdrop.addEventListener('click', () => this.hide());
  }

  show(modalElement: HTMLElement): void {
    if (this.activeModal) {
      this.hide(); // Close any existing modal first
    }

    this.activeModal = modalElement;
    this.container.appendChild(modalElement);

    // Show backdrop with fade-in
    this.backdrop.classList.remove('hidden');

    // Show modal with fade-in
    requestAnimationFrame(() => {
      this.backdrop.classList.add('active');
      modalElement.classList.add('active');
    });
  }

  hide(): void {
    if (!this.activeModal) return;

    // Fade out
    this.backdrop.classList.remove('active');
    if (this.activeModal) {
      this.activeModal.classList.remove('active');
    }

    // Remove after animation completes
    setTimeout(() => {
      if (this.activeModal) {
        this.container.removeChild(this.activeModal);
        this.activeModal = null;
      }
      this.backdrop.classList.add('hidden');
    }, 300); // Match CSS transition duration
  }

  isModalActive(): boolean {
    return this.activeModal !== null;
  }
}
