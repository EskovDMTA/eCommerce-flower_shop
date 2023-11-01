import Toast from '../toast';

export default class ChangeVisability {
  static disabledButton(target: HTMLButtonElement) {
    // eslint-disable-next-line no-param-reassign
    target.disabled = true;
    target.classList.add("disabled")
  }

  static activeButton(target: HTMLButtonElement) {
    // eslint-disable-next-line no-param-reassign
    target.disabled = false;
    target.classList.remove("disabled")
  }

  static hideBuyBlock() {
      const buttonBuy = document.querySelector(".buy-now") as HTMLButtonElement;
      if (buttonBuy) {
        const buyBlock = document.querySelector(".buy-block") as HTMLDivElement;
        const productCount = document.querySelector(".count-product");
        if (productCount) {
          productCount.textContent = "1";
        }
        buyBlock.style.display = "none";
        ChangeVisability.activeButton(buttonBuy);
        const deleteBlock = document.querySelector(".delete-block") as HTMLDivElement;
        deleteBlock.style.display = "flex";
      }
    }

    static hideDeleteBlock() {
        const buttonDelete = document.querySelector(".delete-from-basket") as HTMLButtonElement;
        ChangeVisability.disabledButton(buttonDelete);
        Toast.showToast("Product removed from cart", 1000, 'Info')
        const deleteBlock = document.querySelector(".delete-block") as HTMLDivElement;
        deleteBlock.style.display = "none";
        ChangeVisability.activeButton(buttonDelete);
        const buyBlock = document.querySelector(".buy-block") as HTMLDivElement;
        buyBlock.style.display = "block";
      }
}
