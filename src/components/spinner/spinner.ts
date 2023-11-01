export default class Spinner {
    public spinnerElement!: HTMLDivElement;
    
    private isShown = false;

    constructor(private size: number = 50, private color: string = 'var(--green-color)') {
        this.createSpinnerElement();
    }

    private createSpinnerElement() {
        const spinnerContainer = document.createElement('div');
        spinnerContainer.style.display = 'flex';
        spinnerContainer.style.justifyContent = 'center';
        spinnerContainer.style.alignItems = 'center';
        spinnerContainer.style.width = '100%';
        spinnerContainer.style.height = '100%';
        spinnerContainer.style.position = 'absolute'
        spinnerContainer.style.top = '0'
        spinnerContainer.style.left = '0'


        const spinnerElement = document.createElement('div');
        spinnerElement.style.width = `${this.size}px`;
        spinnerElement.style.height = `${this.size}px`;
        spinnerElement.style.border = `4px solid ${this.color}`;
        spinnerElement.style.borderRadius = '50%';
        spinnerElement.style.borderTop = '4px solid transparent';
        spinnerElement.style.animation = 'spin 1s linear infinite';


        spinnerContainer.appendChild(spinnerElement);

        this.spinnerElement = spinnerContainer;
    }

    public show(targetElement: HTMLElement) {
        if(!this.isShown){
            targetElement.appendChild(this.spinnerElement);
            this.isShown = true;
        }
    }

    public hide() {
        if (this.isShown && this.spinnerElement.parentNode) {
            this.spinnerElement.parentNode.removeChild(this.spinnerElement);
            this.isShown = false;
        }
    }
}
