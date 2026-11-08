from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt

root=Path('/home/ubuntu/bggradnja/seo-report')
out=root/'charts'; out.mkdir(exist_ok=True)
inv=pd.read_csv(root/'tables/public_page_inventory.csv')
coverage=pd.read_csv(root/'tables/service_coverage.csv')

# This is an evidence inventory, not organic traffic.
counts=inv.groupby(['entity','owned_site' if 'owned_site' in inv.columns else 'page_type']).size().reset_index(name='public_pages')
# use curated page-type counts
page_counts=pd.DataFrame({'page_type':['Directory / profile','Owned service pages','Social profile','Public galleries / evidence'], 'observed_count':[3,3,1,3]})
plt.figure(figsize=(9,5.4)); plt.barh(page_counts.page_type, page_counts.observed_count, color=['#d9a62e','#272727','#9aa0a1','#6d7477']); plt.gca().invert_yaxis(); plt.title('BG-GRADNJA: Public SEO footprint inventory',weight='bold'); plt.xlabel('Observed public pages / evidence surfaces'); plt.tight_layout(); plt.savefig(out/'public_footprint_inventory.png',dpi=180,bbox_inches='tight'); plt.close()

services=['Grubi radovi','Tesarski','Fasade','Keramika','Renoviranje','Krovovi','Hidroizolacija','Ključ u ruke']
rows=[]
for _,r in coverage.iterrows():
 rows.append([r['entity']]+[int(r[c]=='yes') for c in ['grubi_gradevinski_radovi','tesarski_radovi','fasade','keramika','renoviranje','krovovi','hidroizolacija','turnkey']])
mat=pd.DataFrame(rows,columns=['entity']+services).set_index('entity')
plt.figure(figsize=(11,4.8)); plt.imshow(mat.values,cmap='YlOrBr',aspect='auto',vmin=0,vmax=1); plt.xticks(range(len(services)),services,rotation=35,ha='right'); plt.yticks(range(len(mat.index)),mat.index); plt.title('Publicly described service-topic coverage',weight='bold'); plt.colorbar(label='Publicly described: 1=yes, 0=not observed'); plt.tight_layout(); plt.savefig(out/'service_topic_overlap.png',dpi=180,bbox_inches='tight'); plt.close()

comp=pd.DataFrame({'entity':['BG-GRADNJA DOO','Vavić Company','GT2 DOO','Infrastruktura DOO'],'owned_service_pages_observed':[0,1,0,1],'local_profile_pages_observed':[2,0,1,0],'public_inquiry_or_contact':[1,1,1,1]})
plt.figure(figsize=(10,5.3)); x=range(len(comp)); w=.25; plt.bar([i-w for i in x],comp.owned_service_pages_observed,w,label='Owned service page'); plt.bar(x,comp.local_profile_pages_observed,w,label='Directory/profile page'); plt.bar([i+w for i in x],comp.public_inquiry_or_contact,w,label='Public contact/inquiry'); plt.xticks(list(x),comp.entity,rotation=15); plt.ylabel('Observed public surfaces'); plt.title('Public competitive visibility surfaces',weight='bold'); plt.legend(frameon=False); plt.tight_layout(); plt.savefig(out/'competitive_visibility_surfaces.png',dpi=180,bbox_inches='tight'); plt.close()

(out/'asset_manifest.md').write_text('''# SEO chart asset manifest\n\n- `public_footprint_inventory.png`: observed public pages/evidence surfaces from the crawl; not traffic or rankings.\n- `service_topic_overlap.png`: publicly described service topics by entity; not keyword coverage.\n- `competitive_visibility_surfaces.png`: observed public contact/profile/service surfaces; not backlink or organic visibility metrics.\n\nUnavailable from public crawl: global organic trend, country traffic, page traffic, branded/non-branded ranking clicks, backlink anchor mix and backlink destination mix.\n''')
