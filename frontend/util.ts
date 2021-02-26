import type {
  GridDataProvider,
  GridDataProviderCallback,
  GridDataProviderParams,
  GridElement,
} from "@vaadin/vaadin-grid";
import { ModelConstructor } from "Frontend/../target/flow-frontend/form";
import Person from "Frontend/generated/com/example/application/Person";
import { html } from "lit-element";
import {
  ChildPartInfo,
  directive,
  Directive,
  PartInfo,
  PartType,
} from "lit-html/directive";

interface HasList<T> {
  list(): Promise<T[]>;
}

export const endPointDataProvider = <T>(
  grid: GridElement,
  endpoint: HasList<T>
): GridDataProvider => {
  const dataProvider: GridDataProvider = async (
    _params: GridDataProviderParams,
    callback: GridDataProviderCallback
  ): Promise<void> => {
    // const index = params.page * params.pageSize;
    const data = await endpoint
      .list
      // index,
      // params.pageSize,
      // params.sortOrders as any
      ();
    grid.size = data.length;
    callback(data);
  };
  return dataProvider;
};

export const endpointDataProvider = directive(
  class extends Directive {
    partInfo: any;
    constructor(partInfo: PartInfo) {
      super(partInfo);
      if (partInfo.type !== PartType.ELEMENT) {
        throw new Error(
          "Use as <vaadin-grid ${listProvider(...)}></vaadin-grid>"
        );
      }
      this.partInfo = partInfo;
    }
    render(hasList: HasList<Person>) {
      const grid = (this.partInfo as any).element as GridElement;

      grid.dataProvider = endPointDataProvider(grid, hasList);
    }
  }
);

export const gridColumns = directive(
  class extends Directive {
    partInfo: ChildPartInfo;
    constructor(partInfo: PartInfo) {
      super(partInfo);
      if (partInfo.type !== PartType.CHILD) {
        throw new Error(
          "Use as <vaadin-grid>${gridColumns(...)}</vaadin-grid>"
        );
      }
      this.partInfo = partInfo;
    }
    render(Model: ModelConstructor<any, any>) {
      const properties = Object.keys(
        Object.getOwnPropertyDescriptors(Model.prototype)
      ).filter((p) => p !== "constructor");

      return properties.map(
        (p) => html`<vaadin-grid-column path="${p}"></vaadin-grid-column>`
      );
    }
  }
);
