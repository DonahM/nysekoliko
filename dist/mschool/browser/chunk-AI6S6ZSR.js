import {
  MatInput,
  MatInputModule
} from "./chunk-RWHPURSU.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatSelectModule,
  NgControlStatus,
  NgModel
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
  HttpClient,
  HttpClientModule,
  MatButton,
  MatButtonModule,
  MatIconButton,
  NgForOf,
  NgIf,
  environment
} from "./chunk-BZTEMCU3.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
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
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WM4GUMJH.js";
import "./chunk-DAU4QTJP.js";

// src/app/back-office/actualites/actualites.component.ts
function ActualitesComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.selectedFile.name);
  }
}
function ActualitesComponent_div_30_div_12_img_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const act_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.baseUrl + "/upload/actualites/" + act_r3.mediaUrl, \u0275\u0275sanitizeUrl);
  }
}
function ActualitesComponent_div_30_div_12_video_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "video", 30);
  }
  if (rf & 2) {
    const act_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.baseUrl + "/upload/actualites/" + act_r3.mediaUrl, \u0275\u0275sanitizeUrl);
  }
}
function ActualitesComponent_div_30_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275template(1, ActualitesComponent_div_30_div_12_img_1_Template, 1, 1, "img", 27)(2, ActualitesComponent_div_30_div_12_video_2_Template, 1, 1, "video", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const act_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", act_r3.mediaType === "IMAGE");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", act_r3.mediaType === "VIDEO");
  }
}
function ActualitesComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "mat-icon");
    \u0275\u0275text(4, "account_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 21);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 22);
    \u0275\u0275element(11, "div", 23);
    \u0275\u0275template(12, ActualitesComponent_div_30_div_12_Template, 3, 2, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 25);
    \u0275\u0275listener("click", function ActualitesComponent_div_30_Template_button_click_13_listener() {
      const act_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.deleteActualite(act_r3.idActualite));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "delete_outline");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const act_r3 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(act_r3.user ? act_r3.user.name + " " + act_r3.user.surname : "Administrateur");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 4, act_r3.datePublication, "dd MMM yyyy, HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275property("innerHTML", act_r3.texte, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", act_r3.mediaUrl);
  }
}
function ActualitesComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "mat-icon");
    \u0275\u0275text(2, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Aucune actualit\xE9 publi\xE9e pour le moment.");
    \u0275\u0275elementEnd()();
  }
}
var ActualitesComponent = class _ActualitesComponent {
  constructor(http) {
    this.http = http;
  }
  baseUrl = environment.baseUrl;
  texte = "";
  selectedFile = null;
  actualites = [];
  apiUrl = environment.apiUrl + "/actualites";
  ngOnInit() {
    this.loadActualites();
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  submitActualite() {
    if (!this.texte || this.texte.trim() === "")
      return;
    const formData = new FormData();
    formData.append("texte", this.texte);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.idUser) {
        formData.append("idUser", parsedData.idUser);
      }
    }
    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
    }
    this.http.post(this.apiUrl, formData).subscribe({
      next: () => {
        this.texte = "";
        this.selectedFile = null;
        this.loadActualites();
      },
      error: (err) => {
        console.error("Erreur lors de la publication:", err);
      }
    });
  }
  loadActualites() {
    this.http.get(this.apiUrl).subscribe((data) => {
      this.actualites = data;
    });
  }
  deleteActualite(id) {
    if (confirm("Voulez-vous vraiment supprimer cette actualit\xE9 ?")) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.loadActualites();
      });
    }
  }
  static \u0275fac = function ActualitesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ActualitesComponent)(\u0275\u0275directiveInject(HttpClient));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ActualitesComponent, selectors: [["app-actualites"]], decls: 32, vars: 5, consts: [[1, "actualites-container"], [1, "headerHero"], [1, "form-card"], [1, "editor-container", 2, "margin-bottom", "20px"], [2, "font-weight", "600", "color", "var(--text-primary)", "margin-bottom", "8px", "display", "block"], ["matInput", "", "placeholder", "Que voulez-vous annoncer aujourd'hui ?", "rows", "6", 2, "width", "100%", "min-height", "200px", "resize", "vertical", "border", "1px solid #ccc", "border-radius", "4px", "padding", "12px", "font-family", "inherit", "font-size", "14px", "line-height", "1.5", 3, "ngModelChange", "ngModel"], [1, "file-upload-wrapper"], ["for", "file-upload", 1, "custom-file-upload"], ["id", "file-upload", "type", "file", "accept", "image/*,video/*", 3, "change"], ["class", "file-name", 4, "ngIf"], ["align", "end", 2, "padding-bottom", "10px"], ["mat-raised-button", "", 1, "submit-btn", 3, "click", "disabled"], [2, "margin-right", "5px"], [1, "news-list"], [1, "section-title"], ["class", "news-card", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "file-name"], [1, "news-card"], [1, "news-header"], [1, "news-author"], [1, "news-date"], [1, "news-body"], [1, "news-text", 3, "innerHTML"], ["class", "news-media", 4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Supprimer cette publication", 1, "delete-btn", 3, "click"], [1, "news-media"], ["alt", "Media", "class", "media-preview", 3, "src", 4, "ngIf"], ["controls", "", "class", "media-preview", 3, "src", 4, "ngIf"], ["alt", "Media", 1, "media-preview", 3, "src"], ["controls", "", 1, "media-preview", 3, "src"], [1, "empty-state"]], template: function ActualitesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Nouvelles & Mises \xE0 jour");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "G\xE9rez et diffusez les annonces de votre \xE9tablissement");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "mat-card", 2)(7, "mat-card-header")(8, "mat-card-title");
      \u0275\u0275text(9, "Nouvelle publication");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "mat-card-content")(11, "div", 3)(12, "label", 4);
      \u0275\u0275text(13, "Texte de l'annonce");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "textarea", 5);
      \u0275\u0275twoWayListener("ngModelChange", function ActualitesComponent_Template_textarea_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.texte, $event) || (ctx.texte = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 6)(16, "label", 7)(17, "mat-icon");
      \u0275\u0275text(18, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Joindre une image ou une vid\xE9o ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "input", 8);
      \u0275\u0275listener("change", function ActualitesComponent_Template_input_change_20_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(21, ActualitesComponent_span_21_Template, 2, 1, "span", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "mat-card-actions", 10)(23, "button", 11);
      \u0275\u0275listener("click", function ActualitesComponent_Template_button_click_23_listener() {
        return ctx.submitActualite();
      });
      \u0275\u0275elementStart(24, "mat-icon", 12);
      \u0275\u0275text(25, "send");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " Publier ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 13)(28, "h3", 14);
      \u0275\u0275text(29, "Derni\xE8res Actualit\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275template(30, ActualitesComponent_div_30_Template, 16, 7, "div", 15)(31, ActualitesComponent_div_31_Template, 5, 0, "div", 16);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.texte);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.selectedFile);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.texte);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.actualites);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.actualites.length === 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, HttpClientModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatInputModule, MatInput, MatSelectModule], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding: 30px 20px;\n  position: relative;\n  overflow-x: hidden;\n  --primary-color: #667eea;\n  --accent-color: #764ba2;\n  --success-color: #48bb78;\n  --text-primary: #1e293b;\n  --text-secondary: #475569;\n  --text-muted: #94a3b8;\n  --bg-card: rgba(255, 255, 255, 0.95);\n  --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.05);\n  --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.08);\n  --shadow-hover: 0 15px 35px rgba(0, 0, 0, 0.12);\n  --radius-lg: 20px;\n  --radius-md: 12px;\n}\n[_nghost-%COMP%]::before {\n  content: "";\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-image:\n    radial-gradient(\n      circle at 10% 20%,\n      rgba(102, 126, 234, 0.1) 0%,\n      transparent 40%),\n    radial-gradient(\n      circle at 90% 80%,\n      rgba(118, 75, 162, 0.1) 0%,\n      transparent 40%);\n  pointer-events: none;\n  z-index: 0;\n}\n.actualites-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 850px;\n  margin: 0 auto;\n  animation: _ngcontent-%COMP%_fadeIn 0.6s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.headerHero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary-color) 0%,\n      var(--accent-color) 100%);\n  border-radius: var(--radius-lg);\n  padding: 40px 20px;\n  margin-bottom: 40px;\n  color: white;\n  text-align: center;\n  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n.headerHero[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: -100%;\n  left: -100%;\n  width: 300%;\n  height: 300%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(255, 255, 255, 0.1) 0%,\n      transparent 40%);\n  animation: _ngcontent-%COMP%_heroRotate 25s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_heroRotate {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.headerHero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 36px;\n  font-weight: 800;\n  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n  position: relative;\n  z-index: 2;\n  letter-spacing: -1px;\n}\n.headerHero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0 0 0;\n  font-size: 16px;\n  opacity: 0.95;\n  font-weight: 500;\n  position: relative;\n  z-index: 2;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  backdrop-filter: blur(10px);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-md);\n  padding: 30px;\n  margin-bottom: 50px;\n  border: 1px solid rgba(255, 255, 255, 0.6);\n}\n.form-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.form-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]::before {\n  content: "\\270d\\fe0f";\n  font-size: 24px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n  .mat-mdc-text-field-wrapper {\n  background-color: transparent !important;\n}\n  .mdc-text-field--outlined {\n  border-radius: var(--radius-md) !important;\n}\n.file-upload-wrapper[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  flex-wrap: wrap;\n}\ninput[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.custom-file-upload[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.05);\n  color: var(--primary-color);\n  border: 2px dashed rgba(102, 126, 234, 0.5);\n  padding: 12px 24px;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.custom-file-upload[_ngcontent-%COMP%]:hover {\n  background: var(--primary-color);\n  color: white;\n  border-color: var(--primary-color);\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);\n}\n.file-name[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 0.9rem;\n  font-weight: 500;\n  max-width: 300px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  background: #f1f5f9;\n  padding: 6px 12px;\n  border-radius: 8px;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--success-color),\n      #38a169) !important;\n  color: white !important;\n  border-radius: 30px !important;\n  padding: 8px 32px !important;\n  font-size: 15px !important;\n  font-weight: 700 !important;\n  letter-spacing: 1px;\n  box-shadow: 0 6px 15px rgba(72, 187, 120, 0.4) !important;\n  transition: all 0.3s ease !important;\n  margin-top: 10px;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not([disabled]) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 25px rgba(72, 187, 120, 0.5) !important;\n}\n.submit-btn[disabled][_ngcontent-%COMP%] {\n  background: #cbd5e1 !important;\n  box-shadow: none !important;\n  color: #94a3b8 !important;\n}\n.news-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.section-title[_ngcontent-%COMP%]::before {\n  content: "\\1f4f0";\n  font-size: 28px;\n  animation: _ngcontent-%COMP%_float 3s infinite ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-3px);\n  }\n}\n.news-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  padding: 25px;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid rgba(255, 255, 255, 0.7);\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.news-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-hover);\n}\n.news-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 18px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n.news-author[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-weight: 700;\n  color: var(--text-primary);\n  font-size: 15px;\n}\n.news-author[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n  background: rgba(102, 126, 234, 0.1);\n  border-radius: 50%;\n  padding: 6px;\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.news-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 600;\n  background: rgba(0, 0, 0, 0.04);\n  padding: 6px 14px;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.news-date[_ngcontent-%COMP%]::before {\n  content: "\\1f552";\n  font-size: 12px;\n}\n.news-body[_ngcontent-%COMP%] {\n  padding-top: 5px;\n}\n.news-text[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 1.7;\n  color: var(--text-secondary);\n  white-space: pre-wrap;\n  margin-bottom: 20px;\n}\n.news-media[_ngcontent-%COMP%] {\n  border-radius: var(--radius-md);\n  overflow: hidden;\n  background: #f8fafc;\n  display: flex;\n  justify-content: center;\n  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.02);\n  border: 1px solid #e2e8f0;\n}\n.media-preview[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 450px;\n  object-fit: contain;\n  transition: transform 0.3s ease;\n}\n.media-preview[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n}\n.delete-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  background: rgba(245, 101, 101, 0.08) !important;\n  color: #f56565 !important;\n  transition: all 0.3s ease !important;\n}\n.delete-btn[_ngcontent-%COMP%]:hover {\n  background: #f56565 !important;\n  color: white !important;\n  transform: rotate(8deg) scale(1.1);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 50px 20px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  color: var(--text-muted);\n  border: 2px dashed #cbd5e1;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 15px;\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%] {\n    padding: 15px;\n  }\n  .headerHero[_ngcontent-%COMP%] {\n    padding: 30px 15px;\n    margin-bottom: 30px;\n  }\n  .headerHero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n  .form-card[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .news-card[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .news-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .delete-btn[_ngcontent-%COMP%] {\n    top: 15px;\n    right: 15px;\n  }\n  .news-author[_ngcontent-%COMP%] {\n    flex: 1;\n    margin-bottom: 10px;\n  }\n}\n  .angular-editor-wrapper {\n  background: white !important;\n  border-radius: var(--radius-md) !important;\n  border: 1px solid #e2e8f0 !important;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02) !important;\n  transition: all 0.3s ease !important;\n  overflow: hidden !important;\n}\n  .angular-editor-wrapper:focus-within {\n  border-color: var(--primary-color) !important;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2) !important;\n}\n  .angular-editor-toolbar {\n  background: #f8fafc !important;\n  border-bottom: 1px solid #e2e8f0 !important;\n  border-top-left-radius: var(--radius-md) !important;\n  border-top-right-radius: var(--radius-md) !important;\n  padding: 10px !important;\n  display: flex !important;\n  flex-wrap: wrap !important;\n  gap: 5px !important;\n}\n  .angular-editor-toolbar .angular-editor-button {\n  background: white !important;\n  border: 1px solid #e2e8f0 !important;\n  border-radius: 8px !important;\n  color: var(--text-primary) !important;\n  transition: all 0.2s ease !important;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;\n}\n  .angular-editor-toolbar .angular-editor-button:hover {\n  background: var(--primary-color) !important;\n  color: white !important;\n  border-color: var(--primary-color) !important;\n  transform: translateY(-1px) !important;\n}\n  .angular-editor-toolbar .angular-editor-button.active {\n  background: rgba(102, 126, 234, 0.1) !important;\n  color: var(--primary-color) !important;\n  border-color: var(--primary-color) !important;\n}\n  .angular-editor-textarea {\n  min-height: 200px !important;\n  padding: 20px !important;\n  font-family: inherit !important;\n  font-size: 15px !important;\n  color: var(--text-primary) !important;\n  line-height: 1.6 !important;\n  outline: none !important;\n  border: none !important;\n}\n  .angular-editor-toolbar-set {\n  margin-right: 15px !important;\n}'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ActualitesComponent, [{
    type: Component,
    args: [{ selector: "app-actualites", standalone: true, imports: [CommonModule, HttpClientModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule, MatSelectModule], template: `<div class="actualites-container">
  <div class="headerHero">
    <h1>Nouvelles & Mises \xE0 jour</h1>
    <p>G\xE9rez et diffusez les annonces de votre \xE9tablissement</p>
  </div>

  <mat-card class="form-card">
    <mat-card-header>
      <mat-card-title>Nouvelle publication</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="editor-container" style="margin-bottom: 20px;">
        <label style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; display: block;">Texte de l'annonce</label>
        <textarea 
  matInput
  [(ngModel)]="texte" 
  placeholder="Que voulez-vous annoncer aujourd'hui ?"
  rows="6"
  style="width: 100%; min-height: 200px; resize: vertical; border: 1px solid #ccc; border-radius: 4px; padding: 12px; font-family: inherit; font-size: 14px; line-height: 1.5;">
</textarea>
      </div>

      <div class="file-upload-wrapper">
        <label for="file-upload" class="custom-file-upload">
          <mat-icon>cloud_upload</mat-icon>
          Joindre une image ou une vid\xE9o
        </label>
        <input id="file-upload" type="file" (change)="onFileSelected($event)" accept="image/*,video/*"/>
        <span class="file-name" *ngIf="selectedFile">{{ selectedFile.name }}</span>
      </div>
    </mat-card-content>
    <mat-card-actions align="end" style="padding-bottom: 10px;">
      <button mat-raised-button class="submit-btn" (click)="submitActualite()" [disabled]="!texte">
        <mat-icon style="margin-right: 5px;">send</mat-icon> Publier
      </button>
    </mat-card-actions>
  </mat-card>

  <div class="news-list">
    <h3 class="section-title">Derni\xE8res Actualit\xE9s</h3>
    <div class="news-card" *ngFor="let act of actualites">
      <div class="news-header">
        <div class="news-author">
          <mat-icon>account_circle</mat-icon>
          <span>{{ act.user ? act.user.name + ' ' + act.user.surname : 'Administrateur' }}</span>
        </div>
        <span class="news-date">{{ act.datePublication | date:'dd MMM yyyy, HH:mm' }}</span>
      </div>
      
      <div class="news-body">
        <div class="news-text" [innerHTML]="act.texte"></div>
        
        <div class="news-media" *ngIf="act.mediaUrl">
          <img *ngIf="act.mediaType === 'IMAGE'" [src]="baseUrl + '/upload/actualites/' + act.mediaUrl" alt="Media" class="media-preview"/>
          <video *ngIf="act.mediaType === 'VIDEO'" [src]="baseUrl + '/upload/actualites/' + act.mediaUrl" controls class="media-preview"></video>
        </div>
      </div>
      
      <button mat-icon-button class="delete-btn" (click)="deleteActualite(act.idActualite)" matTooltip="Supprimer cette publication">
        <mat-icon>delete_outline</mat-icon>
      </button>
    </div>
    
    <div class="empty-state" *ngIf="actualites.length === 0">
      <mat-icon>inbox</mat-icon>
      <p>Aucune actualit\xE9 publi\xE9e pour le moment.</p>
    </div>
  </div>
</div>
`, styles: ['/* src/app/back-office/actualites/actualites.component.css */\n:host {\n  display: block;\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding: 30px 20px;\n  position: relative;\n  overflow-x: hidden;\n  --primary-color: #667eea;\n  --accent-color: #764ba2;\n  --success-color: #48bb78;\n  --text-primary: #1e293b;\n  --text-secondary: #475569;\n  --text-muted: #94a3b8;\n  --bg-card: rgba(255, 255, 255, 0.95);\n  --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.05);\n  --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.08);\n  --shadow-hover: 0 15px 35px rgba(0, 0, 0, 0.12);\n  --radius-lg: 20px;\n  --radius-md: 12px;\n}\n:host::before {\n  content: "";\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-image:\n    radial-gradient(\n      circle at 10% 20%,\n      rgba(102, 126, 234, 0.1) 0%,\n      transparent 40%),\n    radial-gradient(\n      circle at 90% 80%,\n      rgba(118, 75, 162, 0.1) 0%,\n      transparent 40%);\n  pointer-events: none;\n  z-index: 0;\n}\n.actualites-container {\n  position: relative;\n  z-index: 1;\n  max-width: 850px;\n  margin: 0 auto;\n  animation: fadeIn 0.6s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.headerHero {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary-color) 0%,\n      var(--accent-color) 100%);\n  border-radius: var(--radius-lg);\n  padding: 40px 20px;\n  margin-bottom: 40px;\n  color: white;\n  text-align: center;\n  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n.headerHero::after {\n  content: "";\n  position: absolute;\n  top: -100%;\n  left: -100%;\n  width: 300%;\n  height: 300%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(255, 255, 255, 0.1) 0%,\n      transparent 40%);\n  animation: heroRotate 25s linear infinite;\n}\n@keyframes heroRotate {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.headerHero h1 {\n  margin: 0;\n  font-size: 36px;\n  font-weight: 800;\n  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n  position: relative;\n  z-index: 2;\n  letter-spacing: -1px;\n}\n.headerHero p {\n  margin: 12px 0 0 0;\n  font-size: 16px;\n  opacity: 0.95;\n  font-weight: 500;\n  position: relative;\n  z-index: 2;\n}\n.form-card {\n  background: var(--bg-card);\n  backdrop-filter: blur(10px);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-md);\n  padding: 30px;\n  margin-bottom: 50px;\n  border: 1px solid rgba(255, 255, 255, 0.6);\n}\n.form-card mat-card-title {\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.form-card mat-card-title::before {\n  content: "\\270d\\fe0f";\n  font-size: 24px;\n}\n.full-width {\n  width: 100%;\n}\n::ng-deep .mat-mdc-text-field-wrapper {\n  background-color: transparent !important;\n}\n::ng-deep .mdc-text-field--outlined {\n  border-radius: var(--radius-md) !important;\n}\n.file-upload-wrapper {\n  margin-top: 15px;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  flex-wrap: wrap;\n}\ninput[type=file] {\n  display: none;\n}\n.custom-file-upload {\n  background: rgba(102, 126, 234, 0.05);\n  color: var(--primary-color);\n  border: 2px dashed rgba(102, 126, 234, 0.5);\n  padding: 12px 24px;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.custom-file-upload:hover {\n  background: var(--primary-color);\n  color: white;\n  border-color: var(--primary-color);\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);\n}\n.file-name {\n  color: var(--text-secondary);\n  font-size: 0.9rem;\n  font-weight: 500;\n  max-width: 300px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  background: #f1f5f9;\n  padding: 6px 12px;\n  border-radius: 8px;\n}\n.submit-btn {\n  background:\n    linear-gradient(\n      135deg,\n      var(--success-color),\n      #38a169) !important;\n  color: white !important;\n  border-radius: 30px !important;\n  padding: 8px 32px !important;\n  font-size: 15px !important;\n  font-weight: 700 !important;\n  letter-spacing: 1px;\n  box-shadow: 0 6px 15px rgba(72, 187, 120, 0.4) !important;\n  transition: all 0.3s ease !important;\n  margin-top: 10px;\n}\n.submit-btn:hover:not([disabled]) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 25px rgba(72, 187, 120, 0.5) !important;\n}\n.submit-btn[disabled] {\n  background: #cbd5e1 !important;\n  box-shadow: none !important;\n  color: #94a3b8 !important;\n}\n.news-list {\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n}\n.section-title {\n  font-size: 26px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.section-title::before {\n  content: "\\1f4f0";\n  font-size: 28px;\n  animation: float 3s infinite ease-in-out;\n}\n@keyframes float {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-3px);\n  }\n}\n.news-card {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  padding: 25px;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid rgba(255, 255, 255, 0.7);\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.news-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-hover);\n}\n.news-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 18px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n.news-author {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-weight: 700;\n  color: var(--text-primary);\n  font-size: 15px;\n}\n.news-author mat-icon {\n  color: var(--primary-color);\n  background: rgba(102, 126, 234, 0.1);\n  border-radius: 50%;\n  padding: 6px;\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.news-date {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 600;\n  background: rgba(0, 0, 0, 0.04);\n  padding: 6px 14px;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.news-date::before {\n  content: "\\1f552";\n  font-size: 12px;\n}\n.news-body {\n  padding-top: 5px;\n}\n.news-text {\n  font-size: 16px;\n  line-height: 1.7;\n  color: var(--text-secondary);\n  white-space: pre-wrap;\n  margin-bottom: 20px;\n}\n.news-media {\n  border-radius: var(--radius-md);\n  overflow: hidden;\n  background: #f8fafc;\n  display: flex;\n  justify-content: center;\n  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.02);\n  border: 1px solid #e2e8f0;\n}\n.media-preview {\n  max-width: 100%;\n  max-height: 450px;\n  object-fit: contain;\n  transition: transform 0.3s ease;\n}\n.media-preview:hover {\n  transform: scale(1.02);\n}\n.delete-btn {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  background: rgba(245, 101, 101, 0.08) !important;\n  color: #f56565 !important;\n  transition: all 0.3s ease !important;\n}\n.delete-btn:hover {\n  background: #f56565 !important;\n  color: white !important;\n  transform: rotate(8deg) scale(1.1);\n}\n.empty-state {\n  text-align: center;\n  padding: 50px 20px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  color: var(--text-muted);\n  border: 2px dashed #cbd5e1;\n}\n.empty-state mat-icon {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 15px;\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  :host {\n    padding: 15px;\n  }\n  .headerHero {\n    padding: 30px 15px;\n    margin-bottom: 30px;\n  }\n  .headerHero h1 {\n    font-size: 28px;\n  }\n  .form-card {\n    padding: 20px;\n  }\n  .news-card {\n    padding: 20px;\n  }\n  .news-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .delete-btn {\n    top: 15px;\n    right: 15px;\n  }\n  .news-author {\n    flex: 1;\n    margin-bottom: 10px;\n  }\n}\n::ng-deep .angular-editor-wrapper {\n  background: white !important;\n  border-radius: var(--radius-md) !important;\n  border: 1px solid #e2e8f0 !important;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02) !important;\n  transition: all 0.3s ease !important;\n  overflow: hidden !important;\n}\n::ng-deep .angular-editor-wrapper:focus-within {\n  border-color: var(--primary-color) !important;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2) !important;\n}\n::ng-deep .angular-editor-toolbar {\n  background: #f8fafc !important;\n  border-bottom: 1px solid #e2e8f0 !important;\n  border-top-left-radius: var(--radius-md) !important;\n  border-top-right-radius: var(--radius-md) !important;\n  padding: 10px !important;\n  display: flex !important;\n  flex-wrap: wrap !important;\n  gap: 5px !important;\n}\n::ng-deep .angular-editor-toolbar .angular-editor-button {\n  background: white !important;\n  border: 1px solid #e2e8f0 !important;\n  border-radius: 8px !important;\n  color: var(--text-primary) !important;\n  transition: all 0.2s ease !important;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;\n}\n::ng-deep .angular-editor-toolbar .angular-editor-button:hover {\n  background: var(--primary-color) !important;\n  color: white !important;\n  border-color: var(--primary-color) !important;\n  transform: translateY(-1px) !important;\n}\n::ng-deep .angular-editor-toolbar .angular-editor-button.active {\n  background: rgba(102, 126, 234, 0.1) !important;\n  color: var(--primary-color) !important;\n  border-color: var(--primary-color) !important;\n}\n::ng-deep .angular-editor-textarea {\n  min-height: 200px !important;\n  padding: 20px !important;\n  font-family: inherit !important;\n  font-size: 15px !important;\n  color: var(--text-primary) !important;\n  line-height: 1.6 !important;\n  outline: none !important;\n  border: none !important;\n}\n::ng-deep .angular-editor-toolbar-set {\n  margin-right: 15px !important;\n}\n'] }]
  }], () => [{ type: HttpClient }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ActualitesComponent, { className: "ActualitesComponent", filePath: "src/app/back-office/actualites/actualites.component.ts", lineNumber: 19 });
})();
export {
  ActualitesComponent
};
