# Refonte de la saisie des résultats - Interface mobile

## 🎯 Objectif

Remplacer le sélecteur d'épreuve (dropdown) par une interface de cartes cliquables optimisée pour les appareils mobiles, permettant une saisie efficace des résultats via smartphone.

## 📋 Changements apportés

### 1. **Nouveaux composants créés**

#### `EventSelector.tsx`

Affiche une grille de cartes cliquables pour sélectionner une épreuve :

- **Vue par épreuve** : Chaque épreuve est représentée par une carte avec :
  - Emoji pour identification rapide
  - Nom de l'épreuve
  - Unité de mesure (si barème défini)
  - Nombre de résultats déjà saisis
  - Avertissement si aucun barème n'est défini
- **Responsive** : 1 colonne mobile → 2 colonnes tablette → 4 colonnes desktop

#### `EventResultsInput.tsx`

Interface dédiée à la saisie des résultats d'une épreuve spécifique :

- **Optimisée pour le mobile** : Formulaires empilés verticalement
- **Cartes résultats** : Chaque résultat est dans une carte indépendante
- **Validation** : Vérification du participant et de la performance avant sauvegarde
- **Calcul automatique** : Les points sont calculés selon le barème
- **Actions claires** : Boutons Valider/Supprimer bien visibles

### 2. **Refactorisation**

#### `ResultsManagement.tsx`

Maintenant un conteneur qui gère la navigation entre :

- Sélection d'épreuve (grille de cartes)
- Saisie des résultats (formulaire dédié)

Utilise un état `selectedEvent` pour déterminer quelle vue afficher.

### 3. **Styles CSS ajoutés** (`app.css`)

#### Design système

- **Couleurs** : Palette cohérente avec Materialize
- **Typo** : Hiérarchie claire avec poids variables
- **Espacements** : Système cohérent basé sur 4px

#### Composants

**Event Cards** (`.event-card`)

- Padding optimisé pour le touch (48px minimum)
- Bordures et ombres pour feedback visuel
- Hover/focus states distincts
- Icônes emoji grandes (32px)

**Form Inputs** (`.form-control`)

- Padding généreusement dimensionné pour mobile
- Focus ring visible pour accessibilité
- Rayon de bordure 6px pour cohérence

**Result Cards** (`.result-card`)

- Layout vertical par défaut (mobile)
- Boutons d'action empilés sur mobile, côte à côte sur écrans plus larges

#### Mode sombre

- Tous les composants supportent `prefers-color-scheme: dark`
- Contraste maintenu pour accessibilité

## 📱 Responsive Breakpoints

```
Mobile (par défaut)    : < 640px
Tablet                 : ≥ 640px  → 2 colonnes
Desktop                : ≥ 1024px → 4 colonnes (événements)
```

## ♿ Accessibilité

- Tous les éléments interactifs sont accessibles au clavier
- ARIA labels implicites via éléments HTML sémantiques
- Focus states visibles
- Contraste des couleurs conforme WCAG

## 🎨 Améliorations UX

### Avant

- Dropdown select (pas idéal pour mobile)
- Tableau long difficile à naviguer au doigt
- Pas d'indication visuelle du contenu des épreuves

### Après

- ✅ Cartes cliquables (zone de clic confortable au doigt)
- ✅ Vue dédiée par épreuve (saisie plus rapide)
- ✅ Feedback immédiat (nombre de résultats, barème présent)
- ✅ Formulaires optimisés pour mobile
- ✅ Emojis pour reconnaissance rapide

## 🚀 Utilisation

### Pour l'utilisateur

1. Ouvre l'application
2. Voit la grille des 4 épreuves
3. Clique sur une épreuve
4. Saisit les résultats via le formulaire
5. Clique "Retour" pour revenir à la sélection

### Pour le développeur

```tsx
// Le composant ResultsManagement gère tout
<ResultsManagement />

// EventSelector → sélection
// EventResultsInput → saisie pour une épreuve
```

## 📐 Dimensions recommandées

- **Hauteur minimale des cartes** : 100px
- **Padding des cartes** : 20px
- **Rayon de bordure** : 8-12px
- **Taille emoji** : 32px

## 🔄 Flux de données

```
ResultsManagement
├─ selectedEvent === null
│  └─ EventSelector
│     └─ onSelectEvent → setSelectedEvent
└─ selectedEvent !== null
   └─ EventResultsInput
      ├─ event: Event
      ├─ onBack → setSelectedEvent(null)
      └─ Uses CompetitionContext for CRUD
```

## 🐛 Points d'attention

- Vérifier que le barème est défini avant d'autoriser la saisie
- Les participants déjà saisis pour une épreuve ne sont pas proposés deux fois
- La validation se fait avant la sauvegarde
- Le calcul des points se fait en temps réel
