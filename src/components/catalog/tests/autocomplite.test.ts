import Autocomplete from '../autocomplite';


describe('Autocomplete', () => {
  let autocompleteInput: HTMLInputElement;
  let items: string[];

  beforeEach(() => {
    autocompleteInput = document.createElement('input');
    items = ['apple', 'banana', 'cherry'];
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('startAutocomplete', () => {
    it('should show autocomplete list when input is not empty', () => {
      autocompleteInput.value = 'a';
      document.body.appendChild(autocompleteInput);

      Autocomplete.startAutocomplete(autocompleteInput, items);

      const autocompleteList = document.getElementById('autocomplete');
      expect(autocompleteList).not.toBeNull();
      expect(autocompleteList?.childElementCount).toBe(1);
    });


  describe('filteredItems', () => {
    it('should return filtered items when input is not empty', () => {
      autocompleteInput.value = 'a';

      const filteredItems = Autocomplete.filteredItems(items, autocompleteInput);

      expect(filteredItems).toEqual(['apple']);
    });

    it('should return empty string when input is empty', () => {
      autocompleteInput.value = '';

      const filteredItems = Autocomplete.filteredItems(items, autocompleteInput);

      expect(filteredItems).toBe('');
    });
  });

  describe('clearAutocomplete', () => {
    it('should remove autocomplete list if it exists', () => {
      const autocompleteList = document.createElement('ul');
      autocompleteList.id = 'autocomplete';
      document.body.appendChild(autocompleteList);

      Autocomplete.clearAutocomplete();

      expect(document.getElementById('autocomplete')).toBeNull();
    });

    it('should do nothing if autocomplete list does not exist', () => {
      Autocomplete.clearAutocomplete();

      expect(document.getElementById('autocomplete')).toBeNull();
    });
  });

  });

  describe('clearAutocompleteOnWindowClick', () => {
    it('should clear autocomplete list when clicking outside of input and autocomplete list', () => {
      const autocompleteList = document.createElement('ul');
      autocompleteList.id = 'autocomplete';
      document.body.appendChild(autocompleteInput);
      document.body.appendChild(autocompleteList);

      document.body.click();

      expect(document.getElementById('autocomplete')).toBeNull();
    });
  });
});
