export class DogBreeds extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.innerHTML = `<div class="container" id="breeds-list">Loading...</div>`;
    }
  
    connectedCallback() {
      fetch('https://dogapi.dog/api/v2/breeds')
        .then(res => res.json())
        .then(data => {
          const breeds = data.data;
          const list = this.shadowRoot!.getElementById('breeds-list')!;
          list.innerHTML = '';
  
          breeds.forEach((breed: any) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<strong>${breed.attributes.name}</strong>`;
            card.addEventListener('click', () => {
              document.querySelector('breed-detail')?.remove();
              const detail = document.createElement('breed-detail');
              detail.setAttribute('breed-id', breed.id);
              this.after(detail);
            });
            list.appendChild(card);
          });
        });
    }
  }
  
  customElements.define('dog-breeds', DogBreeds);
  