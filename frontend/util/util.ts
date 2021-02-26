import type {
  GridDataProvider,
  GridDataProviderCallback,
  GridDataProviderParams,
  GridElement,
} from "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import { ModelConstructor } from "Frontend/../target/flow-frontend/form";
import GridSorter from "Frontend/generated/org/vaadin/artur/helpers/GridSorter";
import { html } from "lit-element";
import {
  ChildPartInfo,
  directive,
  Directive,
  PartInfo,
  PartType,
} from "lit-html/directive";

interface HasList<T> {
  list(
    offset: number,
    limit: number,
    sortOrder: Array<GridSorter>
  ): Promise<T[]>;
}

export const endPointDataProvider = <T>(
  grid: GridElement,
  endpoint: HasList<T>
): GridDataProvider => {
  const dataProvider: GridDataProvider = async (
    params: GridDataProviderParams,
    callback: GridDataProviderCallback
  ): Promise<void> => {
    const index = params.page * params.pageSize;
    const data = await endpoint.list(
      index,
      params.pageSize,
      params.sortOrders as any
    );
    if (data.length == params.pageSize) {
      grid.size = index + data.length + 1;
    } else {
      grid.size = index + data.length;
    }
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
    render(hasList: HasList<any>) {
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
        (p) =>
          html`<vaadin-grid-sort-column path="${p}"></vaadin-grid-sort-column>`
      );
    }
  }
);
