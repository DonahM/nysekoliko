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

// src/app/services/classe.service.ts
var ClasseService = class _ClasseService {
  constructor(http) {
    this.http = http;
  }
  getStudentsInClass(idCls) {
    return this.http.get(`${this.apiUrl}/${idCls}`);
  }
  apiUrl = environment.apiUrl + "/classes";
  getClasses() {
    return this.http.get(this.apiUrl);
  }
  getMatieres() {
    return this.http.get(environment.apiUrl + "/matieres");
  }
  getYearsSchools() {
    return this.http.get(environment.apiUrl + "/years-school");
  }
  getSemestres() {
    return this.http.get(environment.apiUrl + "/semestres");
  }
  getClasseById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getStudentsByClass(idCls) {
    return this.http.get(`${environment.apiUrl}/class-e-students/class/${idCls}`);
  }
  createClasse(classe) {
    return this.http.post(this.apiUrl, classe);
  }
  updateClasse(id, classe) {
    return this.http.put(`${this.apiUrl}/${id}`, classe);
  }
  deleteClasse(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function ClasseService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClasseService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClasseService, factory: _ClasseService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClasseService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ClasseService
};
