import {
  DepensesService
} from "./chunk-QCFWXFOG.js";
import {
  ClasseService
} from "./chunk-KGUGHEWL.js";
import {
  FormsModule,
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectModule,
  NgControlStatus,
  NgModel
} from "./chunk-Y2EH7FHO.js";
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle,
  MatIcon,
  MatIconModule
} from "./chunk-YSC4OPIM.js";
import {
  CommonModule,
  DecimalPipe,
  HttpClient,
  MatButtonModule,
  NgClass,
  NgForOf,
  NgIf,
  environment
} from "./chunk-BZTEMCU3.js";
import {
  Component,
  Injectable,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WM4GUMJH.js";
import "./chunk-DAU4QTJP.js";

// src/app/services/finances.service.ts
var FinancesService = class _FinancesService {
  constructor(http) {
    this.http = http;
  }
  apiUrl = environment.apiUrl + "/finances";
  getBilanMois(idSchool, mois) {
    return this.http.get(`${this.apiUrl}/bilan/mois?idSchool=${idSchool}&mois=${mois}`);
  }
  getBilanAnnee(idSchool, annee_scolaire) {
    return this.http.get(`${this.apiUrl}/bilan/annee?idSchool=${idSchool}&annee_scolaire=${annee_scolaire}`);
  }
  getBilanGlobal(idSchool) {
    return this.http.get(`${this.apiUrl}/bilan/all?idSchool=${idSchool}`);
  }
  static \u0275fac = function FinancesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FinancesService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FinancesService, factory: _FinancesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinancesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/back-office/finances/finances.component.ts
var _c0 = (a0) => ({ "loss-card": a0 });
function FinancesComponent_mat_option_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ys_r1 = ctx.$implicit;
    \u0275\u0275property("value", ys_r1.idSchool);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ys_r1.annee_scolaire, " ");
  }
}
function FinancesComponent_mat_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r2 = ctx.$implicit;
    \u0275\u0275property("value", m_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r2);
  }
}
function FinancesComponent_div_17_span_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "D\xE9ficit financier");
    \u0275\u0275elementEnd();
  }
}
function FinancesComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-card", 10)(2, "mat-card-header")(3, "div", 11)(4, "mat-icon");
    \u0275\u0275text(5, "account_balance_wallet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-title");
    \u0275\u0275text(7, "Revenus (\xC9colages)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-card-subtitle");
    \u0275\u0275text(9, "Entr\xE9es totales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-card-content")(11, "h2");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "mat-card", 12)(15, "mat-card-header")(16, "div", 13)(17, "mat-icon");
    \u0275\u0275text(18, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-card-title");
    \u0275\u0275text(20, "Charges Salariales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "mat-card-subtitle");
    \u0275\u0275text(22, "Paies des professeurs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-card-content")(24, "h2");
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "mat-card", 12)(28, "mat-card-header")(29, "div", 13)(30, "mat-icon");
    \u0275\u0275text(31, "receipt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "mat-card-title");
    \u0275\u0275text(33, "Autres D\xE9penses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-card-subtitle");
    \u0275\u0275text(35, "Achats, Factures, etc.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "mat-card-content")(37, "h2");
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "mat-card", 14)(41, "mat-card-header")(42, "div", 15)(43, "mat-icon");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "mat-card-title");
    \u0275\u0275text(46, "B\xE9n\xE9fice Net");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "mat-card-subtitle");
    \u0275\u0275text(48, "Soit Revenus - D\xE9penses");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "mat-card-content")(50, "h2");
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(53, FinancesComponent_div_17_span_53_Template, 2, 0, "span", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(13, 7, ctx_r2.bilanGlobal.revenus, "1.0-0"), " Ar");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(26, 10, ctx_r2.bilanGlobal.salaires, "1.0-0"), " Ar");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(39, 13, ctx_r2.bilanGlobal.depenses, "1.0-0"), " Ar");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(19, _c0, ctx_r2.bilanGlobal.benefice < 0));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.bilanGlobal.benefice >= 0 ? "trending_up" : "trending_down");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(52, 16, ctx_r2.abs(ctx_r2.bilanGlobal.benefice), "1.0-0"), " Ar");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.bilanGlobal.benefice < 0);
  }
}
var FinancesComponent = class _FinancesComponent {
  constructor(financesService, depensesService, classeService) {
    this.financesService = financesService;
    this.depensesService = depensesService;
    this.classeService = classeService;
  }
  abs(value) {
    return Math.abs(value);
  }
  yearsSchools = [];
  selectedSchoolId = null;
  bilanGlobal = null;
  depenses = [];
  months = ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"];
  selectedMonth = "";
  ngOnInit() {
    this.classeService.getYearsSchools().subscribe({
      next: (res) => {
        this.yearsSchools = res.data;
        if (this.yearsSchools.length > 0) {
          this.selectedSchoolId = this.yearsSchools[0].idSchool;
          this.loadBilan();
        }
      }
    });
  }
  loadBilan() {
    if (!this.selectedSchoolId)
      return;
    if (this.selectedMonth) {
      this.financesService.getBilanMois(this.selectedSchoolId, this.selectedMonth).subscribe((res) => {
        this.bilanGlobal = res;
      });
    } else {
      this.financesService.getBilanGlobal(this.selectedSchoolId).subscribe((res) => {
        this.bilanGlobal = res;
      });
    }
  }
  onFilterChange() {
    this.loadBilan();
  }
  static \u0275fac = function FinancesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FinancesComponent)(\u0275\u0275directiveInject(FinancesService), \u0275\u0275directiveInject(DepensesService), \u0275\u0275directiveInject(ClasseService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinancesComponent, selectors: [["app-finances"]], decls: 18, vars: 5, consts: [[1, "finances-dashboard"], [1, "header-section"], [1, "filters"], ["appearance", "outline"], [3, "ngModelChange", "selectionChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["value", ""], ["class", "cards-container", 4, "ngIf"], [3, "value"], [1, "cards-container"], [1, "dashboard-card", "revenues-card"], ["mat-card-avatar", "", 1, "card-icon", "revenues-icon"], [1, "dashboard-card", "expenses-card"], ["mat-card-avatar", "", 1, "card-icon", "expenses-icon"], [1, "dashboard-card", "profit-card", 3, "ngClass"], ["mat-card-avatar", "", 1, "card-icon", "profit-icon"], ["class", "loss-text", 4, "ngIf"], [1, "loss-text"]], template: function FinancesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "R\xE9sum\xE9 Financier");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "Ann\xE9e Scolaire");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "mat-select", 4);
      \u0275\u0275twoWayListener("ngModelChange", function FinancesComponent_Template_mat_select_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedSchoolId, $event) || (ctx.selectedSchoolId = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function FinancesComponent_Template_mat_select_selectionChange_8_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275template(9, FinancesComponent_mat_option_9_Template, 2, 2, "mat-option", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "mat-form-field", 3)(11, "mat-label");
      \u0275\u0275text(12, "Mois");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "mat-select", 4);
      \u0275\u0275twoWayListener("ngModelChange", function FinancesComponent_Template_mat_select_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedMonth, $event) || (ctx.selectedMonth = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function FinancesComponent_Template_mat_select_selectionChange_13_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(14, "mat-option", 6);
      \u0275\u0275text(15, "Toute l'ann\xE9e");
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, FinancesComponent_mat_option_16_Template, 2, 2, "mat-option", 5);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(17, FinancesComponent_div_17_Template, 54, 21, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedSchoolId);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.yearsSchools);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedMonth);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.months);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.bilanGlobal);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DecimalPipe, FormsModule, NgControlStatus, NgModel, MatCardModule, MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIconModule, MatIcon, MatSelectModule, MatFormField, MatLabel, MatSelect, MatOption, MatButtonModule], styles: ['\n\n.finances-dashboard[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 100px);\n  font-family:\n    "Inter",\n    Roboto,\n    sans-serif;\n}\n.header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.cards-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n.dashboard-card[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  border: none;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  overflow: hidden;\n  position: relative;\n}\n.dashboard-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.dashboard-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n}\n.revenues-card[_ngcontent-%COMP%]::before {\n  background-color: #10b981;\n}\n.expenses-card[_ngcontent-%COMP%]::before {\n  background-color: #f59e0b;\n}\n.profit-card[_ngcontent-%COMP%]::before {\n  background-color: #3b82f6;\n}\n.loss-card[_ngcontent-%COMP%]::before {\n  background-color: #ef4444 !important;\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.revenues-icon[_ngcontent-%COMP%] {\n  background-color: #ecfdf5;\n  color: #10b981;\n}\n.expenses-icon[_ngcontent-%COMP%] {\n  background-color: #fef3c7;\n  color: #f59e0b;\n}\n.profit-icon[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #3b82f6;\n}\n.loss-card[_ngcontent-%COMP%]   .profit-icon[_ngcontent-%COMP%] {\n  background-color: #fef2f2;\n  color: #ef4444;\n}\nmat-card-header[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n}\nmat-card-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-weight: 600;\n}\nmat-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n}\nmat-card-content[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\nmat-card-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n}\n.loss-text[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 500;\n  margin-top: 8px;\n  display: block;\n}'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinancesComponent, [{
    type: Component,
    args: [{ selector: "app-finances", standalone: true, imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatSelectModule, MatButtonModule], template: `<div class="finances-dashboard">
  <div class="header-section">
    <h1>R\xE9sum\xE9 Financier</h1>
    <div class="filters">
      <mat-form-field appearance="outline">
        <mat-label>Ann\xE9e Scolaire</mat-label>
        <mat-select [(ngModel)]="selectedSchoolId" (selectionChange)="onFilterChange()">
          <mat-option *ngFor="let ys of yearsSchools" [value]="ys.idSchool">
            {{ ys.annee_scolaire }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Mois</mat-label>
        <mat-select [(ngModel)]="selectedMonth" (selectionChange)="onFilterChange()">
          <mat-option value="">Toute l'ann\xE9e</mat-option>
          <mat-option *ngFor="let m of months" [value]="m">{{ m }}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  </div>

  <div class="cards-container" *ngIf="bilanGlobal">
    <!-- Card Revenus -->
    <mat-card class="dashboard-card revenues-card">
      <mat-card-header>
        <div mat-card-avatar class="card-icon revenues-icon">
          <mat-icon>account_balance_wallet</mat-icon>
        </div>
        <mat-card-title>Revenus (\xC9colages)</mat-card-title>
        <mat-card-subtitle>Entr\xE9es totales</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <h2>{{ bilanGlobal.revenus | number:'1.0-0' }} Ar</h2>
      </mat-card-content>
    </mat-card>

    <!-- Card Salaires -->
    <mat-card class="dashboard-card expenses-card">
      <mat-card-header>
        <div mat-card-avatar class="card-icon expenses-icon">
          <mat-icon>payments</mat-icon>
        </div>
        <mat-card-title>Charges Salariales</mat-card-title>
        <mat-card-subtitle>Paies des professeurs</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <h2>{{ bilanGlobal.salaires | number:'1.0-0' }} Ar</h2>
      </mat-card-content>
    </mat-card>

    <!-- Card D\xE9penses Diverses -->
    <mat-card class="dashboard-card expenses-card">
      <mat-card-header>
        <div mat-card-avatar class="card-icon expenses-icon">
          <mat-icon>receipt</mat-icon>
        </div>
        <mat-card-title>Autres D\xE9penses</mat-card-title>
        <mat-card-subtitle>Achats, Factures, etc.</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <h2>{{ bilanGlobal.depenses | number:'1.0-0' }} Ar</h2>
      </mat-card-content>
    </mat-card>

    <!-- Card B\xE9n\xE9fice -->
    <mat-card class="dashboard-card profit-card" [ngClass]="{'loss-card': bilanGlobal.benefice < 0}">
      <mat-card-header>
        <div mat-card-avatar class="card-icon profit-icon">
          <mat-icon>{{ bilanGlobal.benefice >= 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
        </div>
        <mat-card-title>B\xE9n\xE9fice Net</mat-card-title>
        <mat-card-subtitle>Soit Revenus - D\xE9penses</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <h2>{{ abs(bilanGlobal.benefice) | number:'1.0-0' }} Ar</h2>
        <span *ngIf="bilanGlobal.benefice < 0" class="loss-text">D\xE9ficit financier</span>
      </mat-card-content>
    </mat-card>
  </div>
</div>

`, styles: ['/* src/app/back-office/finances/finances.component.css */\n.finances-dashboard {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 100px);\n  font-family:\n    "Inter",\n    Roboto,\n    sans-serif;\n}\n.header-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.header-section h1 {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n}\n.filters {\n  display: flex;\n  gap: 16px;\n}\n.cards-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n.dashboard-card {\n  border-radius: 16px;\n  border: none;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  overflow: hidden;\n  position: relative;\n}\n.dashboard-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.dashboard-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n}\n.revenues-card::before {\n  background-color: #10b981;\n}\n.expenses-card::before {\n  background-color: #f59e0b;\n}\n.profit-card::before {\n  background-color: #3b82f6;\n}\n.loss-card::before {\n  background-color: #ef4444 !important;\n}\n.card-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon mat-icon {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.revenues-icon {\n  background-color: #ecfdf5;\n  color: #10b981;\n}\n.expenses-icon {\n  background-color: #fef3c7;\n  color: #f59e0b;\n}\n.profit-icon {\n  background-color: #eff6ff;\n  color: #3b82f6;\n}\n.loss-card .profit-icon {\n  background-color: #fef2f2;\n  color: #ef4444;\n}\nmat-card-header {\n  padding-bottom: 0;\n}\nmat-card-title {\n  font-size: 14px;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-weight: 600;\n}\nmat-card-subtitle {\n  font-size: 12px;\n  color: #94a3b8;\n}\nmat-card-content {\n  margin-top: 16px;\n}\nmat-card-content h2 {\n  font-size: 32px;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n}\n.loss-text {\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 500;\n  margin-top: 8px;\n  display: block;\n}\n'] }]
  }], () => [{ type: FinancesService }, { type: DepensesService }, { type: ClasseService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinancesComponent, { className: "FinancesComponent", filePath: "src/app/back-office/finances/finances.component.ts", lineNumber: 19 });
})();
export {
  FinancesComponent
};
