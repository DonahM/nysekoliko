# Guide d'utilisation du système de traduction

## Vue d'ensemble

Ce projet dispose d'un système complet de gestion de langue qui permet aux utilisateurs de choisir entre le français, l'anglais et le malagasy. Le système affecte dynamiquement tous les textes de l'application.

## Architecture

### 1. Service de traduction (`TranslationService`)
- **Fichier**: `src/app/services/translation.service.ts`
- **Rôle**: Gère le changement de langue, stocke les traductions et fournit les méthodes de traduction
- **Fonctionnalités**:
  - Sauvegarde la langue choisie dans `localStorage`
  - Notifie les composants des changements de langue
  - Fournit les traductions pour les trois langues

### 2. Pipe de traduction (`TranslatePipe`)
- **Fichier**: `src/app/pipes/translate.pipe.ts`
- **Rôle**: Permet d'utiliser les traductions directement dans les templates HTML
- **Utilisation**: `{{ 'clé.traduction' | translate }}`

### 3. Sélecteur de langue (`LanguageSelectorComponent`)
- **Fichier**: `src/app/components/language-selector/language-selector.component.ts`
- **Rôle**: Interface utilisateur pour choisir la langue
- **Caractéristiques**: Menu déroulant avec drapeaux et noms des langues

### 4. Directive de traduction (`TranslateDirective`)
- **Fichier**: `src/app/directives/translate.directive.ts`
- **Rôle**: Alternative au pipe pour traduire du contenu texte
- **Utilisation**: `<div translate="clé.traduction"></div>`

## Comment utiliser

### Dans les templates HTML

#### Avec le pipe (recommandé)
```html
<h1>{{ 'home.welcome' | translate }}</h1>
<button>{{ 'common.save' | translate }}</button>
```

#### Avec la directive
```html
<h1 translate="home.welcome"></h1>
<button translate="common.save"></button>
```

### Dans les composants TypeScript

```typescript
import { TranslationService } from '../services/translation.service';

export class MonComposant {
  constructor(private translationService: TranslationService) {}

  getMessage(): string {
    return this.translationService.translate('common.error');
  }

  changeLanguage(lang: 'fr' | 'en' | 'mg'): void {
    this.translationService.setLanguage(lang);
  }
}
```

### Importer les composants nécessaires

Pour les composants standalone, importez les éléments nécessaires :

```typescript
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component';

@Component({
  standalone: true,
  imports: [TranslatePipe, LanguageSelectorComponent, /* autres imports */],
  // ...
})
```

## Structure des clés de traduction

Les traductions sont organisées en catégories pour une meilleure maintenance :

```typescript
// Navigation
'nav.home' -> 'Accueil'
'nav.dashboard' -> 'Tableau de bord'

// Messages communs
'common.save' -> 'Enregistrer'
'common.cancel' -> 'Annuler'

// Pages spécifiques
'student.title' -> 'Gestion des étudiants'
'teacher.title' -> 'Gestion des professeurs'
```

## Ajouter de nouvelles traductions

### 1. Ajouter la clé dans le service

Dans `src/app/services/translation.service.ts`, ajoutez vos nouvelles clés dans les trois langues :

```typescript
// Français
this.translations.fr = {
  // ... traductions existantes
  newPage: {
    title: 'Nouvelle page',
    description: 'Description de la nouvelle page'
  }
};

// Anglais
this.translations.en = {
  // ... traductions existantes
  newPage: {
    title: 'New Page',
    description: 'New page description'
  }
};

// Malagasy
this.translations.mg = {
  // ... traductions existantes
  newPage: {
    title: 'Pejy vaovao',
    description: 'Famaritana ny pejy vaovao'
  }
};
```

### 2. Utiliser la nouvelle clé

Dans votre template :
```html
<h1>{{ 'newPage.title' | translate }}</h1>
<p>{{ 'newPage.description' | translate }}</p>
```

## Bonnes pratiques

1. **Utiliser des clés descriptives** : `student.addStudent` au lieu de `addStud`
2. **Organiser par catégorie** : Regrouper les traductions par page ou fonctionnalité
3. **Maintenir la cohérence** : Utiliser les mêmes termes dans toutes les langues
4. **Tester toutes les langues** : Vérifier que les traductions s'affichent correctement
5. **Éviter le texte codé en dur** : Toujours utiliser le système de traduction pour les textes visibles

## Personnalisation

### Ajouter une nouvelle langue

1. Mettre à jour le type `Language` dans `TranslationService`
2. Ajouter les traductions dans `this.translations`
3. Mettre à jour `getAvailableLanguages()`
4. Mettre à jour la méthode `initializeFromStorage()`

### Modifier l'apparence du sélecteur

Le style du sélecteur peut être modifié dans :
- `src/app/components/language-selector/language-selector.component.css`

## Dépannage

### Problèmes courants

1. **"No pipe found with name 'translate'"**
   - Assurez-vous d'importer `TranslatePipe` dans votre composant

2. **"app-language-selector is not a known element"**
   - Importez `LanguageSelectorComponent` dans votre composant

3. **Les traductions ne s'affichent pas**
   - Vérifiez que la clé de traduction existe dans les trois langues
   - Assurez-vous que le service est initialisé (`initializeFromStorage()`)

### Débogage

Pour vérifier les traductions disponibles :
```typescript
console.log(this.translationService.translate('votre.clé'));
```

Pour vérifier la langue actuelle :
```typescript
console.log(this.translationService.getCurrentLanguage());
```

## Exemples d'utilisation

### Page d'accueil complète
```html
<div class="welcome-section">
  <h1>{{ 'home.welcome' | translate }}</h1>
  <p>{{ 'home.welcomeMessage' | translate }}</p>
  
  <div class="actions">
    <button mat-raised-button color="primary">
      {{ 'home.quickActions' | translate }}
    </button>
    <button mat-raised-button color="accent">
      {{ 'home.statistics' | translate }}
    </button>
  </div>
</div>

<app-language-selector></app-language-selector>
```

### Formulaire avec traductions
```html
<form>
  <mat-form-field>
    <mat-label>{{ 'student.name' | translate }}</mat-label>
    <input matInput placeholder="{{ 'student.name' | translate }}">
  </mat-form-field>
  
  <mat-form-field>
    <mat-label>{{ 'student.email' | translate }}</mat-label>
    <input matInput placeholder="{{ 'student.email' | translate }}">
  </mat-form-field>
  
  <div class="actions">
    <button mat-raised-button color="primary">
      {{ 'common.save' | translate }}
    </button>
    <button mat-button>
      {{ 'common.cancel' | translate }}
    </button>
  </div>
</form>
```

Ce système de traduction est maintenant entièrement intégré dans votre projet et prêt à être utilisé dans tous les composants !
