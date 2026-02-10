# ✨ Mise à jour - Filtrage par catégorie

## 🎯 Nouvelle fonctionnalité

Ajout d'un filtre par catégorie dans la saisie des résultats d'une épreuve.

## 📝 Détails

### Avant

```
Saisie de Vitesse
│
├─ [+ Ajouter un résultat]
└─ Tous les participants affichés
```

### Après

```
Saisie de Vitesse
│
├─ Filtre par catégorie: [Toutes ▼]
│  - EAF (Éveil Filles)
│  - EAM (Éveil Mecs)
│  - POF (Poussines)
│  - POM (Poussins)
│
├─ [+ Ajouter un résultat]
│
└─ Participants filtrés selon la catégorie
   (+ affichage de la catégorie dans chaque option)
```

## 🔧 Implémentation

### Fichiers modifiés

- `app/components/EventResultsInput.tsx`
- `app/app.css`

### Changements

**EventResultsInput.tsx:**

- Ajout de l'import du type `Category`
- Ajout de `CATEGORY_LABELS` pour afficher les noms lisibles
- Ajout de l'état `selectedCategory` pour mémoriser le filtre
- Filtrage dynamique des `availableParticipants` selon la catégorie
- Calcul de `availableCategories` (liste unique des catégories présentes)
- Ajout d'un select pour sélectionner la catégorie
- Affichage de la catégorie dans chaque option participant

**app.css:**

- Amélioration de `.input-section` pour layout flexible
- Sur mobile : colonne simple (flex)
- Sur tablette/desktop : grille 2 colonnes (1fr + auto)
- Alignement des éléments au bas de la section

## 📱 Responsive

### Mobile (< 768px)

```
┌─────────────────────────┐
│ Filtrer par catégorie   │
│ [Toutes les catégories▼]│
│                         │
│ [+ Ajouter un résultat] │
└─────────────────────────┘
```

### Tablet/Desktop (≥ 768px)

```
┌──────────────────────────────────────┐
│ Filtrer par catégorie [Toutes ▼]     │
│                                      │
│                    [+ Ajouter résultat]
└──────────────────────────────────────┘
```

## ✅ Fonctionnement

1. **Chargement initial** → Tous les participants visibles
2. **Clic sur le filtre** → Sélectionner une catégorie
3. **Filtrage appliqué** → Affiche uniquement les participants de cette catégorie
4. **Participants déjà saisis** → Exclus automatiquement (comme avant)
5. **Affichage** → Chaque participant affiche sa catégorie

### Exemple

```
Saisie de Vitesse
Filtre: POF (Poussines) sélectionné

Participants disponibles:
- Alice Dupont (POF) (Club A)
- Claire Durand (POF) (Club B)
- Emma Martin (POF) (Club C)

(Les EAF, EAM, POM sont masqués)
```

## 🎨 Interaction

- **Select de catégorie** : Immédiatement filtre la liste
- **Toutes les catégories** : Option par défaut (pas de filtre)
- **Changement de filtre** : Réapplique automatiquement
- **Le bouton d'ajout** : Se désactive si aucun participant disponible

## 📊 Points clés

✅ **Filtre optionnel** → Peut rester sur "Toutes les catégories"  
✅ **Pas d'état supplémentaire** → Juste le `selectedCategory`  
✅ **Responsive** → Layout adapté mobile/desktop  
✅ **Accessible** → Select natif, pas de problèmes d'accessibilité  
✅ **Performant** → Calcul au rendu (O(n), n < 1000)  
✅ **Compatible** → Aucun breaking change

## 🧪 Test

1. Ouvrir saisie de résultats
2. Voir "Filtrer par catégorie: Toutes"
3. Cliquer sur le filtre
4. Sélectionner "Poussines Filles"
5. Vérifier que seules les poussines s'affichent dans la liste
6. Ajouter un résultat pour une poussine
7. Changer de filtre → Voir "Toutes les catégories"
8. Vérifier que tous les participants réapparaissent
9. Tester sur mobile (DevTools)

## 📈 Cas d'usage

Cette fonctionnalité est très utile pour:

- **Saisie sur tablette/phone** : Réduire la scrolling dans la liste
- **Compétitions avec beaucoup de participants** : Chercher plus rapidement
- **Organisateurs locaux** : Focus sur une catégorie à la fois
- **Réduction d'erreurs** : Moins de mauvaises sélections

## 🔄 Intégration avec flux existant

- ✅ Fonctionne avec `CompetitionContext` existant
- ✅ Pas de modification structure données
- ✅ Pas de nouvelle dépendance
- ✅ Pas de breaking change

## 📝 Notes

- La catégorie d'un participant est définie à son inscription
- Les catégories affichées dans le filtre sont celles présentes dans la DB
- Si aucun participant pour une catégorie → La catégorie n'apparaît pas
- Le filtre est "stateless" → Remis à zéro au changement d'épreuve

## 🚀 Améliorations futures possibles

- Ajouter des badges/couleurs par catégorie
- Mémoriser le dernier filtre sélectionné
- Raccourci clavier pour changer de catégorie
- Afficher le nombre de participants par catégorie
