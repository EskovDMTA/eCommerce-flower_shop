import "./index.css";

export default class Toast {
    static showToast(message: string, duration: number, type: "Error" | "Info"): void {
        const toastContainer: HTMLDivElement = document.createElement('div');
        toastContainer.classList.add('toast-container');
        toastContainer.style.backgroundColor = this.getColor(type);
        document.body.appendChild(toastContainer);


        const toast: HTMLDivElement = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;

        toastContainer.appendChild(toast);
        toastContainer.style.display = 'block';

        setTimeout(() => {
            toastContainer.removeChild(toast);
            if (toastContainer.childElementCount === 0) {
                toastContainer.style.display = 'none';
            }
        }, duration);
    }

    static getColor(type: "Error" | "Info") {
        switch (type) {
            case "Error": return "var(--error-color)";
            case "Info": return "var(--green-color)";
            default: return "var(--green-color)";
        }
    }
}
