/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import "./index.css";
import { Category, Product, ProductProjection } from "@commercetools/platform-sdk";
import Page from '../../templates/page';
import СreateElement from '../../templates/constructor';
import saleImgPath from '../../assets/images/sale.png';
import catalogSearchImgPath from '../../assets/images/search.svg';
import ProductRepository from '../../repositories/product-repository';
import CategoriesRepository from "../../repositories/categories-repository";
import SearchRepository from "../../repositories/search-repository";
import SortingRepository from "../../repositories/sorting-repository";
import CatalogListener from '../../components/catalog/catalog-listener';
import FilterRepository from "../../repositories/filter-repository";
import Breadcrumb from './breadcrumb';
import Autocomplete from '../../components/catalog/autocomplite';
import ChangeVisability from '../../components/product/change-visability';
import ProductToCart from '../../components/product/product-to-cart';
import Toast from '../../components/toast';


let inputValue: string;
let filterParametrArray: string[] = [];
let productsArray: Product[];
let productsArrayCustom: ProductProjection[];
let paginationLength: number;
let paginationStart: number;
let paginationEnd: number;
const itemsPerPage = 6;





const FilterMenu = [
  {
    text: 'Price',
    options: [
      ['< €10', 'variants.price.centAmount:range (0 to 1000)'],
      ['from €10 to €20', 'variants.price.centAmount:range (1001 to 2000)'],
      ['> €20', 'variants.price.centAmount:range (2001 to 3000)']
    ]
  },
  {
    text: 'Categories',
    options: [
      ['No categories', 'categories:missing'],
      ['There is a category', 'categories:exists'],
      // ['Sale', 'variants.scopedPriceDiscounted'],
    ]
  },
];

const SortingArray = [
  {
    text: 'Default sorting',
    sortParametr: 'LastModifiedAt Desc',
  },
  {
    text: 'Name ↑',
    sortParametr: 'name.en Asc',
  },
  {
    text: 'Name ↓',
    sortParametr: 'name.en Desc',
  },
  {
    text: 'Price ↑',
    sortParametr: 'Price Asc',
  },
  {
    text: 'Price ↓',
    sortParametr: 'Price Desc',
  },
];

class CatalogPage extends Page {
  static TextObject = {
    MainTitle: 'Catalog',
  };

  private catalogSection: HTMLElement = new СreateElement('section', ['catalog-section']).appendTo(this.container);

  private catalogBlock: HTMLElement = new СreateElement('div', ['catalog-block']).appendTo(this.catalogSection);

  private productsBlock: HTMLElement = new СreateElement('div', ['products-items-block']).appendTo(this.catalogSection);

  private productsActionsBlock: HTMLElement = new СreateElement('div', ['products-actions-block']).appendTo(this.productsBlock);

  private productsItmes: HTMLElement = new СreateElement('div', ['products-items']).appendTo(this.productsBlock);

  private paginationItemsBlock: HTMLElement = new СreateElement('div', ['pagination-items-block']).appendTo(this.productsBlock);



  private categories: Category[] = [];

  private async initCategories() {
    const categoriesRepo = new CategoriesRepository();
    const categories = (await categoriesRepo.getCategories()).results;
    this.categories = categories;
    this.buildCatalog(categories);
  }

  private async initProducts() {
    const productRepo = new ProductRepository();
    productsArray = (await productRepo.getProducts()).results;
    this.buildPagination();
    paginationStart = 0;
    paginationEnd = 6;
    await this.buildProductsItems();
  }

  private initSearch = async () => {
    this.productsItmes.innerHTML = '';
    const searchRepo = new SearchRepository();
    productsArrayCustom = (await searchRepo.getSearch(inputValue)).results;
    this.buildPaginationCustom();
    this.buildProductsItem();
  }

  private initSorting = async (sortParametr: string) => {
    this.productsItmes.innerHTML = '';
    const sortingRepo = new SortingRepository();
    productsArrayCustom = (await sortingRepo.getSorting(sortParametr)).results;
    this.buildPaginationCustom();
    this.buildProductsItem();
  }

  private initFiltering = async (filterParametr: string | string[]) => {
    this.productsItmes.innerHTML = '';
    const filterRepo = new FilterRepository();
    productsArrayCustom = (await filterRepo.getFilter(filterParametr)).results;
    this.buildPaginationCustom();
    this.buildProductsItem();
  }

  private async buildCatalog(categories: Category[]) {
    const breadcrumbContainer = new СreateElement('div', ['breadcrumb'], []).appendTo(this.catalogBlock);
    const breadcrumbPlants = new СreateElement('a', ['breadcrumb-item'], [{prop: 'href', value: '#catalog-page'}], 'Plants').appendTo(breadcrumbContainer);
    breadcrumbPlants.addEventListener("click", ()=> {
      const breadcrumbBlock = document.querySelector('.breadcrumb');
      if(breadcrumbBlock) {
        Breadcrumb.deleteBreadcrumb()
      };
      this.productsItmes.innerHTML = "";
      this.buildProductsItems(productsArray);
    });
    const catalogTitle = new СreateElement('h1', ['catalog-title'], [], 'Catalog').appendTo(this.catalogBlock);
    const catalogBlockItems = new СreateElement('div', ['catalog-block-items']).appendTo(this.catalogBlock);
    categories.forEach(category => {
      const catalogBlockItemBlock = new СreateElement('div', ['catalog-block-item-block']).appendTo(catalogBlockItems);
      const catalogBlockItemText = new СreateElement('div', ['catalog-block-item-text'], [{prop: 'id', value: `${category.id}`}], `${category.name.en}`).appendTo(catalogBlockItemBlock);
      catalogBlockItemText.addEventListener('click', (event) => {
        const filterParametr: string | string[] = (event.target as HTMLInputElement).id;
        if(filterParametr){
          Breadcrumb.createBreadcrumb(filterParametr)?.appendTo(breadcrumbContainer);
          this.initFiltering(`categories.id:"${filterParametr}"`);
        }
      });

    })
  }


  private async buildActionsBlock() {
    const productsActionsBlockSearchSortingBlock = new СreateElement('div', ['products-actions-block-search-sorting-block']).appendTo(this.productsActionsBlock);
    // Search
    const catalogSearch = new СreateElement('form', ['catalog-search']).appendTo(productsActionsBlockSearchSortingBlock);
    const catalogContainer = new СreateElement('div', ['catalog-search-container']).appendTo(catalogSearch)
    const catalogSearchInput = new СreateElement('input', ['catalog-search-input'], [{prop: 'type', value: `search`}]).appendTo(catalogContainer) as HTMLInputElement;;
    catalogSearchInput.addEventListener("input", async (event: Event) => {
      const searchInput = event.target as HTMLInputElement;
      const plantsName = productsArray.map(elem => elem.masterData.current.name.en)
      Autocomplete.startAutocomplete(searchInput, plantsName)
    });
    catalogSearchInput.addEventListener("focus", async(event) => {

    })
    catalogSearchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        inputValue = catalogSearchInput.value
        this.initSearch();
      }
    });
    const catalogSearchBtn = new СreateElement('btn', ['catalog-search-btn']).appendTo(catalogContainer);
    catalogSearchBtn.addEventListener("click", async () => {
      inputValue = catalogSearchInput.value
      await this.initSearch()
    });
    const catalogSearchImg = new СreateElement('img', ['catalog-search-img'], [{prop: 'src', value: catalogSearchImgPath}]).appendTo(catalogSearchBtn);
    // Sorting
    const productsSortingMenu = new СreateElement('div', ['products-sorting-menu']).appendTo(productsActionsBlockSearchSortingBlock);
    const productsSortingTitle = new СreateElement('div', ['products-sorting-title'], [], 'Sort by:').appendTo(productsSortingMenu);
    const productsSortingDropdown = new СreateElement('select', ['products-sorting-dropdown']).appendTo(productsSortingMenu);
    SortingArray.forEach((SortingOption) => {
      const productsSortingOption = new СreateElement('option', ['products-sorting-option'], [], SortingOption.text).appendTo(productsSortingDropdown);
       });
    productsSortingDropdown.addEventListener("change", (event: Event) => {
      const selectedOptionValue = (event.target as HTMLOptionElement).value;
      const sortParametr = SortingArray.find(option => option.text === selectedOptionValue)?.sortParametr;
      if (sortParametr !== undefined) {
        this.initSorting(sortParametr);
      }
    });
    // Filter
    const productsActionsBlockFilterBlock = new СreateElement('div', ['products-actions-block-filter-block']).appendTo(this.productsActionsBlock);
    const FilterBlockTitle = new СreateElement('button', ['filter-block-title'], [], 'Filter').appendTo(productsActionsBlockFilterBlock);
    const FilterBlockBody = new СreateElement('div', ['filter-block-body'], [{prop: 'style', value: 'display: none'}]).appendTo(productsActionsBlockFilterBlock);
    FilterBlockTitle.addEventListener("click", () => {
      if (FilterBlockBody.style.display === "none") {
        FilterBlockBody.style.display = "block";
      } else {
        FilterBlockBody.style.display = "none";
      }
    });
    const productsFilterMenu = new СreateElement('div', ['products-filter-menu']).appendTo(FilterBlockBody);
    FilterMenu.forEach((item) => {
      const filterMenuItem = new СreateElement('div', ['filter-menu-item']).appendTo(productsFilterMenu);
      const filterMenuItemTitle = new СreateElement('div', ['filter-menu-item-title'], [], `${item.text}:`).appendTo(filterMenuItem);
      const filterMenuItemBlock = new СreateElement('div', ['filter-menu-item-block']).appendTo(filterMenuItem);
      item.options.forEach(element => {
        const optionCheckBoxBlock = new СreateElement('div', ['filter-menu-item-option-checkbox-block']).appendTo(filterMenuItemBlock);
        const optionParametr = new СreateElement('label', ['filter-menu-item-option-parametr'], [{prop: 'for', value: `${element[0]}`}], `${element[0]}:`).appendTo(optionCheckBoxBlock);
        const optionCheckBoxInput = new СreateElement('input', ['filter-menu-item-option-checkbox-input'], [{prop: 'type', value: 'checkbox'}, {prop: 'id', value: `${element[1]}`}]).appendTo(optionCheckBoxBlock);
        optionCheckBoxInput.addEventListener('change', (event) => {
          if ((event.target as HTMLInputElement).checked) {
            const filterParametr: string = (event.target as HTMLInputElement).id;
            filterParametrArray.push(filterParametr);
            if (filterParametrArray !== undefined) {
              this.initFiltering(filterParametrArray);
            }
          } else {
            const filterParametr: string = (event.target as HTMLInputElement).id;
            filterParametrArray = filterParametrArray.filter(arrayItem => arrayItem !== filterParametr);
            this.initFiltering(filterParametrArray);
          }
        });
      });
    });
  }

  private async buildProductsItems(products: Product[] = productsArray.slice(paginationStart, paginationEnd)) {
    this.productsItmes.innerHTML = '';
    products.forEach(product => {
      const productsItem = new СreateElement('div', ['products-item'], [{prop: 'data-id', value: product.id}]).appendTo(this.productsItmes);
      const productsItemImgBlock = new СreateElement('div', ['products-item-img-block']).appendTo(productsItem);
      if(product.masterData.current.masterVariant.images) {
        const productsItemImg = new СreateElement('img', ['products-item-img'], [{prop: 'src', value: product.masterData.current.masterVariant.images[0].url}]).appendTo(productsItemImgBlock);
      }
      const productsItemTitleBlock = new СreateElement('div', ['products-item-title-block']).appendTo(productsItem);
      if(product.masterData.current.name.en) {
        const productsItemTitle = new СreateElement('div', ['products-item-title'], [], `${product.masterData.current.name.en}`).appendTo(productsItemTitleBlock);
      }
      const productsBasketButton = new СreateElement('button', ['catalog-buy-button'], [{prop: 'data-id', value: product.id}], 'buy').appendTo(productsItemTitleBlock)
      productsBasketButton.addEventListener('click', this.handleBuyButton);
      const productsPriceBlock = new СreateElement('div', ['products-item-price-block']).appendTo(productsItem);
      if(product.masterData.current.masterVariant.prices) {
        const priceInCents = product.masterData.current.masterVariant.prices[0].value.centAmount;
        const priceInEur = (priceInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
        const productsItemPrice = new СreateElement('div', ['products-item-price'], [], priceInEur).appendTo(productsPriceBlock);
      }
      if(product.masterData.current.masterVariant.prices) {
        const discountedPriceInCents = product.masterData.current.masterVariant.prices[0].discounted?.value.centAmount;
        if(discountedPriceInCents) {
          productsPriceBlock.innerHTML = '';
          const discountedPriceInEur = (discountedPriceInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
          const productsItemPrice = new СreateElement('div', ['products-item-price-discounted'], [], discountedPriceInEur).appendTo(productsPriceBlock);
          const productsItemImgSale = new СreateElement('img', ['products-item-img-sale'], [{prop: 'src', value: saleImgPath}]).appendTo(productsItemImgBlock);
          if(product.masterData.current.masterVariant.prices) {
            const priceInCents = product.masterData.current.masterVariant.prices[0].value.centAmount;
            const priceInEur = (priceInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
            const productsItemOldPrice = new СreateElement('div', ['products-item-price', 'products-item-old-price'], [], priceInEur).appendTo(productsPriceBlock);
          }
        }
      }
      productsItemImgBlock.addEventListener('click', () => {
        CatalogListener.modifyHashWithProductId(product.id);
      });
    });
  }

  private async buildProductsItem(products: ProductProjection[] = productsArrayCustom.slice(paginationStart, paginationEnd)) {
    this.productsItmes.innerHTML = '';
    products.forEach(product => {
      const productsItem = new СreateElement('div', ['products-item'], [{prop: 'data-id', value: product.id}]).appendTo(this.productsItmes);
      const productsItemImgBlock = new СreateElement('div', ['products-item-img-block']).appendTo(productsItem);
      if(product.masterVariant.images) {
        const productsItemImg = new СreateElement('img', ['products-item-img'], [{prop: 'src', value: product.masterVariant.images[0].url}]).appendTo(productsItemImgBlock);
      }
      const productsItemTitleBlock = new СreateElement('div', ['products-item-title-block']).appendTo(productsItem);
      if(product.name.en) {
        const productsItemTitle = new СreateElement('div', ['products-item-title'], [], `${product.name.en}`).appendTo(productsItemTitleBlock);
      }
      const productsPriceBlock = new СreateElement('div', ['products-item-price-block']).appendTo(productsItem);
      if(product.masterVariant.prices) {
        const priceInCents = product.masterVariant.prices[0].value.centAmount;
        const priceInEur = (priceInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
        const productsItemPrice = new СreateElement('div', ['products-item-price'], [], priceInEur).appendTo(productsPriceBlock);
      }
      if(product.masterVariant.prices) {
        const discountedPriceInCents = product.masterVariant.prices[0].discounted?.value.centAmount;
        if(discountedPriceInCents) {
          productsPriceBlock.innerHTML = '';
          const discountedPriceInEur = (discountedPriceInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
          const productsItemPrice = new СreateElement('div', ['products-item-price-discounted'], [], discountedPriceInEur).appendTo(productsPriceBlock);
          const productsItemImgSale = new СreateElement('img', ['products-item-img-sale'], [{prop: 'src', value: saleImgPath}]).appendTo(productsItemImgBlock);
          if(product.masterVariant.prices) {
            const priceInCents = product.masterVariant.prices[0].value.centAmount;
            const priceInEur = (priceInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
            const productsItemOldPrice = new СreateElement('div', ['products-item-price', 'products-item-old-price'], [], priceInEur).appendTo(productsPriceBlock);
          }
        }
      }
      productsItemImgBlock.addEventListener('click', () => {
        CatalogListener.modifyHashWithProductId(product.id);
      });
    })
  }

  private buildPagination() {
    this.paginationItemsBlock.innerHTML = '';
    paginationLength = Math.ceil(productsArray.length/itemsPerPage);
    const paginationItems = new СreateElement('div', ['pagination-items']).appendTo(this.paginationItemsBlock);
    const paginationItemElements: { item: HTMLElement; number: HTMLElement; }[] = [];
    for (let index = 0; index < paginationLength; index += 1) {
      const paginationItem = new СreateElement('button', ['pagination-item']).appendTo(paginationItems);
      const paginationItemNumber = new СreateElement('div', ['pagination-item-number'], [], '', `${index+1}`).appendTo(paginationItem);
      paginationItemElements.push({ item: paginationItem, number: paginationItemNumber });
      if (parseInt(paginationItemNumber.innerHTML, 10) === 1) {
        paginationItem.classList.add('pagination-item-active');
        paginationItemNumber.classList.add('pagination-item-number-active');
      }
      paginationItem.addEventListener('click', () => {
        const pageNumber = parseInt(paginationItemNumber.innerHTML, 10);
        this.handlePaginationClick(pageNumber);
        this.buildProductsItems();
        paginationItemElements.forEach(({ item, number }) => {
          item.classList.remove('pagination-item-active');
          number.classList.remove('pagination-item-number-active');
        });
        paginationItem.classList.add('pagination-item-active');
        paginationItemNumber.classList.add('pagination-item-number-active');
      });
    }
  }

  private buildPaginationCustom() {
    this.paginationItemsBlock.innerHTML = '';
    paginationLength = Math.ceil(productsArrayCustom.length/itemsPerPage);
    const paginationItems = new СreateElement('div', ['pagination-items']).appendTo(this.paginationItemsBlock);
    const paginationItemElements: { item: HTMLElement; number: HTMLElement; }[] = [];
    for (let index = 0; index < paginationLength; index += 1) {
      const paginationItem = new СreateElement('button', ['pagination-item']).appendTo(paginationItems);
      const paginationItemNumber = new СreateElement('div', ['pagination-item-number'], [], '', `${index+1}`).appendTo(paginationItem);
      paginationItemElements.push({ item: paginationItem, number: paginationItemNumber });
      if (parseInt(paginationItemNumber.innerHTML, 10) === 1) {
        paginationItem.classList.add('pagination-item-active');
        paginationItemNumber.classList.add('pagination-item-number-active');
      }
      paginationItem.addEventListener('click', () => {
        const pageNumber = parseInt(paginationItemNumber.innerHTML, 10);
        this.handlePaginationClick(pageNumber);
        this.buildProductsItem();
        paginationItemElements.forEach(({ item, number }) => {
          item.classList.remove('pagination-item-active');
          number.classList.remove('pagination-item-number-active');
        });
        paginationItem.classList.add('pagination-item-active');
        paginationItemNumber.classList.add('pagination-item-number-active');
      });
    }
  }

  private handlePaginationClick(pageNumber: number) {
    paginationStart = (pageNumber - 1) * itemsPerPage;
    paginationEnd = pageNumber * itemsPerPage;
  };

  async handleBuyButton(event:Event){
    const buttonBuy = event.target as HTMLButtonElement;
    const productID = buttonBuy.dataset.id;
    ChangeVisability.disabledButton(buttonBuy);
    try {
      if(productID){
        await new ProductToCart().addProductToCartFromCatalog(productID);
        Toast.showToast("Product added to cart", 1000, 'Info')
        ChangeVisability.activeButton(buttonBuy);
      }
    } catch (e) {
      if (e instanceof Error) {
        Toast.showToast(`${e.message}`, 1000, 'Error')
        ChangeVisability.activeButton(buttonBuy);
      }
    }
  }

  render() {
    this.initCategories();
    this.buildActionsBlock();
    this.initProducts();
    return this.container;
  }
};

export default CatalogPage;
