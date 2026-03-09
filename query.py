import sqlite3
import pandas as pd

conn = sqlite3.connect('d:/Antigravity/jak_oc/database/jak_observatorio.db')

q1 = """
SELECT c.diputado, COUNT(DISTINCT c.id_boletin) as cnt
FROM coautores c 
JOIN mociones m ON c.id_boletin = m.id_boletin 
GROUP BY c.diputado 
ORDER BY cnt DESC 
LIMIT 20
"""
df1 = pd.read_sql_query(q1, conn)
with open('out.txt', 'w', encoding='utf-8') as f:
    f.write("--- TOP COAUTHORS ---\n")
    f.write(df1.to_string())

q2 = """
SELECT m.id_boletin, m.nombre_iniciativa 
FROM mociones m 
JOIN coautores c ON m.id_boletin = c.id_boletin 
WHERE c.diputado LIKE '%Hugo Gutiérrez%'
"""
df2 = pd.read_sql_query(q2, conn)
with open('out.txt', 'a', encoding='utf-8') as f:
    f.write("\n\n--- HUGO GUTIERREZ PROJECTS ---\n")
    f.write(df2.to_string())
