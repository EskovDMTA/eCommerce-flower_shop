/* eslint-disable no-debugger */
import { Cart, LineItem, LocalizedString } from "@commercetools/platform-sdk";
import { fireEvent } from "@testing-library/dom";
import BasketPage from "./index";


const mockCart = { lineItems: [{ name: { en: 'Flower1' } as LocalizedString } as LineItem] } as Cart;

const updateLineIteamsQuentityMock = jest.fn(() => Promise.resolve(mockCart));

jest.mock('../../repositories/cart-repository', () => jest.fn().mockImplementation(() =>
({
    getOrCreateCartForCurrentCustomer: jest.fn(() => Promise.resolve({ body: mockCart })),
    updateLineItemQuantity: jest.fn(updateLineIteamsQuentityMock)
})));


describe('addMinusBtnListener', () => {
    let productMinus: HTMLElement;
    let productNumber: HTMLElement;
    let changeQuantityTimeout: NodeJS.Timeout | undefined;
    let basketPage: BasketPage;

    afterEach(() => {
        jest.clearAllTimers();

    });

    beforeEach(() => {
        productMinus = document.createElement('button');
        productNumber = document.createElement('span');
        basketPage = new BasketPage('test-page');

    });

    it('should clear the timeout when clicking minus button multiple times', async () => {
        jest.useFakeTimers();
        basketPage.cart = { lineItems: [] as LineItem[] } as Cart;
        productNumber.textContent = '5';
        basketPage.addMinusBtnListener(productMinus, productNumber, changeQuantityTimeout);

        for (let index = 0; index < 5; index += 1) {
            fireEvent.click(productMinus);
        }
        jest.advanceTimersByTime(301);
        expect(updateLineIteamsQuentityMock).toHaveBeenCalledTimes(1);
        updateLineIteamsQuentityMock.mockClear();
    });

    it('should decrease the quantity when the minus button is clicked', async () => {
        basketPage.addMinusBtnListener(productMinus, productNumber, changeQuantityTimeout);
        productNumber.textContent = '3';

        fireEvent.click(productMinus);

        expect(productNumber.textContent).toBe('2');
    });

    it('should set the "disabled" attribute on minus button when quantity is 1', async () => {
        basketPage.addMinusBtnListener(productMinus, productNumber, changeQuantityTimeout);
        productNumber.textContent = '2';

        fireEvent.click(productMinus);

        expect(productMinus.getAttribute('disabled')).toBe('true');
    });
});


describe('addPlusBtnListener', () => {
    let productPlus: HTMLElement;
    let productNumber: HTMLElement;
    let productMinus: HTMLElement;
    let changeQuantityTimeout: NodeJS.Timeout | undefined;
    let basketPage: BasketPage;

    beforeEach(() => {
        productPlus = document.createElement('button');
        productNumber = document.createElement('span');
        productMinus = document.createElement('button');
        basketPage = new BasketPage('test-page');

    });

    it('should clear the timeout when clicking minus button multiple times', async () => {
        jest.useFakeTimers();
        basketPage.cart = { lineItems: [] as LineItem[] } as Cart;
        productNumber.textContent = '5';
        basketPage.addPlusBtnListener(productPlus, productNumber, productMinus, changeQuantityTimeout);

        for (let index = 0; index < 5; index += 1) {
            fireEvent.click(productPlus);
        }
        jest.advanceTimersByTime(301);
        expect(updateLineIteamsQuentityMock).toHaveBeenCalledTimes(1);
        updateLineIteamsQuentityMock.mockClear()
    });


    it('should increase the quantity when the plus button is clicked', async () => {
        basketPage.addPlusBtnListener(productPlus, productNumber, productMinus, changeQuantityTimeout);
        productNumber.textContent = '3';
        fireEvent.click(productPlus);

        expect(productNumber.textContent).toBe('4');
    });

    it('should remove the "disabled" attribute from the minus button when quantity is 2', async () => {
        basketPage.addPlusBtnListener(productPlus, productNumber, productMinus, changeQuantityTimeout);
        productNumber.textContent = '2';

        fireEvent.click(productPlus);

        expect(productMinus.hasAttribute('disabled')).toBe(false);
    });

});

describe('BasketPage', () => {
    let basketPage: BasketPage;

    beforeEach(() => {
        basketPage = new BasketPage('testId');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should initialize cart when init() is called', async () => {
        await basketPage.init();
        expect(basketPage.cart).toEqual(mockCart);
    });

    it('should build line items correctly', () => {
        const productTable = document.createElement('table');
        basketPage.cart = { lineItems: [{ id: '1', name: { en: 'Flower1' } as LocalizedString, variant: { images: [{ url: "https://testImg.com" }] }, quantity: 5, totalPrice: { centAmount: 1200, currencyCode: 'EUR' }, price: { value: { currencyCode: 'EUR' }, discounted: { value: { centAmount: 1000, currencyCode: 'EUR' } } } } as LineItem] } as Cart;

        basketPage.buildLineItems(productTable);

        expect(productTable.querySelector('.line1')).not.toBeNull();
    });

    it('should update total menu correctly', () => {
        const basketTotal = document.createElement('div');
        basketTotal.classList.add('subtotal-price');
        document.body.append(basketTotal);

        basketPage.cart = { lineItems: [{ id: '1', name: { en: 'Flower1' } as LocalizedString, variant: { images: [{ url: "https://testImg.com" }] }, quantity: 5, totalPrice: { centAmount: 1200, currencyCode: 'EUR' }, price: { value: { centAmount: 1000, currencyCode: 'EUR' }, discounted: { value: { centAmount: 1000, currencyCode: 'EUR' } } } } as LineItem], totalPrice: { centAmount: 5000, currencyCode: 'EUR' } } as Cart;

        basketPage.updateTotalMenu();

        expect(basketTotal.textContent).toBe('50.00 EUR');
    });


    it('should render the page correctly', () => {
        const elementToRender = basketPage.render();

        expect(elementToRender.querySelector('.basket-section')).not.toBeNull();
    });
});
