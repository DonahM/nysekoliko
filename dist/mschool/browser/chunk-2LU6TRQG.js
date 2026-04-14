import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-UIY6KQVR.js";
import "./chunk-SGYCFQGT.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-RWHPURSU.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectModule,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-Y2EH7FHO.js";
import {
  CommonModule,
  HttpClient,
  MatButton,
  MatButtonModule,
  NgIf,
  environment
} from "./chunk-BZTEMCU3.js";
import {
  Component,
  Inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-WM4GUMJH.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-DAU4QTJP.js";

// src/app/back-office/addecolage/addecolage.component.ts
function AddecolageComponent_mat_error_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le mois est requis. ");
    \u0275\u0275elementEnd();
  }
}
function AddecolageComponent_mat_error_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La valeur est requise. ");
    \u0275\u0275elementEnd();
  }
}
function AddecolageComponent_mat_error_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La valeur doit \xEAtre sup\xE9rieure \xE0 0. ");
    \u0275\u0275elementEnd();
  }
}
function AddecolageComponent_mat_error_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le statut est requis. ");
    \u0275\u0275elementEnd();
  }
}
function AddecolageComponent_mat_error_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La date est requise. ");
    \u0275\u0275elementEnd();
  }
}
function AddecolageComponent_mat_error_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La id est requise. ");
    \u0275\u0275elementEnd();
  }
}
var AddecolageComponent = class _AddecolageComponent {
  constructor(fb, http, dialogRef, data) {
    this.fb = fb;
    this.http = http;
    this.dialogRef = dialogRef;
    this.data = data;
    this.studentId = data.studentId;
    this.ecolageForm = this.fb.group({
      mois: ["", Validators.required],
      valeur: [0, [Validators.required, Validators.min(1)]],
      statut: ["Payer", Validators.required],
      date: ["", Validators.required],
      // idEdt: ['', Validators.required],
      idSchool: ["", Validators.required]
    });
  }
  baseUrl = environment.baseUrl;
  ecolageForm;
  studentId;
  statusOptions = ["Payer", "Non Payer"];
  student = null;
  anneeScolaire = "";
  ngOnInit() {
    this.loadStudentData();
  }
  loadStudentData() {
    this.http.get(`${environment.apiUrl}/etudiants/${this.studentId}`).subscribe({
      next: (studentData) => {
        this.student = studentData;
        this.anneeScolaire = studentData.anneeScolaire || "";
        this.ecolageForm.patchValue({
          idSchool: this.anneeScolaire
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement des donn\xE9es de l'\xE9tudiant:", err);
      }
    });
  }
  onSubmit() {
    if (this.ecolageForm.valid) {
      const newEcolage = __spreadProps(__spreadValues({}, this.ecolageForm.value), {
        idEdt: this.studentId
        // idSchool: 1 // Remplace cette valeur avec l'ID de l'école, si nécessaire.
      });
      this.http.post(environment.apiUrl + "/ecolages", newEcolage).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          alert("Erreur lors de l'ajout de l'\xE9colage");
        }
      });
    }
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  static \u0275fac = function AddecolageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddecolageComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddecolageComponent, selectors: [["app-addecolage"]], decls: 61, vars: 9, consts: [["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], ["formControlName", "mois"], ["value", "Janvier"], ["value", "F\xE9vrier"], ["value", "Mars"], ["value", "Avril"], ["value", "Mai"], ["value", "Juin"], ["value", "Juillet"], ["value", "Ao\xFBt"], ["value", "Septembre"], ["value", "Octobre"], ["value", "Novembre"], ["value", "D\xE9cembre"], [4, "ngIf"], ["matInput", "", "formControlName", "valeur", "type", "number"], ["formControlName", "statut"], ["value", "Pay\xE9"], ["matInput", "", "formControlName", "date", "type", "date"], ["matInput", "", "formControlName", "idSchool", "type", "number"], ["mat-button", "", 3, "click"], ["mat-button", "", "type", "submit", 3, "mat-dialog-close", "disabled"]], template: function AddecolageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1, "Ajouter un \xE9cologie");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "form", 1);
      \u0275\u0275listener("ngSubmit", function AddecolageComponent_Template_form_ngSubmit_2_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(3, "mat-dialog-content")(4, "mat-form-field")(5, "mat-label");
      \u0275\u0275text(6, "Mois");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "mat-select", 2)(8, "mat-option", 3);
      \u0275\u0275text(9, "Janvier");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "mat-option", 4);
      \u0275\u0275text(11, "F\xE9vrier");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "mat-option", 5);
      \u0275\u0275text(13, "Mars");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-option", 6);
      \u0275\u0275text(15, "Avril");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "mat-option", 7);
      \u0275\u0275text(17, "Mai");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-option", 8);
      \u0275\u0275text(19, "Juin");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "mat-option", 9);
      \u0275\u0275text(21, "Juillet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-option", 10);
      \u0275\u0275text(23, "Ao\xFBt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-option", 11);
      \u0275\u0275text(25, "Septembre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "mat-option", 12);
      \u0275\u0275text(27, "Octobre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-option", 13);
      \u0275\u0275text(29, "Novembre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "mat-option", 14);
      \u0275\u0275text(31, "D\xE9cembre");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(32, AddecolageComponent_mat_error_32_Template, 2, 0, "mat-error", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "mat-form-field")(34, "mat-label");
      \u0275\u0275text(35, "Valeur (Ariary)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "input", 16);
      \u0275\u0275template(37, AddecolageComponent_mat_error_37_Template, 2, 0, "mat-error", 15)(38, AddecolageComponent_mat_error_38_Template, 2, 0, "mat-error", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-form-field")(40, "mat-label");
      \u0275\u0275text(41, "Statut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "mat-select", 17)(43, "mat-option", 18);
      \u0275\u0275text(44, "Payer");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(45, AddecolageComponent_mat_error_45_Template, 2, 0, "mat-error", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "mat-form-field")(47, "mat-label");
      \u0275\u0275text(48, "Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(49, "input", 19);
      \u0275\u0275template(50, AddecolageComponent_mat_error_50_Template, 2, 0, "mat-error", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "mat-form-field")(52, "mat-label");
      \u0275\u0275text(53, "annee_scolaire");
      \u0275\u0275elementEnd();
      \u0275\u0275element(54, "input", 20);
      \u0275\u0275template(55, AddecolageComponent_mat_error_55_Template, 2, 0, "mat-error", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "mat-dialog-actions")(57, "button", 21);
      \u0275\u0275listener("click", function AddecolageComponent_Template_button_click_57_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(58, "Annuler");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "button", 22);
      \u0275\u0275text(60, "Ajouter");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.ecolageForm);
      \u0275\u0275advance(30);
      \u0275\u0275property("ngIf", (tmp_1_0 = ctx.ecolageForm.get("mois")) == null ? null : tmp_1_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_2_0 = ctx.ecolageForm.get("valeur")) == null ? null : tmp_2_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_3_0 = ctx.ecolageForm.get("valeur")) == null ? null : tmp_3_0.hasError("min"));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", (tmp_4_0 = ctx.ecolageForm.get("statut")) == null ? null : tmp_4_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_5_0 = ctx.ecolageForm.get("date")) == null ? null : tmp_5_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.ecolageForm.get("number")) == null ? null : tmp_6_0.hasError("required"));
      \u0275\u0275advance(4);
      \u0275\u0275property("mat-dialog-close", true)("disabled", ctx.ecolageForm.invalid);
    }
  }, dependencies: [MatDialogModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatError, MatInputModule, MatInput, MatButtonModule, MatButton, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CommonModule, NgIf, MatSelectModule, MatSelect, MatOption], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddecolageComponent, [{
    type: Component,
    args: [{ selector: "app-addecolage", imports: [
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      CommonModule,
      MatSelectModule
    ], template: `<h2 mat-dialog-title>Ajouter un \xE9cologie</h2>
<form [formGroup]="ecolageForm" (ngSubmit)="onSubmit()">
  <mat-dialog-content>
    <mat-form-field>
      <mat-label>Mois</mat-label>
      <mat-select formControlName="mois">
        <mat-option value="Janvier">Janvier</mat-option>
        <mat-option value="F\xE9vrier">F\xE9vrier</mat-option>
        <mat-option value="Mars">Mars</mat-option>
        <mat-option value="Avril">Avril</mat-option>
        <mat-option value="Mai">Mai</mat-option>
        <mat-option value="Juin">Juin</mat-option>
        <mat-option value="Juillet">Juillet</mat-option>
        <mat-option value="Ao\xFBt">Ao\xFBt</mat-option>
        <mat-option value="Septembre">Septembre</mat-option>
        <mat-option value="Octobre">Octobre</mat-option>
        <mat-option value="Novembre">Novembre</mat-option>
        <mat-option value="D\xE9cembre">D\xE9cembre</mat-option>
      </mat-select>
      <mat-error *ngIf="ecolageForm.get('mois')?.hasError('required')">
        Le mois est requis.
      </mat-error>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Valeur (Ariary)</mat-label>
      <input matInput formControlName="valeur" type="number" />
      <mat-error *ngIf="ecolageForm.get('valeur')?.hasError('required')">
        La valeur est requise.
      </mat-error>
      <mat-error *ngIf="ecolageForm.get('valeur')?.hasError('min')">
        La valeur doit \xEAtre sup\xE9rieure \xE0 0.
      </mat-error>
    </mat-form-field>

    <!-- <mat-form-field>
      <mat-label>Statut</mat-label>
      <input matInput formControlName="statut" />
      <mat-error *ngIf="ecolageForm.get('statut')?.hasError('required')">
        Le statut est requis.
      </mat-error>
    </mat-form-field> -->

    <mat-form-field>
        <mat-label>Statut</mat-label>
        <mat-select formControlName="statut">
          <mat-option value="Pay\xE9">Payer</mat-option>
          <!-- <mat-option value="Non Pay\xE9">Non Pay\xE9</mat-option> -->
        </mat-select>
        <mat-error *ngIf="ecolageForm.get('statut')?.hasError('required')">
          Le statut est requis.
        </mat-error>
      </mat-form-field>

    <mat-form-field>
      <mat-label>Date</mat-label>
      <input matInput formControlName="date" type="date" />
      <mat-error *ngIf="ecolageForm.get('date')?.hasError('required')">
        La date est requise.
      </mat-error>
    </mat-form-field>

    <!-- <mat-form-field>
      <mat-label>Etudiant</mat-label>
      <input matInput formControlName="idEdt" type="number" />
      <mat-error *ngIf="ecolageForm.get('numbre')?.hasError('required')">
        La idEdt est requise.
      </mat-error>
    </mat-form-field> -->

    <mat-form-field>
      <mat-label>annee_scolaire</mat-label>
      <input matInput formControlName="idSchool" type="number" />
      <mat-error *ngIf="ecolageForm.get('number')?.hasError('required')">
        La id est requise.
      </mat-error>
    </mat-form-field>

  </mat-dialog-content>

  <mat-dialog-actions>
    <button mat-button (click)="onCancel()">Annuler</button>
    <button mat-button [mat-dialog-close]="true" type="submit" [disabled]="ecolageForm.invalid">Ajouter</button>
  </mat-dialog-actions>
</form>
` }]
  }], () => [{ type: FormBuilder }, { type: HttpClient }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddecolageComponent, { className: "AddecolageComponent", filePath: "src/app/back-office/addecolage/addecolage.component.ts", lineNumber: 26 });
})();
export {
  AddecolageComponent
};
