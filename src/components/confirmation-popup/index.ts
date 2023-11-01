import'./index.css';

export default class ConfirmationPopup {
    private modal: HTMLDivElement;

    private confirmCallback: (() => void) | undefined;
  
    constructor() {
      this.modal = this.createModal();
    }
  
    private createModal(): HTMLDivElement {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class='modal-content'>
          <h2>Are you sure?</h2>
          <p>Do you want to proceed with this action?</p>
          <button class='modal-button confirm-btn'>Yes</button>
          <button class='modal-button cancel-btn'>No</button>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      const confirmBtn = modal.querySelector('.confirm-btn') as HTMLButtonElement;
      const cancelBtn = modal.querySelector('.cancel-btn') as HTMLButtonElement;
      
      confirmBtn.addEventListener('click', () => {
        if (this.confirmCallback) {
          this.confirmCallback();
        }
        this.close();
      });
      
      cancelBtn.addEventListener('click', () => {
        this.close();
      });
      
      return modal;
    }
  
    open(confirmCallback: () => void) {
      this.confirmCallback = confirmCallback;
      this.modal.style.display = 'block';
    }
  
    close() {
      this.modal.style.display = 'none';
      this.confirmCallback = undefined;
    }
  }
  