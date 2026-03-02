import csv

# Read the template header (first 3 lines only)
with open("/home/jerem/w/esspo/scripts/modèle d'engagement e-logica.txt", 'r', encoding='latin-1') as f:
    lines = f.readlines()
    header_lines = lines[:3]

# Read the CSV inscriptions
participants = []
with open("/home/jerem/w/esspo/scripts/Inscrits Poussinades 2026 pour Logica.xlsx - Feuil1.csv", 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        participants.append(row)

# Count columns in template (based on 3rd line which has field IDs)
num_cols = len(header_lines[2].strip().split('\t'))
print(f"Nombre de colonnes dans le modèle: {num_cols}")
print(f"Nombre de participants: {len(participants)}")

# Build output
output_lines = header_lines[:3]

for p in participants:
    date_naissance = p.get('DATE DE NAISSANCE', '')
    row = [''] * num_cols
    row[1] = p.get('LICENCE', '')
    row[2] = p.get('NOM', '')
    row[3] = p.get('PRÉNOM', '')
    row[4] = p.get('CATÉGORIE', '')
    row[5] = date_naissance
    row[6] = p.get('SEXE', '')
    row[7] = p.get('NUMÉRO DU CLUB', '')
    row[8] = p.get('NOM CLUB', '')
    row[12] = p.get('CODE APPEL', '')
    row[18] = p.get('CATÉG. ÉPREUVE', '')
    row[19] = p.get('SEXE ÉPREUVE', '')
    output_lines.append('\t'.join(row) + '\n')

with open("/home/jerem/w/esspo/scripts/engagement_poussinades_2026.txt", 'w', encoding='latin-1') as f:
    f.writelines(output_lines)

print("Fichier créé: engagement_poussinades_2026.txt")
