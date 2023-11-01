import ChangeVisability from '../change-visability';
import Toast from '../../toast';

jest.mock('../../toast', () => ({
  showToast: jest.fn(),
}));

describe('ChangeVisability', () => {
  describe('disabledButton', () => {
    test('should disable the button and add "disabled" class', () => {
      const button = document.createElement('button');
      ChangeVisability.disabledButton(button);
      expect(button.disabled).toBe(true);
      expect(button.classList.contains('disabled')).toBe(true);
    });
  });

  describe('activeButton', () => {
    test('should enable the button and remove "disabled" class', () => {
      const button = document.createElement('button');
      button.disabled = true;
      button.classList.add('disabled');
      ChangeVisability.activeButton(button);
      expect(button.disabled).toBe(false);
      expect(button.classList.contains('disabled')).toBe(false);
    });
  });

  describe('hideBuyBlock', () => {
    test('should hide buy block, update product count, show delete block, and activate buy button', () => {
      document.body.innerHTML = `
        <div class="buy-block"></div>
        <div class="delete-block">
          <div class='count-product'></div>
        </div>
        <button class="buy-now"></button>
      `;
      const buyBlock = document.querySelector('.buy-block') as HTMLDivElement;
      const productCount = document.querySelector('.count-product');
      const deleteBlock = document.querySelector('.delete-block') as HTMLDivElement;
      const buttonBuy = document.querySelector('.buy-now') as HTMLButtonElement;
      ChangeVisability.hideBuyBlock();
      expect(buyBlock?.style.display).toBe('none');
      expect(productCount?.textContent).toBe('1');
      expect(deleteBlock?.style.display).toBe('flex');
      expect(buttonBuy?.disabled).toBe(false);
      expect(buttonBuy?.classList.contains('disabled')).toBe(false);
    });
  });

  describe('hideDeleteBlock', () => {
    test('should hide delete block, disable delete button, show toast, and activate buy button', () => {
      document.body.innerHTML = `
        <div class="delete-block">
        <button class="delete-from-basket"></button>
        </div>
        <div class="buy-block"></div>
      `;
      const showToastMock = jest.spyOn(Toast, 'showToast');

      const deleteBlock = document.querySelector('.delete-block') as HTMLDivElement;
      const buttonDelete = document.querySelector('.delete-from-basket') as HTMLButtonElement;
      const buyBlock = document.querySelector('.buy-block')as HTMLDivElement;
      ChangeVisability.hideDeleteBlock();
      expect(showToastMock).toHaveBeenCalledWith('Product removed from cart', 1000, 'Info');
      expect(deleteBlock.style.display).toBe('none');
      expect(buttonDelete.disabled).toBe(false);
      expect(buyBlock.style.display).toBe('block');
    });
  });
});
