import {
  HttpClient,
  environment
} from "./chunk-BZTEMCU3.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WM4GUMJH.js";

// src/app/services/depenses.service.ts
var DepensesService = class _DepensesService {
  constructor(http) {
    this.http = http;
  }
  apiUrl = environment.apiUrl + "/depenses";
  getDepenses(idSchool) {
    const url = idSchool ? `${this.apiUrl}?idSchool=${idSchool}` : this.apiUrl;
    return this.http.get(url);
  }
  getDepenseById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createDepense(depense) {
    return this.http.post(this.apiUrl, depense);
  }
  updateDepense(id, depense) {
    return this.http.patch(`${this.apiUrl}/${id}`, depense);
  }
  deleteDepense(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function DepensesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DepensesService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DepensesService, factory: _DepensesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepensesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  DepensesService
};
