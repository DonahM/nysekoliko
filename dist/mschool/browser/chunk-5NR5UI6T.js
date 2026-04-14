import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-WDYDIQUW.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-RWHPURSU.js";
import {
  DepensesService
} from "./chunk-QCFWXFOG.js";
import {
  ClasseService
} from "./chunk-KGUGHEWL.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  RequiredValidator
} from "./chunk-Y2EH7FHO.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  MatIcon,
  MatIconModule
} from "./chunk-YSC4OPIM.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  MatButton,
  MatButtonModule,
  MatIconButton,
  NgForOf,
  NgIf
} from "./chunk-BZTEMCU3.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WM4GUMJH.js";
import "./chunk-DAU4QTJP.js";

// src/app/back-office/depenses/depenses.component.ts
function DepensesComponent_mat_option_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 21);
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
function DepensesComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function DepensesComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddForm = true);
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nouvelle D\xE9pense ");
    \u0275\u0275elementEnd();
  }
}
function DepensesComponent_mat_card_11_mat_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    \u0275\u0275property("value", cat_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r5);
  }
}
function DepensesComponent_mat_card_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 23)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Enregistrer une d\xE9pense");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "div", 24)(6, "mat-form-field", 25)(7, "mat-label");
    \u0275\u0275text(8, "Titre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function DepensesComponent_mat_card_11_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newDepense.titre, $event) || (ctx_r2.newDepense.titre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 25)(11, "mat-label");
    \u0275\u0275text(12, "Cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DepensesComponent_mat_card_11_Template_mat_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newDepense.categorie, $event) || (ctx_r2.newDepense.categorie = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(14, DepensesComponent_mat_card_11_mat_option_14_Template, 2, 2, "mat-option", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "mat-form-field", 25)(16, "mat-label");
    \u0275\u0275text(17, "Montant (Ar)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function DepensesComponent_mat_card_11_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newDepense.valeur, $event) || (ctx_r2.newDepense.valeur = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-form-field", 25)(20, "mat-label");
    \u0275\u0275text(21, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function DepensesComponent_mat_card_11_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newDepense.date, $event) || (ctx_r2.newDepense.date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "mat-form-field", 30)(24, "mat-label");
    \u0275\u0275text(25, "Description (Optionnel)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "textarea", 31);
    \u0275\u0275twoWayListener("ngModelChange", function DepensesComponent_mat_card_11_Template_textarea_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newDepense.description, $event) || (ctx_r2.newDepense.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "mat-card-actions", 32)(28, "button", 33);
    \u0275\u0275listener("click", function DepensesComponent_mat_card_11_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelAdd());
    });
    \u0275\u0275text(29, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 34);
    \u0275\u0275listener("click", function DepensesComponent_mat_card_11_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveDepense());
    });
    \u0275\u0275text(31, "Enregistrer");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDepense.titre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDepense.categorie);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.categories);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDepense.valeur);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDepense.date);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDepense.description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.newDepense.titre || !ctx_r2.newDepense.valeur);
  }
}
function DepensesComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, " Date ");
    \u0275\u0275elementEnd();
  }
}
function DepensesComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, element_r6.date, "dd/MM/yyyy"), " ");
  }
}
function DepensesComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, " Titre ");
    \u0275\u0275elementEnd();
  }
}
function DepensesComponent_td_19_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(element_r7.description);
  }
}
function DepensesComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36)(1, "div", 37)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, DepensesComponent_td_19_span_4_Template, 2, 1, "span", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(element_r7.titre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", element_r7.description);
  }
}
function DepensesComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, " Cat\xE9gorie ");
    \u0275\u0275elementEnd();
  }
}
function DepensesComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(element_r8.categorie);
  }
}
function DepensesComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, " Montant ");
    \u0275\u0275elementEnd();
  }
}
function DepensesComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, element_r9.valeur, "1.0-0"), " Ar ");
  }
}
function DepensesComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, " Actions ");
    \u0275\u0275elementEnd();
  }
}
function DepensesComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 36)(1, "button", 42);
    \u0275\u0275listener("click", function DepensesComponent_td_28_Template_button_click_1_listener() {
      const element_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteDepense(element_r11.idDep));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DepensesComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 43);
  }
}
function DepensesComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 44);
  }
}
function DepensesComponent_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 45)(1, "td", 46);
    \u0275\u0275text(2, " Aucune d\xE9pense trouv\xE9e. ");
    \u0275\u0275elementEnd()();
  }
}
var DepensesComponent = class _DepensesComponent {
  constructor(depensesService, classeService) {
    this.depensesService = depensesService;
    this.classeService = classeService;
  }
  depenses = [];
  displayedColumns = ["date", "titre", "categorie", "valeur", "actions"];
  yearsSchools = [];
  selectedSchoolId = null;
  newDepense = {
    titre: "",
    description: "",
    categorie: "Autre",
    valeur: 0,
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    mois: this.getCurrentMonth()
  };
  showAddForm = false;
  categories = ["Achat", "Facture", "Entretien", "\xC9v\xE9nement", "Autre"];
  ngOnInit() {
    this.classeService.getYearsSchools().subscribe({
      next: (res) => {
        this.yearsSchools = res.data;
        if (this.yearsSchools.length > 0) {
          this.selectedSchoolId = this.yearsSchools[0].idSchool;
          this.loadDepenses();
        }
      }
    });
  }
  getCurrentMonth() {
    const months = ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"];
    return months[(/* @__PURE__ */ new Date()).getMonth()];
  }
  loadDepenses() {
    if (this.selectedSchoolId) {
      this.depensesService.getDepenses(this.selectedSchoolId).subscribe((res) => {
        this.depenses = res;
      });
    }
  }
  onSchoolChange() {
    this.loadDepenses();
  }
  saveDepense() {
    if (!this.selectedSchoolId)
      return;
    let idUser = void 0;
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      idUser = parsedData.idUser;
    }
    const payload = {
      titre: this.newDepense.titre,
      description: this.newDepense.description,
      categorie: this.newDepense.categorie,
      valeur: this.newDepense.valeur,
      date: this.newDepense.date,
      mois: this.newDepense.mois,
      idSchool: this.selectedSchoolId,
      idUser
    };
    this.depensesService.createDepense(payload).subscribe(() => {
      this.loadDepenses();
      this.cancelAdd();
    });
  }
  deleteDepense(id) {
    if (confirm("Voulez-vous vraiment supprimer cette d\xE9pense ?")) {
      this.depensesService.deleteDepense(id).subscribe(() => {
        this.loadDepenses();
      });
    }
  }
  cancelAdd() {
    this.showAddForm = false;
    this.newDepense = {
      titre: "",
      description: "",
      categorie: "Autre",
      valeur: 0,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      mois: this.getCurrentMonth()
    };
  }
  static \u0275fac = function DepensesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DepensesComponent)(\u0275\u0275directiveInject(DepensesService), \u0275\u0275directiveInject(ClasseService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DepensesComponent, selectors: [["app-depenses"]], decls: 32, vars: 7, consts: [[1, "depenses-container"], [1, "header-section"], [1, "actions"], ["appearance", "outline", 1, "school-select"], [3, "ngModelChange", "selectionChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", "class", "add-btn", 3, "click", 4, "ngIf"], ["class", "add-form-card", 4, "ngIf"], [1, "table-card"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "date"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "titre"], ["matColumnDef", "categorie"], ["matColumnDef", "valeur"], ["mat-cell", "", "class", "amount", 4, "matCellDef"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "value"], ["mat-raised-button", "", "color", "primary", 1, "add-btn", 3, "click"], [1, "add-form-card"], [1, "form-grid"], ["appearance", "outline"], ["matInput", "", "placeholder", "Libell\xE9 de la d\xE9pense", "required", "", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["matInput", "", "type", "number", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "date", "required", "", 3, "ngModelChange", "ngModel"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "rows", "2", 3, "ngModelChange", "ngModel"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "title-container"], ["class", "desc-text", 4, "ngIf"], [1, "desc-text"], [1, "cat-badge"], ["mat-cell", "", 1, "amount"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "5", 1, "mat-cell", "empty-state"]], template: function DepensesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Gestion des D\xE9penses");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "Ann\xE9e Scolaire");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "mat-select", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DepensesComponent_Template_mat_select_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedSchoolId, $event) || (ctx.selectedSchoolId = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function DepensesComponent_Template_mat_select_selectionChange_8_listener() {
        return ctx.onSchoolChange();
      });
      \u0275\u0275template(9, DepensesComponent_mat_option_9_Template, 2, 2, "mat-option", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, DepensesComponent_button_10_Template, 4, 0, "button", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, DepensesComponent_mat_card_11_Template, 32, 7, "mat-card", 7);
      \u0275\u0275elementStart(12, "mat-card", 8)(13, "table", 9);
      \u0275\u0275elementContainerStart(14, 10);
      \u0275\u0275template(15, DepensesComponent_th_15_Template, 2, 0, "th", 11)(16, DepensesComponent_td_16_Template, 3, 4, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(17, 13);
      \u0275\u0275template(18, DepensesComponent_th_18_Template, 2, 0, "th", 11)(19, DepensesComponent_td_19_Template, 5, 2, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(20, 14);
      \u0275\u0275template(21, DepensesComponent_th_21_Template, 2, 0, "th", 11)(22, DepensesComponent_td_22_Template, 3, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(23, 15);
      \u0275\u0275template(24, DepensesComponent_th_24_Template, 2, 0, "th", 11)(25, DepensesComponent_td_25_Template, 3, 4, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(26, 17);
      \u0275\u0275template(27, DepensesComponent_th_27_Template, 2, 0, "th", 11)(28, DepensesComponent_td_28_Template, 4, 0, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(29, DepensesComponent_tr_29_Template, 1, 0, "tr", 18)(30, DepensesComponent_tr_30_Template, 1, 0, "tr", 19)(31, DepensesComponent_tr_31_Template, 3, 0, "tr", 20);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedSchoolId);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.yearsSchools);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.showAddForm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAddForm);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.depenses);
      \u0275\u0275advance(16);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, DatePipe, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, RequiredValidator, NgModel, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatIconModule, MatIcon, MatButtonModule, MatButton, MatIconButton, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow, MatInputModule, MatInput, MatFormField, MatLabel, MatSelectModule, MatSelect, MatOption], styles: ['\n\n.depenses-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 100px);\n  font-family:\n    "Inter",\n    Roboto,\n    sans-serif;\n}\n.header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.add-btn[_ngcontent-%COMP%] {\n  height: 56px;\n  border-radius: 8px;\n  padding: 0 24px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.add-form-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-top: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.table-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  overflow-x: auto;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  background-color: #f1f5f9;\n  color: #475569;\n  font-weight: 600;\n  font-size: 14px;\n}\n.title-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.title-container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1e293b;\n  font-size: 15px;\n}\n.desc-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n  margin-top: 4px;\n}\n.amount[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n.cat-badge[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 1;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px !important;\n  color: #64748b;\n  font-size: 15px;\n}'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepensesComponent, [{
    type: Component,
    args: [{ selector: "app-depenses", standalone: true, imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatInputModule, MatSelectModule], template: `<div class="depenses-container">
  <div class="header-section">
    <h1>Gestion des D\xE9penses</h1>
    
    <div class="actions">
      <mat-form-field appearance="outline" class="school-select">
        <mat-label>Ann\xE9e Scolaire</mat-label>
        <mat-select [(ngModel)]="selectedSchoolId" (selectionChange)="onSchoolChange()">
          <mat-option *ngFor="let ys of yearsSchools" [value]="ys.idSchool">
            {{ ys.annee_scolaire }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      
      <button mat-raised-button color="primary" class="add-btn" (click)="showAddForm = true" *ngIf="!showAddForm">
        <mat-icon>add</mat-icon> Nouvelle D\xE9pense
      </button>
    </div>
  </div>

  <mat-card class="add-form-card" *ngIf="showAddForm">
    <mat-card-header>
      <mat-card-title>Enregistrer une d\xE9pense</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Titre</mat-label>
          <input matInput [(ngModel)]="newDepense.titre" placeholder="Libell\xE9 de la d\xE9pense" required>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Cat\xE9gorie</mat-label>
          <mat-select [(ngModel)]="newDepense.categorie">
            <mat-option *ngFor="let cat of categories" [value]="cat">{{ cat }}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Montant (Ar)</mat-label>
          <input matInput type="number" [(ngModel)]="newDepense.valeur" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Date</mat-label>
          <input matInput type="date" [(ngModel)]="newDepense.date" required>
        </mat-form-field>
      </div>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Description (Optionnel)</mat-label>
        <textarea matInput [(ngModel)]="newDepense.description" rows="2"></textarea>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions align="end">
      <button mat-button (click)="cancelAdd()">Annuler</button>
      <button mat-raised-button color="primary" (click)="saveDepense()" [disabled]="!newDepense.titre || !newDepense.valeur">Enregistrer</button>
    </mat-card-actions>
  </mat-card>

  <mat-card class="table-card">
    <table mat-table [dataSource]="depenses">
      
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef> Date </th>
        <td mat-cell *matCellDef="let element"> {{ element.date | date:'dd/MM/yyyy' }} </td>
      </ng-container>

      <ng-container matColumnDef="titre">
        <th mat-header-cell *matHeaderCellDef> Titre </th>
        <td mat-cell *matCellDef="let element"> 
          <div class="title-container">
            <strong>{{ element.titre }}</strong>
            <span class="desc-text" *ngIf="element.description">{{ element.description }}</span>
          </div>
        </td>
      </ng-container>

      <ng-container matColumnDef="categorie">
        <th mat-header-cell *matHeaderCellDef> Cat\xE9gorie </th>
        <td mat-cell *matCellDef="let element">
          <span class="cat-badge">{{ element.categorie }}</span>
        </td>
      </ng-container>

      <ng-container matColumnDef="valeur">
        <th mat-header-cell *matHeaderCellDef> Montant </th>
        <td mat-cell *matCellDef="let element" class="amount"> {{ element.valeur | number:'1.0-0' }} Ar </td>
      </ng-container>
      
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let element">
          <button mat-icon-button color="warn" (click)="deleteDepense(element.idDep)"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      
      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell empty-state" colspan="5">
          Aucune d\xE9pense trouv\xE9e.
        </td>
      </tr>
    </table>
  </mat-card>
</div>
`, styles: ['/* src/app/back-office/depenses/depenses.component.css */\n.depenses-container {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 100px);\n  font-family:\n    "Inter",\n    Roboto,\n    sans-serif;\n}\n.header-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\nh1 {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n}\n.actions {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.add-btn {\n  height: 56px;\n  border-radius: 8px;\n  padding: 0 24px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.add-form-card {\n  margin-bottom: 24px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-top: 16px;\n}\n.full-width {\n  width: 100%;\n}\n.table-card {\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  overflow-x: auto;\n}\ntable {\n  width: 100%;\n}\nth.mat-header-cell {\n  background-color: #f1f5f9;\n  color: #475569;\n  font-weight: 600;\n  font-size: 14px;\n}\n.title-container {\n  display: flex;\n  flex-direction: column;\n}\n.title-container strong {\n  color: #1e293b;\n  font-size: 15px;\n}\n.desc-text {\n  font-size: 13px;\n  color: #64748b;\n  margin-top: 4px;\n}\n.amount {\n  font-weight: 600;\n  color: #0f172a;\n}\n.cat-badge {\n  background: #e2e8f0;\n  color: #475569;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 1;\n}\n.empty-state {\n  text-align: center;\n  padding: 48px !important;\n  color: #64748b;\n  font-size: 15px;\n}\n'] }]
  }], () => [{ type: DepensesService }, { type: ClasseService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DepensesComponent, { className: "DepensesComponent", filePath: "src/app/back-office/depenses/depenses.component.ts", lineNumber: 20 });
})();
export {
  DepensesComponent
};
