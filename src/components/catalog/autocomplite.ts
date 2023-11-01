export default class Autocomplete {
  static startAutocomplete(autocompleteInput: HTMLInputElement, items: string[]) {

    this.clearAutocomplete();
    this.clearAutocompleteOnWindowClick();
    const plants = this.filteredItems(
      items,
      autocompleteInput
    );
    this.showAutocomplete(plants, autocompleteInput);
  }

  static filteredItems(
    plants: string[],
    autocompleteInput: HTMLInputElement
  ) {
    const inputValue = autocompleteInput.value;
    if (inputValue === '') {
      return '';
    }
    return plants.filter((plant) =>
      plant.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  }

  static clearAutocomplete() {
    const autocomplete = document.getElementById('autocomplete');
    if (autocomplete) {
      autocomplete.remove();
    }
  }

  static showAutocomplete(
    filteredPlants: string | string[],
    autocompleteInput: HTMLInputElement
  ) {
    const autocompleteList = document.createElement('ul');
    autocompleteList.id = 'autocomplete';
    if (Array.isArray(filteredPlants)) {
      filteredPlants.forEach((plant) => {
        const option = document.createElement('li');
        option.addEventListener('click', Autocomplete.onItemClick);
        option.textContent = plant;
        autocompleteList.appendChild(option);
      });
    }
    autocompleteInput.parentNode?.insertBefore(
      autocompleteList,
      autocompleteInput.nextSibling
    );
  }

  static onItemClick(e: Event): void {
    const itemValue = (e.target as HTMLLIElement).textContent;
    const itemInput = document.querySelector(
      '.catalog-search-input'
    ) as HTMLInputElement;
    if (itemInput && itemValue) {
      itemInput.value = itemValue;
      itemInput.focus();
    }
    Autocomplete.clearAutocomplete();
  }

  static clearAutocompleteOnWindowClick() {
    document.body.addEventListener('click', this.clearAutocomplete);
  }
}
