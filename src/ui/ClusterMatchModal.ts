import { BaseDSOModal } from './BaseDSOModal';
import { StarCluster } from '../game/StarCluster';
import type { ClusterData } from '../data/clusters';
import type { AudioManager } from '../audio/AudioManager';
import { shuffleArray } from '../utils/array';

/**
 * ClusterMatchModal - Visual matching minigame for star clusters
 *
 * Players study a cluster for 5 seconds, then identify it from a grid
 * of 4 options (target + 3 decoys from the same observatory).
 *
 * Decoys are selected based on dissimilarity to create a fair challenge.
 */
export class ClusterMatchModal extends BaseDSOModal {
  private targetCluster: StarCluster;
  private allClusters: StarCluster[];
  private options: StarCluster[] = [];
  private isProcessingClick: boolean = false;

  constructor(
    cluster: StarCluster,
    allClusters: StarCluster[],
    onComplete: () => void,
    audioManager?: AudioManager
  ) {
    super(cluster, onComplete, 5, audioManager); // 5 second study time (standardized)
    this.targetCluster = cluster;
    this.allClusters = allClusters;

    // Generate decoys during construction
    this.generateDecoys();

    // If not enough decoys, skip minigame and complete immediately
    if (this.options.length < 2) {
      // Not enough clusters for meaningful challenge
      setTimeout(() => this.completeChallenge(), 100);
    }
  }

  protected getStudyInstruction(): string {
    return 'Remember this cluster\'s appearance...';
  }

  protected getChallengeInstruction(): string {
    return 'Which cluster did you just observe?';
  }

  /**
   * Generates 3 decoy clusters based on dissimilarity scoring.
   */
  private generateDecoys(): void {
    const targetData = this.targetCluster.getData();

    // Filter to same observatory only (fairness)
    const candidates = this.allClusters.filter(c =>
      c.id !== targetData.id &&
      c.getData().observatory === targetData.observatory
    );

    if (candidates.length === 0) {
      this.options = [this.targetCluster];
      return;
    }

    // Score each candidate by dissimilarity
    const scored = candidates.map(cluster => ({
      cluster,
      score: this.calculateDissimilarity(targetData, cluster.getData())
    }));

    // Sort by dissimilarity (higher = better decoy)
    scored.sort((a, b) => b.score - a.score);

    // Take top 3 most dissimilar (or all available if less than 3)
    const decoys = scored.slice(0, Math.min(3, scored.length)).map(s => s.cluster);

    // Create shuffled options array (target + decoys)
    this.options = shuffleArray([this.targetCluster, ...decoys]);
  }

  /**
   * Calculates dissimilarity score between two clusters.
   * Higher score = more dissimilar (better decoy).
   */
  private calculateDissimilarity(target: ClusterData, candidate: ClusterData): number {
    let score = 0;

    // Star count difference (density visual cue)
    score += Math.abs(target.starCount - candidate.starCount);

    // Color difference (major visual cue)
    if (target.color !== candidate.color) {
      score += 50; // High weight for color difference
    }

    // Radius difference (size visual cue)
    score += Math.abs(target.radius - candidate.radius);

    return score;
  }

  /**
   * Creates the challenge UI with cluster option grid.
   */
  protected createChallengeContent(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'cluster-match-challenge';

    if (this.options.length < 2) {
      container.innerHTML = '<p class="insufficient-clusters">Processing discovery...</p>';
      return container;
    }

    // Create instruction subheading
    const subheading = document.createElement('p');
    subheading.className = 'challenge-subheading';
    subheading.textContent = 'Select the cluster you observed:';
    container.appendChild(subheading);

    // Create cluster options grid
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'cluster-options';

    this.options.forEach(cluster => {
      const option = this.createClusterOption(cluster);
      optionsGrid.appendChild(option);
    });

    container.appendChild(optionsGrid);

    return container;
  }

  /**
   * Creates a single cluster option with rendered preview.
   */
  private createClusterOption(cluster: StarCluster): HTMLElement {
    const option = document.createElement('div');
    option.className = 'cluster-option';
    option.dataset.clusterId = cluster.id;

    // Create canvas for cluster preview
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    option.appendChild(canvas);

    // Render cluster using actual StarCluster instance
    this.renderClusterOnCanvas(canvas, cluster);

    // Add click handler with stopPropagation to prevent backdrop closing
    option.onclick = (e) => {
      e.stopPropagation();
      this.handleOptionClick(cluster.id, option);
    };

    return option;
  }

  /**
   * Renders a cluster on a canvas using the actual StarCluster's render method.
   */
  private renderClusterOnCanvas(canvas: HTMLCanvasElement, cluster: StarCluster): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark sky background
    ctx.fillStyle = 'rgba(5, 8, 20, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Temporarily mark as discovered to render stars properly
    // (Similar pattern to BaseDSOModal.renderObjectOnCanvas)
    const wasDiscovered = cluster.isDiscovered;
    cluster.isDiscovered = true;

    // Use the actual StarCluster's render method
    // Pass cluster position as view position to center the cluster
    cluster.render(
      ctx,
      cluster.x,
      cluster.y,
      canvas.width,
      canvas.height
    );

    // Restore original discovery state
    cluster.isDiscovered = wasDiscovered;
    // Note: Label is rendered via CSS, not on canvas (avoids duplicate)
  }

  /**
   * Handles cluster option click.
   */
  private handleOptionClick(clusterId: string, optionElement: HTMLElement): void {
    // Prevent double-clicks and rapid interactions
    if (this.isProcessingClick) return;
    this.isProcessingClick = true;

    const targetId = this.targetCluster.getData().id;

    if (clusterId === targetId) {
      // Correct selection!
      optionElement.classList.add('correct');
      this.playCorrectSound();

      // Brief delay before completion to show feedback
      setTimeout(() => {
        this.completeChallenge();
      }, 1000);
    } else {
      // Incorrect selection - visual feedback only, can try again
      optionElement.classList.add('incorrect');
      this.playErrorTone();
      this.flashIncorrect();

      // Remove incorrect class after animation and reset lock
      setTimeout(() => {
        optionElement.classList.remove('incorrect');
        this.isProcessingClick = false;
      }, 400);
    }
  }
}
