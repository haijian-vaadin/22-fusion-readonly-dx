import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import Temperature from 'Frontend/generated/com/example/application/Temperature';
import City from 'Frontend/generated/com/example/application/City';
import { WeatherEndpoint } from 'Frontend/generated/endpoints';

@customElement('weather-view')
export class WeatherView extends View {
  @state()
  private temp: Temperature = {value: 0, unit: 'Celcius'};
  private city: City = {name: 'Turku', country: 'Finland'};
  render() {
    return html`
      <vaadin-radio-group label="City" @value-changed="${this.cityChanged}">
        <vaadin-radio-button value="turku">Turku</vaadin-radio-button>
        <vaadin-radio-button value="helsinki">Helsinki</vaadin-radio-button>
      </vaadin-radio-group>
      <vaadin-radio-group label="Temperature" @value-changed="${this.unitChanged}">
        <vaadin-radio-button value="Celcius">Celcius </vaadin-radio-button>
        <vaadin-radio-button value="Farenheit">Farenheit</vaadin-radio-button>
      </vaadin-radio-group>
      <span>${this.temp?.value} ${this.temp?.unit}</span>
      `;
  }

  private async cityChanged(event: CustomEvent) {
    this.city = {...this.city, name:event.detail.value};
    this.temp = await WeatherEndpoint.getTemperature(this.city);
  }

  private async unitChanged(event: CustomEvent) {
    this.temp = this.convertTemp(this.temp, event.detail.value);
  }

  private convertTemp (temp: Temperature, targetUnit: String): Temperature {
    if(temp.unit === 'Celcius' && targetUnit === 'Farenheit') {
      const unit = 'Farenheit';
      const value = temp.value*9/5 + 32;
      return {value, unit};
    }
    if(temp.unit === 'Farenheit' && targetUnit === 'Celcius') {
      const unit = 'Celcius';
      const value = (temp.value - 32) * 5/9
      return {value, unit}
    }
    return temp;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add(
      'flex',
      'flex-col',
      'h-full',
      'items-center',
      'justify-center',
      'p-l',
      'text-center',
      'box-border'
    );
  }
}
