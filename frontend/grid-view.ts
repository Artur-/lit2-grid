import "@vaadin/vaadin-grid";
import PersonModel from "Frontend/generated/com/example/application/PersonModel";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint";
import { html, LitElement } from "lit-element";
import { customElement } from "lit-element/decorators";
import { gridColumns, endpointDataProvider } from "./util";

@customElement("grid-view")
export class GridView extends LitElement {
  render() {
    return html`<vaadin-grid ${endpointDataProvider(PersonEndpoint)}>${gridColumns(PersonModel)}</vaadin-grid>`;
  }
}
