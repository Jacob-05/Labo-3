export class BreedDetail extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const id = this.getAttribute('breed-id');
      if (!id) return;
  
      fetch(`https://dogapi.dog/api/v2/breeds/${id}`)
        .then(res => res.json())
        .then(data => {
          const breed = data.data.attributes;
          this.shadowRoot!.innerHTML = `
            <div class="detail">
              <h2>${breed.name}</h2>
              <p><strong>Description:</strong> ${breed.description || 'N/A'}</p>
              <p><strong>Life Span:</strong> ${breed.life.min} - ${breed.life.max} years</p>
              <p><strong>Male Weight:</strong> ${breed.male_weight.min} - ${breed.male_weight.max} kg</p>
              <p><strong>Female Weight:</strong> ${breed.female_weight.min} - ${breed.female_weight.max} kg</p>
            </div>
          `;
        });
    }
  }
  
  customElements.define('breed-detail', BreedDetail);
  